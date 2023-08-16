import { useState, useRef, useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import './styles.css'

const LoginForm = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate()
  const inputRef = useRef();


  // Focus on username textbox
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleUsername = (e) => {
    e.preventDefault()
    setUsernameInput(e.target.value)
  }
  const handlePassword = (e) => {
    e.preventDefault()
    setPasswordInput(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const response = await axios.post('https://react-music-api-iwdg.onrender.com/users/login',
    // {username: usernameInput, password: passwordInput})
    // console.log(response)
    // if (response.status == 200) {
    //   setUsername(response.data.username)
    //   response.data.likedSongs.map(song => addLikedSong(song))
    //   navigate("/albums")
    // }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="login-container">
        <h2>Login</h2>

        <label htmlFor="username">Username</label>
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          aria-label="Username textbox"
          value={usernameInput}
          onChange={handleUsername}
          ref={inputRef}
        />

        <label htmlFor="password">Password</label>
        <input
          className="input-field"
          type="password"
          placeholder="Sup3rco0lp@assword"
          aria-label="Password textbox"
          value={passwordInput}
          onChange={handlePassword}
        />
        <button type="submit">Submit</button>
      </form>

      <Link to='/signup' >Signup</Link>


    </>
  );
}

export default LoginForm
