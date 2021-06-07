import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('initialize', () => {
    const state = ''
    const action = {
      type: 'INIT_BLOG',
      data: [{
        title: 'test blog two',
        author: 'writter two',
        url: 'testblogtwo.cm',
        likes: 27,
        user: {
          username: 'Tester',
          name: 'Test User',
          id: '5fe54dc41dbfee3ddb14233b'
        },
        id: '5fe555e51a46834085d4625f'
      }]
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(Number(1))
    expect(newState).toContainEqual(action.data)
  })

  test('can create a new blog', () => {
    const state = [{
      data: [{
        title: 'test blog two',
        author: 'writter two',
        url: 'testblogtwo.cm',
        likes: 27,
        user: {
          username: 'Tester',
          name: 'Test User',
          id: '5fe54dc41dbfee3ddb14233b'
        },
        id: '5fe555e51a46834085d4625f'
      }]
    }]
    const action = {
      type: 'NEW_BLOG',
      data: [{
        title: 'test blog three',
        author: 'writter three',
        url: 'testblogthree.cm',
        likes: 4,
        user: {
          username: 'Tester',
          name: 'Test User',
          id: '5fe54dc41dbfee3ddb14233b'
        },
        id: '5fe555e51a46834085d4555f'
      }]
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(Number(2))
    expect(newState).toContainEqual(action.data)
  })
})