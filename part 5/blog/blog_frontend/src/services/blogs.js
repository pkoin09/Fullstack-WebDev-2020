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

const create = async newObject => {
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject, config)
  return req.then(res => res.data)
}

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`, config)
  return req.then(res => res.data)
}

export default { getAll, create, update, remove, setToken }