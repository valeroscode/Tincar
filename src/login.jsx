import React, { useEffect, useRef } from 'react';
import './styles/Home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faBullseye, faHeart, faFireFlameCurved  } from "@fortawesome/free-solid-svg-icons";
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom';

function Login () {

  const loginSec = useRef();
  const username = useRef();
  const password = useRef();
  const loginForm = useRef();
  const alreadyHave = useRef();
  const loginContainer = useRef();
  const regContainer = useRef();
  const [cookies, setCookies] = useCookies(["access_token", "has_account"])

  const regName = useRef();
  const regUsername = useRef();
  const regPassword = useRef();
  const createAcc = useRef();
  const newHere = useRef();
  
  useEffect(() => {
    function checkLoginModal() {
    window.setInterval()
    if (!cookies.access_token && !cookies.has_account) {
    setTimeout(() => {
      loginSec.current.style.display = 'flex'
      loginSec.current.classList.add('fadeLogin')
    }, 4000)
  }
  }
  }, [])

  function loginModal(e) {
    e.target.closest('#login-section').classList.remove('fadeLogin')
    e.target.closest('#login-section').classList.add('fadeOut');
    setTimeout(() => {
      e.target.closest('#login-section').style.display = 'none'
    }, 500)
  }

  function handleLogin(username, password) {
    if (username !== '' && password !== '') {
    fetch(`http://localhost:3000/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => {
     return res.json()
    }).then((value) => {
      console.log(value)
      setCookies('access_token', value.token)
      localStorage.setItem('userID', value.userID)
      localStorage.setItem('name', value.name)
      window.location.reload()
    }).catch(e => {
      console.error(e.error)
    })
  }
  } 

  function handleSignUp() {
    if (regName.current.value !== '' && regUsername.current.value !== '' && regPassword.current.value !== '') {
    fetch(`http://localhost:3000/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: regName.current.value,
        username: regUsername.current.value,
        password: regPassword.current.value
      })
    }).then(res => {
     return res.json()
    }).then((value) => {
      console.log(value)
      handleLogin(regUsername.current.value, regPassword.current.value)
    }).catch(e => {
      console.error(e.error)
    })
  } else {
    alert('all fields must be filled')
  }
  } 

  function showLogin(e) {
    createAcc.current.classList.remove("fadeLogin");
    alreadyHave.current.classList.remove("fadeLogin");
    regContainer.current.classList.remove('slideIn');
    regContainer.current.classList.add('slideOut');
    newHere.current.style.display = 'none'
    loginForm.current.style.display = 'none'
    createAcc.current.style.display = 'none';
    
    loginForm.current.style.display = 'flex'
    newHere.current.style.display = 'flex'
    setTimeout(() => {
      loginForm.current.classList.add("fadeLogin");
      newHere.current.classList.add("fadeLogin")
      alreadyHave.current.style.display = 'none'
    }, 600)
  }

  function showSignUp(e) {
    newHere.current.style.display = 'none'
    loginForm.current.style.display = 'none'
    loginForm.current.style.opacity = 0;
    newHere.current.style.opacity = 0;
    if (regContainer.current.classList.contains('slideOut')) {
      regContainer.current.classList.remove('slideOut');
    }
    if (loginForm.current.classList.contains("fadeLogin")) {
      loginForm.current.classList.remove("fadeLogin");
      newHere.current.classList.remove("fadeLogin")
    }
    regContainer.current.classList.add('slideIn');
    createAcc.current.style.display = 'flex';
alreadyHave.current.style.display = 'flex'
        setTimeout(() => {
      createAcc.current.classList.add("fadeLogin");
      alreadyHave.current.classList.add("fadeLogin")
    }, 600)
  }

  return (
  <>
  <section ref={loginSec} id='login-section'>
  <section id='login' ref={loginContainer}>

    <div ref={alreadyHave} id='already-have'>
    
    <h2>Have an Account?</h2>
    <button onClick={(e) => showLogin(e)} id="already-have-btn">Log In</button>
    </div>

    <div ref={loginForm} id='login-form'>
        <h2>Login to Your Account</h2>
        <p>And experiance car shopping magic</p>
        <input ref={username} placeholder='Username' id='username' type="text" />
        <input ref={password} placeholder='Password' id='password' type="text" />
        <div id='demo-acc'>
          <h3>Demo Account</h3>
            <p>Username: Caruser@car.com</p>
            <p>Password: 5678</p>
        </div>
        <button onClick={(e) => handleLogin(username.current.value, password.current.value)}>Sign In</button>
    </div>
  </section>
  <div id='backdrop'></div>
  <section id='register' ref={regContainer}>
    <div ref={newHere} id='new-here'>
    <div className='X' onClick={(e) => loginModal(e)}>X</div>
    <h2>New Here?</h2>
    <p>Sign up to discover what the used car market has to offer!</p>
    <button id="signup-btn" onClick={(e) => showSignUp(e)}>Sign Up</button>
    </div>

    <div ref={createAcc} id='create-account'>
    <div className='X' onClick={(e) => loginModal(e)}>X</div>
    <h2>Create an Account</h2>
        <p>And experiance car shopping magic</p>
        <input ref={regName} placeholder='Name' id='reg-name' type="text" />
        <input ref={regUsername} placeholder='Username' id='reg-username' type="text" />
        <input ref={regPassword} placeholder='Password' id='reg-password' type="text" />
        <button onClick={() => handleSignUp()}>Create Account</button>
    </div>
  </section>
  </section>
  </>
  )
}

export default Login