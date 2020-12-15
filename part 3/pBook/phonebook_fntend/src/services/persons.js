import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => {
    return res.data
  })
}

const create = (newObject) => {
  const req = axios.post(baseUrl, newObject)
  return req.then(res => res.data)
}

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove }