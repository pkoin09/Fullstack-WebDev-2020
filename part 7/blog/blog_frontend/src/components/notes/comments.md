```JS
....

const Comments = (id, comment) => {
  const comments = useField('text')

  // validate (?) so as to get an error on an empty form submit.
  // try catch not working on empty. if statement inside (?)

  const submitComment = async () => {
    console.log('blog.id1', id)
    // e.preventDefault()
    try { // <-- No error when submitting empty form.
      dispatch(blogComment(
        (id, comments.field.value),
        console.log('blog.id2', id)
      ))
      dispatch(notifySuccess('comment was submited', 2))
    } catch(err) {
      dispatch(notifyError('Comment wansn\'t submitted', 2))
    }
  }

  if(!comments) {
    return null
  }

  const rows = () => {
    comments.map(cmt =>
      <li key={cmt.id}>{cmt}</li>
    )
  }

  return (
    <div>
      <h5>Comments</h5>
      <ul>
        {rows()}
      </ul>
      <Form onSubmit={submitComment}>
        <Row>
          <Col>
            <Form.Control as='textarea' {...comments.field} placeholder='comment' />
          </Col>
          <Col>
            <Button variant='outline-primary' type='submit'>submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Comments

// Comments.propTypes = {
//   comments: PropTypes.string.isRequired
// }
```

## CHROME ERROR MESSAGE IN ACTIONS (BLOG_REDUCER)

```JS
TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
    at Function.r (<anonymous>:1:83)
    at blogsReducer (http://localhost:3000/static/js/main.chunk.js:2777:20)
    at combination (http://localhost:3000/static/js/0.chunk.js:57721:29)
    at p (<anonymous>:1:36402)
    at v (<anonymous>:1:36684)
    at <anonymous>:1:40069
    at Object.dispatch (http://localhost:3000/static/js/0.chunk.js:57474:22)
    at e (<anonymous>:1:40553)
    at http://localhost:3000/static/js/0.chunk.js:57234:16
    at dispatch (http://localhost:3000/static/js/0.chunk.js:57901:28)
    at http://localhost:3000/static/js/main.chunk.js:2821:5
```