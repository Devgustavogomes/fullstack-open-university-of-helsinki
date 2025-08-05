import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'
import ErrorMessage from './components/ErrorMessage'
import ConfirmMessage from './components/ConfirmMessage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState(null)
  
  useEffect(() =>{
    const loggedUserJSON = window.localStorage.getItem('LoggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  const handleErrorMessage = (error) =>{
    setErrorMessage(error)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const handleConfirmMessage = (error) =>{
    setConfirmMessage(error)
    setTimeout(() => setConfirmMessage(null), 5000)
  }

  const handleLogin = async (e, username, password) =>{
    e.preventDefault()
    try {
       const user = await userService.userLogin(username,password)
    
       blogService.setToken(user.token)
       setUser(user)
       window.localStorage.setItem('LoggedBloglistUser', JSON.stringify(user))
    } catch (error) {
       handleErrorMessage(error.response.data.error)
    }
  }

  const handleLogout = () =>{
    setUser(null)
    setBlogs([])
    window.localStorage.removeItem('LoggedBloglistUser')
  }

  const handleCreateBlog = async (e, title, author, url) =>{
    e.preventDefault()
    try {
      const newBlog = await blogService.createBlog(title,author,url)
      setBlogs(blogs.concat(newBlog))
      handleConfirmMessage(`a new blog ${title} ${author}`)
    } catch (error) {
      handleErrorMessage(error.message)
    }
    
  }

  if (user === null) {
    return (
      <div>
        <ErrorMessage errorMessage={errorMessage}/>
        <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <ErrorMessage errorMessage={errorMessage}/>
      <ConfirmMessage confirmMessage={confirmMessage}/>
      <p>{`${user.username} logged in`}</p>
      <button onClick={handleLogout}>Logout</button>
      <h2>Create new</h2>
      <BlogForm handleCreateBlog={handleCreateBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App