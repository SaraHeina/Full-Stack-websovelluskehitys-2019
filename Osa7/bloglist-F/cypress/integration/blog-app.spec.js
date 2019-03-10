describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        const user = {
            name: 'Aku Ankka',
            username: 'aku',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3000/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('login form opens', function () {
        cy.contains('log in to application')
    })

    it('user can login', function () {
        cy.get('#username')
            .type('aku')
        cy.get('#password')
            .type('salainen')
        cy.contains('kirjaudu')
            .click()
        cy.contains('welcome aku')
    })


    describe('when logged in', function () {
        beforeEach(function () {
            cy.get('#username')
                .type('aku')
            cy.get('#password')
                .type('salainen')
            cy.contains('kirjaudu')
                .click()
        })

        it('blogs page opens', function () {
            cy.contains('Blogs')
            cy.contains('Title')
        })

        it('user page has a user', function () {
            cy.contains('Users')
                .click()
            cy.contains('Aku Ankka')
        })

        it('a new blog can be created', function () {
            cy.contains('create new')
                .click()
            cy.get('#title')
                .type('new cooking blog')
            cy.get('#author')
                .type('Ramses')
            cy.get('#url')
                .type('www.cooking.fi')
            cy.contains('Save')
                .click()
            cy.contains('new cooking blog')
        })
    })

    describe('blog changes', function () {
        beforeEach(function () {
            cy.get('#username')
                .type('aku')
            cy.get('#password')
                .type('salainen')
            cy.contains('kirjaudu')
                .click()
            cy.contains('create new')
                .click()
            cy.get('#title')
                .type('new cooking blog')
            cy.get('#author')
                .type('Ramses')
            cy.get('#url')
                .type('www.cooking.fi')
            cy.contains('Save')
                .click()
            cy.get('[id=blog-element]')
                .click()
        })

        it('opens blog page', function () {
            cy.contains('www.cooking.fi')
            cy.contains('added by Ramses')
        })

        it('liked', function () {
            cy.contains('like')
                .click()
            cy.contains('like')
                .click()
            cy.contains('2')
            cy.contains('Blogs')
                .click()
            cy.contains('2')
        })

        it('comment added', function () {
            cy.get('#comment')
                .type('good food')
            cy.contains('add comment')
                .click()
            cy.contains('good food')
        })
    })

    /*describe('user', function () {
        beforeEach(function () {
            cy.get('#username')
                .type('aku')
            cy.get('#password')
                .type('salainen')
            cy.contains('kirjaudu')
                .click()
            cy.contains('create new')
                .click()
            cy.get('#title')
                .type('new cooking blog')
            cy.get('#author')
                .type('Ramses')
            cy.get('#url')
                .type('www.cooking.fi')
            cy.contains('Save')
                .click()
            cy.contains('Users')
                .click()
        })

        it('user has a blog', function () {
            cy.contains('1')
            cy.contains('Aku Ankka')
                .click()
            cy.contains('new cooking blog')
        })
    })*/

})