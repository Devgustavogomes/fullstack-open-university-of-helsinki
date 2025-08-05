import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import LoginForm from './components/loginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  
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

  const handleLogin = async (e, username, password) =>{
    e.preventDefault()
        
    const user = await userService.userLogin(username,password)
    
    blogService.setToken(user.token)
    setUser(user)
    window.localStorage.setItem('LoggedBloglistUser', JSON.stringify(user))
  }

  const handleLogout = () =>{
    setUser(null)
    setBlogs([])
    window.localStorage.removeItem('LoggedBloglistUser')
  }

  if (user === null) {
    return (
      <LoginForm handleLogin={handleLogin}/>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{`${user.username} logged in`}</p>
      <button onClick={handleLogout}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App