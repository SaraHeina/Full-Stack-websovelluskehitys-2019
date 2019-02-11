const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'testBlog',
        author: 'tester',
        url: 'www.test.fi',
        likes: 12
    },
    {
        title: 'testing',
        author: 'testerit',
        url: 'www.testaa.fi',
        likes: 24
    },
    {
        title: 'testat',
        author: 'tes',
        url: 'www.testat.fi',
        likes: 45
    },
    {
        title: 'test',
        author: 'testarit',
        url: 'www.testari.fi',
        likes: 2
    },
]

const noLikesBlog = {
    title: 'neww',
    author: 'noobie',
    url: 'www.uus.fi'
}

const normalBlog = {
    title: 'new',
    author: 'noobie',
    url: 'www.uus.fi',
    likes: 80
}

const noTitleBlog = {
    author: 'noobie',
    url: 'www.uus.fi',
    likes: 80
}

const noUrlBlog = {
    title: 'new',
    author: 'noobie',
    likes: 80
}

const updatedBlog = {
    author: 'T'
}

const initialUsers = [
    {
        username: 'Ann',
        name: 'Ann Heterway',
        password: 'salaisuus',
    },
    {
        username: 'Olaf',
        name: 'Olaf Snowman',
        password: 'snowinsummer',
    },
]

const newUser = {
    username: 'ope',
    name: 'Kurssi Ope',
    password: 'shh',
}

const sameUser = {
    username: 'Ann',
    name: 'Ann Heterway',
    password: 'salaisuus',
}

const tooShortUsername = {
    username: 'a',
    name: 'Ann Heterway',
    password: 'salaisuus',
}

const tooShortPassword = {
    username: 'alice',
    name: 'Alice Heterway',
    password: 's',
}


const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    noLikesBlog,
    normalBlog,
    noTitleBlog,
    noUrlBlog,
    updatedBlog,
    usersInDb,
    newUser,
    sameUser,
    tooShortPassword,
    tooShortUsername,
    initialUsers
}