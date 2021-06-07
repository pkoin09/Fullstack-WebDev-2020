import axios from 'axios'
const baseUrl = '/api/blogs'

let config = null

const setToken = newToken => {
  config = { headers: { Authorization: `bearer ${newToken}` } }
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async blog => {
  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

const update = (id, blog) => {
  const req = axios.put(`${baseUrl}/${id}`, blog, config)
  return req.then(res => res.data)
}

const comment = (id, comment) => {
  const req = axios.post(`${baseUrl}/${id}/comments`, { comment })
  return req.then(res => res.data)
}

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`, config)
  return req.then(res => res.data)
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
  comment
}