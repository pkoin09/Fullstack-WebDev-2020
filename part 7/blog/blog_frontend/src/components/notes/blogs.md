# CSS formatting likes in /components/blog

```JS
<Form.Group as={Row}>
  <Form.Label className='likes text-center'>likes: {blog.likes}</Form.Label>
  <Button variant='outline-primary' id='addLike' onClick={() => addLike(blog)}>like</Button>
</Form.Group>
```