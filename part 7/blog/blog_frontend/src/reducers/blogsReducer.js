import blogService from '../services/blogs'

/* eslint-disable indent */
const blogsReducer = (state = '', action) => {
  switch(action.type) {
    case 'INIT_BLOG':
      return action.data
    case 'NEW_BLOG':
      return [ ...state, action.data ]
    case 'LIKE_BLOG': {
      let id = action.data.id
      const blogToUpdate = state.find(blg => blg.id === id)
      const blogObject = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + Number(1)
      }
      return state.map(blog =>
        blog.id !== id ? blog : blogObject
      )
    }
    case 'NEW_COMMENT':
      return state.map(cmt =>
        cmt.id !== action.data.id ? cmt : action.data
      )
    case 'DELETE_BLOG':
      return state.filter(blg => blg.id !== action.data)
    default:
      return state
  }
}

export const initializeBlog = () => {
  return async dispatch => {
    const blog = await blogService.getAll()
    dispatch(({
      type: 'INIT_BLOG',
      data: blog
    }))
  }
}

export const blogCreate = (blogObject) => {
  return async (dispatch) => {
    const blog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export const blogUpdateLike = (blog) => {
  const id = blog.id
  return async dispatch => {
    const blg = await blogService.update(id, {
      ...blog, likes: blog.likes + Number(1)
    })
    dispatch({
      type: 'LIKE_BLOG',
      data: blg
    })
  }
}

export const blogComment = (id, comment) => {
  return async dispatch => {
    const bCmnt = await blogService.comment(id, comment) //bCmnt is undefined. promise pending from service
    dispatch({
      type: 'NEW_COMMENT',
      data: bCmnt
    })
  }
}

export const blogDiscard = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export default blogsReducer