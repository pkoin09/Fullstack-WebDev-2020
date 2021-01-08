import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

let component
const blogFormCall = jest.fn()

beforeEach(() => {
  component = render(<BlogForm blogFormCall={ blogFormCall } />)
})

describe('<BlogForm testing', () => {
  test('calls the event handler with the right props', () => {
    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'blog title input test' }
    })
    fireEvent.change(author, {
      target: { value: 'Mr. Author' }
    })
    fireEvent.change(url, {
      target: { value: 'http://www.mrauthor.com' }
    })

    fireEvent.submit(form)

    expect(blogFormCall.mock.calls).toHaveLength(1)
    expect(blogFormCall.mock.calls[0][0]).toBe('blog title input test')
    expect(blogFormCall.mock.calls[0][1]).toBe('Mr. Author')
    expect(blogFormCall.mock.calls[0][2]).toBe('http://www.mrauthor.com')
  })
})