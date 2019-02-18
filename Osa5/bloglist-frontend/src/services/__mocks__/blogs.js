const blogs = [
    {
        id: "5c6864710f0c330c1adf1ba5",
        title: "token",
        author: "Tok",
        url: "www.Totem.com",
        likes: 9,
        user: {
            username: "Alice",
            name: "Alice in Wonderland",
            id: "5c60b0209ba9530d59f89090"
        }
    },
    {
        id: "5c6864710f0c330c1adf10ki",
        title: "Cooking",
        author: "O",
        url: "www.cokingfun.com",
        likes: 80,
        user: {
            username: "Odi",
            name: "Odd Wal",
            id: "5c60b0209ba9530d59f89lj8"
        }
    },
    {
        id: "5c6864710f0c330c1adf1bb2",
        title: "token2",
        author: "Tok2",
        url: "www.Totem2.com",
        likes: 2,
        user: {
            username: "Alice",
            name: "Alice in Wonderland",
            id: "5c60b0209ba9530d59f89090"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = (token) => {console.log(token)}

export default { getAll, setToken }