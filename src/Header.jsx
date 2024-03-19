import React, { useEffect, useRef, useState } from 'react'
import './styles/Finder.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameCurved, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import SavedCars from './SavedCars';
import Login from './login';
import { useCookies } from 'react-cookie';

function Header() {

  const [activeForm, setActiveForm] = useState('login')

  const [cookies, setCookies, removeCookie] = useCookies(["access_token", "has_account"])

  const navLinks = useRef()

  function toggleNav() {
    
    navLinks.current.style.right = '0'
   
  }

  useEffect(() => {
     window.addEventListener('click', (e) => {
      if (e.target !== null) {
    
      if (e.target.closest('#nav-links') === null && e.target.closest("#navigation-toggle") === null) {
        if (window.innerWidth <= 500) {
        navLinks.current.style.right = '-80vw'
        } else {
          navLinks.current.style.right = '-30vw'
        }
      }

      if (e.target.closest('saved-cars-container')) {

      }
    }
     })
  }, [])

  function showLoginModal() {
    const loginSection = document.getElementById('login-section');
    if (loginSection.classList.contains('fadeOut')) {
      loginSection.classList.remove('fadeOut')
    }
    loginSection.classList.add('fadeLogin');
    loginSection.style.display = 'flex';
    
  }

  function logOut() {
    removeCookie("access_token")
    localStorage.removeItem('userID')
    setCookies("has_account", true)
    window.location.reload();
  }

  return (
    <>
    <Login/>
    <section id="navigation" style={{ backgroundColor: 'whitesmoke' }}>
      
        
          <h1>tincar</h1>
          <FontAwesomeIcon icon={faFireFlameCurved} color='#ff4c68' />
          {
            window.innerWidth <= 526 ? <FontAwesomeIcon id="navigation-toggle" icon={faBars} color='#ff4c68' 
            onClick={() => toggleNav()} /> : null
          }
          <div id="nav-links" ref={navLinks}>
          <Link to="/"><p className='p'>Home</p></Link>
          {window.location.pathname !== "/find" ? <Link to="/find"><p className='p'>Find A Car</p></Link> : null}
          {window.location.pathname !== "/blog" ? <Link to="/blog"><p className='p'>Blog</p></Link> : null}
          {window.location.pathname !== "/careers" ? <Link to="/careers"><p className='p'>Careers</p></Link> : null}
          {!cookies.access_token ? 
          <div id="account-btns">
          <button id="sign-up-btn" onClick={() => {
                    showLoginModal()
                    if (activeForm === 'login') {
                    setTimeout(() => {
                     document.getElementById('signup-btn').click()
                    setActiveForm('signup')
                    }, 100)
                    }
                    }}>
                    Sign Up
                  </button>
                  <button id='logIn-Btn'
                  onClick={() => {
                    showLoginModal()
                    if (activeForm === 'signup') {
                      setTimeout(() => {
                        document.getElementById('already-have-btn').click()
                        setActiveForm('login')
                      }, 100)
                    }
                    }}>Log In</button>
          </div>
          : <div id="account"><button onClick={() => logOut()}>Log Out</button></div>}
          </div>
          {window.location.pathname === "/find" ? <div className='saved-cars-container'><SavedCars/></div> : null}
      
    </section>
    </>
  )
}

export default Header