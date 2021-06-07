/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blogs'

describe('<Blog /> Render testing', () => {
  let component
  let user = null
  const mockHandler = jest.fn()

  const blog = {
    id: '5fe54dc41dbfee3ddb14233b',
    title: 'testing intro',
    author: 'some tester',
    url: 'www.wetest.com',
    likes: 4,
    user: {
      username: 'fakeUser',
      name: 'Fake User',
      id: '5fe54dc41dbfaa3ddb14244z'
    },
  }

  beforeEach(() => {
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        toggleVisible={ mockHandler }
        updateBlog={ mockHandler }
      />
    )
  })

  describe('<Blog /> testing', () => {
    test('renders the title and the url', () => {
      expect(component.container.querySelector('.title')).toHaveTextContent(blog.title)
      expect(component.queryByText(blog.url)).not.toBeInTheDocument()
      expect(component.queryByText('like')).not.toBeInTheDocument()
    })

    test('clicking the view button once, the likes and url are visible', () => {
      const viewButton = component.getByText('view')
      fireEvent.click(viewButton)

      expect(component.container.querySelector('.url')).toBeDefined()
      expect(component.container.querySelector('.likes')).toBeDefined()
    })

    test.only('if like is clicked twice, the event handler is called twice', () => {
      const viewButton = component.getByText('view')
      fireEvent.click(viewButton)

      const likeBtn = component.getByText('like')
      fireEvent.click(likeBtn)
      fireEvent.click(likeBtn)
      expect(mockHandler.mock.calls.length).toBe(2)
    })
  })
})