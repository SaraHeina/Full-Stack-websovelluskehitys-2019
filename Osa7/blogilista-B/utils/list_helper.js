const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => (sum + blog.likes), 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) {
        return null
    }

    let favoB = blogs[0]
    blogs.forEach((blog) => {
        if(blog.likes > favoB.likes) {
            favoB = blog
        }
    })
    return {
        title: favoB.title,
        author: favoB.author,
        likes: favoB.likes
    }
}

const mostBlogs = (blogs) => {
    let most = 0
    let authors = {}
    let favoAuthor = ''
    if(blogs.length === 0) {
        return null
    }

    blogs.forEach(blog => {
        if (!(blog.author in authors)) {
            authors[blog.author] = 0
        }
        authors[blog.author] += 1
    })

    for (let key in authors) {
        if (authors[key]>most) {
            most=authors[key]
            favoAuthor=key
        }
    }
    return {
        author: favoAuthor,
        blogs: most
    }
}

const mostLikes = (blogs) => {
    let most = 0
    let authors = {}
    let favoAuthor = ''
    if(blogs.length === 0) {
        return null
    }

    blogs.forEach(blog => {
        if (!(blog.author in authors)) {
            authors[blog.author] = 0
        }
        authors[blog.author] += blog.likes
    })

    for (let key in authors) {
        if (authors[key]>most) {
            most=authors[key]
            favoAuthor=key
        }
    }
    return {
        author: favoAuthor,
        likes: most
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}