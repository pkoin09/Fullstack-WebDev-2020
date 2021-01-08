import React, { useState } from 'react'

const BlogForm = ({ blogFormCall }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const handleCreatedBlogSubmit = (e) => {
    e.preventDefault()
    blogFormCall(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form className='form' onSubmit={ handleCreatedBlogSubmit }>
      <div>
        title:
        <input
          id='title'
          type='text'
          name='Title'
          value={ title }
          onChange={ ({ target }) => setTitle(target.value) }
        />
      </div>
      <div>
        author:
        <input
          id='author'
          type='text'
          name='Author'
          value={ author }
          onChange={ ({ target }) => setAuthor(target.value) }
        />
      </div>
      <div>
        url:
        <input
          id='url'
          type='url'
          value={ url }
          onChange={ ({ target }) => setUrl(target.value) }
        />
      </div>
      <button type='submit'>Submit Blog</button>
    </form>
  )
}

export default BlogForm