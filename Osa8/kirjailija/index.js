require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()
const uuid = require('uuid/v1')


mongoose.set('useFindAndModify', false)
const MONGODB_URI = process.env.MONGODB_URI


mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int
        genres: [String]
    ): Book!
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book
  } 
`

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author) {
                var author = await Author.findOne({ name: args.author })
            }
            const byAuthor = args.author ? Book.find({ author: author }).populate('author') : Book.find({}).populate('author')
            const byGenre = args.genre ? Book.find({ genres: { $in: [args.genre] } }).populate('author') : byAuthor
            return byGenre
        },
        allAuthors: () => Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: (root) => Book.find({ author: root }).countDocuments()
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            var author = await Author.findOne({ name: args.author })
            if (!author) {
                author = new Author({ name: args.author })
                try {
                    await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }

            const book = new Book({ ...args, author: author })
            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return book
        },

        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const author = await Author.findOne({ name: args.name })
            if (!author) return null
            try {
                author.born = args.setBornTo
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return author
        },

        createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secred') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})