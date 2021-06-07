import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [ visible, setVisible ] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisible }
  })

  return(
    <>
      <span style={hideWhenVisible}>
        <Button variant='outline-primary' id='createBlog' onClick={ toggleVisible }>{ props.buttonLabel }</Button>
      </span>
      <span style={ showWhenVisible }>
        { props.children }
        <br />
        <Button variant='outline-primary' onClick={ toggleVisible }>cancel</Button>
      </span>
    </>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable