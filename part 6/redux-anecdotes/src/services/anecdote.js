import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const createNew = async (content) => {
  const object = { content, votes: Number(0) };
  const res = await axios.post(`${baseUrl}`, object);
  return res.data;
};

const update = async (obj) => {
  const res = await axios.put(`${baseUrl}/${obj.id}`, obj);
  return res.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getById, createNew, update };
