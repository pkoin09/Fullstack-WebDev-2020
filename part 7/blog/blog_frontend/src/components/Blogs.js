import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const Blog = () => {
  const blogs = useSelector(state => state.blogsReducer)

  if(!blogs) {
    return null
  }
  return (
    <div style={{ paddingTop: 25 }}>
      <Table bordered size='sm'>
        <tbody>
          {
            blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blg => {
                return (
                  <tr key={blg.id}>
                    <td>
                      <Link to={`/blogs/${blg.id}`}>{blg.title} by {blg.author}</Link>
                    </td>
                  </tr>
                )
              })
          }
        </tbody>
      </Table>
    </div>
  )

}

export default Blog