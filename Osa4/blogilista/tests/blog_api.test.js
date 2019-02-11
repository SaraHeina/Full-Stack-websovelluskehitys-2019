const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//const { app, server } = require('../index')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogss', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(titles).toContain('testat')
})

test('blog has field name id', async () => {
  const response = await helper.blogsInDb()
  expect(response[0].id).toBeDefined
})

test('a valid blog can be added', async () => {
  await api
    .post('/api/blogs')
    .send(helper.normalBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(b => b.title)
  expect(contents).toContain(
    'new'
  )
})

test('is like dose not have value its 0', async () => {
  const response = await api
    .post('/api/blogs')
    .send(helper.noLikesBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const bl = response.body
  expect(bl.likes).toBe(0)
})

test('fails with statuscode 400 if title does not exist', async () => {
  await api
    .post(`/api/blogs`)
    .send(helper.noTitleBlog)
    .expect(400)
})

test('fails with statuscode 400 if url does not exist', async () => {
  await api
    .post(`/api/blogs`)
    .send(helper.noUrlBlog)
    .expect(400)
})

test('delete succeeds with status code 204 if id is valid', async () => {
  const blogs = await helper.blogsInDb()
  const blogToDelete = blogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(blogs.length - 1)

  const contents = blogsAtEnd.map(b => b.title)
  expect(contents).not.toContain(blogToDelete.title)
})

test('update works', async () => {
  const blogs = await helper.blogsInDb()
  const update = blogs[0]

  await api
    .put(`/api/blogs/${update.id}`)
    .send(helper.updatedBlog)
    .expect(200)
})


afterAll(() => {
  mongoose.connection.close()
})