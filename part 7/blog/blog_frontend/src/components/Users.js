import React from 'react'
import { useSelector,  } from 'react-redux'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(state => state.usersReducer)

  if(!users) {
    return null
  }

  return(
    <div>
      <h4>Users</h4>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(usr => {
              return (
                <tr key={usr.id}>
                  <td>
                    <Link to={`/users/${usr.id}`}>{usr.name}</Link>
                  </td>
                  <td>{usr.blogs.length}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default React.memo(Users)