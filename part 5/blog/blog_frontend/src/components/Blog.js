
import React, { useState } from 'react'
import '../App.css'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [ visible, setVisible ] = useState(false)

  // console.log(user)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    await updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const DeleteBlog = ({ blog, handleDelete }) => {

    if (user === null || blog.user === null) {
      return null
    }

    if (blog.user.name !== user.name) {
      return null
    }

    return (
      <div>
        <button id='delBtn' className='delButton' onClick={() => handleDelete(blog)}>delete</button>
      </div>
    )
  }

  if(visible === false) {
    return(
      <div id='blgDiv' className='blogBorder'>
        <p className='title'>{blog.title} by {blog.author}</p>
        <button id='viewButton' className='viewTest' onClick={ toggleVisible }>view</button>
      </div>
    )
  } else {
    return(
      <div id='moreDiv' className='blogBorder'>
        <p>{blog.title} by {blog.author}</p>
        <button onClick={ toggleVisible }>hide</button><br />
        <p className='likes'>likes: {blog.likes} {' '}
          <button id='addLike' onClick={ addLike }>like</button>
        </p>
        <p className='url'>Url: {blog.url}</p>
        <DeleteBlog
          user={user}
          blog={blog}
          handleDelete={deleteBlog}
        />
      </div>
    )
  }
}

export default Blog