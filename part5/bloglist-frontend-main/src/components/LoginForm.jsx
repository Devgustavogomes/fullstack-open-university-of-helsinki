import { useState } from "react"


const LoginForm = ({handleLogin}) =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (e) => {
        await handleLogin(e, username, password)
        setUsername('')
        setPassword('')
    }

    return(
      <div>
        <h2>Log in to application</h2>
        <form className="form" onSubmit={onSubmit}>
          <label>
            username
            <input type="text" onChange={({target}) => setUsername(target.value)} value={username}></input>
          </label>
          <label>
            password
            <input type="password" onChange={({target}) => setPassword(target.value)} value={password}></input>
          </label>
          <button type="submit" className="submit">Login</button>
        </form>
      </div>
    )
}

export default LoginForm