import _ from 'lodash'

describe('BLOG APP', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'TestUserPwd1'
    }
    const user2 = {
      name: 'Test User2',
      username: 'testuser2',
      password: 'TestUserPwd2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('Blog app, Department of Computer Science, University of Helsinki 2020')
  })

  describe('Logging in as \'Test User\'',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('TestUserPwd1')
      cy.get('#login-button').click()

      cy.contains('Test User is logged in')
    })

    it('Login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('WrongPwd')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in as \'Test User\'', function() {
    beforeEach(function() {
      cy.login({
        username: 'testuser',
        password: 'TestUserPwd1'
      })
    })

    it('A blog can be created by \'Test User\'', function() {
      cy.contains('create blog').click()
      cy.createBlog({ title: 'Blog title five', author: 'John Doe', url: 'http://www.samdoe.cm' })

      cy.get('.title').should('contain', 'Blog title five by John Doe')
    })
  })

  describe('when there are multiple blogs created by \'Test User\'', function() {
    beforeEach(function() {
      cy.login({
        username: 'testuser',
        password: 'TestUserPwd1'
      })
      cy.contains('create blog').click()
      cy.createBlog({ title: 'Blog title one', author: 'John Doe', url: 'http://www.johndoe.cm' })

      cy.createBlog({ title: 'second most likes', author: 'Jane Doe', url: 'http://www.janedoe.cm' })
      cy.createBlog({ title: 'most likes blog', author: 'Sam Doe', url: 'http://www.samdoe.cm' })
      cy.createBlog({ title: 'delete this blog', author: 'Jill Doe', url: 'http://www.jilldoe.cm' })
    })

    it('A blog can be liked by \'Test User\'', function() {
      cy.get('#blgDiv:first > #viewButton').click()
      cy.contains('likes: 0')
      cy.get('#addLike').click()
      cy.contains('likes: 1')
    })


    it('\'Test User\' can delete his/her own blogs', function() {
      cy.get('#blgDiv:last > #viewButton').click()
      cy.get('html')
        .should('contain', 'delete this blog by Jill Doe')
      cy.get('#delBtn').click()
        .should('not.contain', 'delete this blog by Jill Doe')
    })

    describe('Log out \'Test User\' and login as \'Test User2\'', function() {
      it('\'Test User2\' cannot delete a blog by \'Test User\'', function() {
        cy.contains('logout').click()
        cy.login({
          username: 'testuser2',
          password: 'TestUserPwd2'
        })
        cy.contains('Test User2 is logged in')
        cy.get('#blgDiv > #viewButton').click({ multiple: true })
        cy.get('#moreDiv')
          .should('not.contain', 'delete')
      })
    })

    describe('Sorting of Blogs', function() {
      it('Blogs are sorted in descending order by number of likes', function() {
        cy.get('#blgDiv > #viewButton').click({ multiple: true })
        cy.contains('Blog title one').parent().find('#addLike').as('viewBtn3')
        cy.contains('most likes blog by Sam Doe').parent().find('#addLike').as('viewBtn1')
        cy.contains('second most likes').parent().find('#addLike').as('viewBtn2')
        cy.contains('delete this blog').parent().find('#addLike').as('viewBtn4')
        _.times(2, function() {cy.get('@viewBtn3').click()})
        _.times(1, function() {cy.get('@viewBtn4').click()})
        _.times(4, function() {cy.get('@viewBtn1').click()})
        _.times(3, function() {cy.get('@viewBtn2').click()})
        cy.get('#moreDiv:first').should('contain', 'likes: 4')
        cy.get('#moreDiv:last-of-type').should('contain', 'likes: 1')
      })
    })
  })
})