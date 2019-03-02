const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const empty = []
const oneB = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Best games',
    author: 'Edwin',
    url: 'http://www.bestgames.com',
    likes: 3,
  }
]
const manyB = [
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Best games',
    author: 'Edwin',
    url: 'http://www.bestgames.com',
    likes: 3,
  },
  {
    _id: '5a422aa71b54a676234d17f2',
    title: 'Best games',
    author: 'Eric',
    url: 'http://www.bestgames.com',
    likes: 5,
  },
  {
    _id: '5a422aa71b54a676234d17f4',
    title: 'Best games',
    author: 'Edwin',
    url: 'http://www.bestgames.com',
    likes: 3,
  }
]



describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(empty)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(oneB)
    expect(result).toBe(3)
  })

  test('of a bigger list is calculated', () => {
    const result = listHelper.totalLikes(manyB)
    expect(result).toBe(11)
  })
})



describe('favorite blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog(empty)
    expect(result).toEqual(null)
  })

  test('when list has only one blog its a favorite', () => {
    const result = listHelper.favoriteBlog(oneB)
    expect(result).toEqual({
      title: 'Best games',
      author: 'Edwin',
      likes: 3
    })
  })

  test('of a most likes', () => {
    const result = listHelper.favoriteBlog(manyB)
    expect(result).toEqual({
      title: 'Best games',
      author: 'Eric',
      likes: 5
    })
  })
})



describe('most blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs(empty)
    expect(result).toEqual(null)
  })

  test('when list has only one blog its author is chosen', () => {
    const result = listHelper.mostBlogs(oneB)
    expect(result).toEqual({
      author: 'Edwin',
      blogs: 1
    })
  })

  test('of a most blogs', () => {
    const result = listHelper.mostBlogs(manyB)
    expect(result).toEqual({
      author: 'Edwin',
      blogs: 2
    })
  })
})



describe('most likess', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes(empty)
    expect(result).toEqual(null)
  })

  test('when list has only one blog', () => {
    const result = listHelper.mostLikes(oneB)
    expect(result).toEqual({
      author: 'Edwin',
      likes: 3
    })
  })

  test('of a most likes', () => {
    const result = listHelper.mostLikes(manyB)
    expect(result).toEqual({
      author: 'Edwin',
      likes: 6
    })
  })
})