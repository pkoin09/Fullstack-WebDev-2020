import React from 'react'

const User = ({ blogs }) => {
  if(!blogs) {
    return null
  }

  return (
    <div>
      <h4>{blogs[0].user.name} blogs</h4>
      <h5>Added blogs</h5>
      <ol>
        {
          blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>
          })
        }
      </ol>
    </div>
  )
}

export default User