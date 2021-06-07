import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/userReducer'

import { Button, Navbar, Nav, Form } from 'react-bootstrap'

const Navigation = () => {
  const user = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  return(
    <div>
      <Navbar collapseOnSelect bg='light' variant='light' expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href='#' as='span'>
              { !user ? null : <Link to='/'>Blogs</Link> }
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              { !user ? null : <Link to='/users'>Users</Link> }
            </Nav.Link>
          </Nav>
          <Nav.Link href='#' as='span'></Nav.Link>
          {
            !user
              ? <Link to='/login'></Link>
              : (
                <>
                  <Form.Group>
                    <Form.Label className='d-flex pr-2 pt-lg-4'>{user.name} has logged in</Form.Label>
                  </Form.Group>
                  <Button variant='outline-primary' id='logOut' onClick={() => dispatch(userLogout())}>logout</Button>
                </>
              )
          }
          <Nav.Link href='#' as='span'></Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default React.memo(Navigation)