import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) =>{
  token = `Bearer ${newToken}`
}


const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.get(baseUrl,config)
  return request.data
}

const createBlog = async (title, author, url) =>{
  const config = {
    headers: { Authorization: token },
  }
  const newBlog = {
    title: title,
    author: author,
    url: url
  }
  const request = await axios.post(baseUrl,newBlog,config)
  return request.data
}

export default { getAll, setToken, createBlog }