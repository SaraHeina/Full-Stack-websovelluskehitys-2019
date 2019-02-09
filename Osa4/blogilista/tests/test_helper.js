const Blog = require('../models/blog')

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

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}