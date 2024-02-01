import React, { useRef, useEffect } from 'react';
import './styles/Home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faBullseye, faHeart, faFireFlameCurved  } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import SavedCars from './SavedCars'
import Login from './login'
import { Cookies, useCookies } from 'react-cookie';

function App() {

    const firstTest = useRef();
    const lastTest = useRef();

    const [cookies, setCookies, removeCookie] = useCookies(["access_token", "has_account"])

    function switchCards() {
        firstTest.current.classList.toggle('active')
        lastTest.current.classList.toggle('active')
    }

    const porsche = useRef();
    const easy = useRef();
    const bullseye = useRef();
    const heart = useRef();

    useEffect(() => {
    if (window.location.pathname === '/') {
    window.addEventListener('scroll', (e) => {
      porsche.current.style.transform = `translateX(calc(${window.scrollY}px * 4))`
      const position = porsche.current.getBoundingClientRect().left
     if (position >= 43 && position < 100) {
        easy.current.style.transform = 'scale(1.4)'
        setTimeout(() => {
        easy.current.style.transform = 'scale(1)'
      }, 400)
    } else if (position >= 264 && position < 400) {
      bullseye.current.style.transform = 'scale(1.4)'
        setTimeout(() => {
        bullseye.current.style.transform = 'scale(1)'
      }, 400)
    } else if (position >= 916 && position < 1000) {
      heart.current.style.transform = 'scale(1.4)'
        setTimeout(() => {
        heart.current.style.transform = 'scale(1)'
      }, 400)
    }
      
    })
  }
}, [])

    function hideSavedCars(e) {
      const sideBar = document.getElementById('saved-cars-container');
      if (e.target !== sideBar && !e.target.closest('#saved-cars-container') &&
       e.target.classList.contains('nav-link') == false &&
       (sideBar.style.right !== '-20vw' || sideBar.style.right !== '-80vw')) {
        if (window.innerWidth <= 440) {
          sideBar.style.right = '-80vw';
        } else {
        sideBar.style.right = '-20vw';
      } 
    }
  }

    useEffect(() => {
      document.body.addEventListener('click', (e) => {
        hideSavedCars(e)
      })
    }, [])

    function callStripe(e, id) {
      if (cookies.access_token) {
      fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: [
            { id: id, quantity: 1 },
          ]
        })
      }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      }).then(({ url }) => {
        window.location = url
      }).catch(e => {
        console.error(e.error)
      })
    } else {
      showLoginModal()
    }
    }

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
        <section id="title">
          <div className="container-fluid" style={{ backgroundColor: '#ff4c68' }}>
            {/* Nav Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark">
              <a className="navbar-brand">
                {' '}
                <h4 style={{ fontSize: '2rem' }}>
                  <b>tincar <FontAwesomeIcon icon={faFireFlameCurved} /></b>
                </h4>
              </a>
              <ul className="bar1 navbar-nav ml-auto" style={{flexDirection: 'row'}}>
                <li className="nav-item">
                  <a className="nav-link" href="">
                  <Link to={'/find'}>Car Finder</Link>
                  </a>
                </li>
                <li className="nav-item">

                {
                  cookies.access_token ? <SavedCars/> : <button id='logIn-Btn'
                  onClick={() => showLoginModal()}>Log In</button>
                }
                  
                </li>
                <li className="nav-item">
                  {
                    cookies.access_token ? <p className='name-of-user'>Hello, {localStorage.getItem('name')} 👋</p> : null
                  }
                </li>
                <li>
                  {
                    cookies.access_token ?
                <button id='log-out-btn' onClick={() => logOut()}>
                  Log Out
                </button> : null
                  }
                </li>
              </ul>
            </nav>
          </div>
          {/* Title */}
          <div className='title-container'>
          <div className="title-page col-lg-6">
            <div className="content">
              <h1 style={{ fontWeight: 700, fontSize: '3rem' }}>Find your dream used car nearby.</h1>
            </div>
            <button type="button" className="button btn btn-dark">
              <Link style={{color: 'white', textDecoration: 'none', cursor: 'pointer'}} to={'/find'}>Get Started</Link>
            </button>
          </div>
          <div className="i-phone col-lg-6">
            <img ref={porsche} className='porsche' src='./porsche-model.png' alt="iphone-mockup" />
          </div>
          </div>
        </section>
        {/* Features */}
        <section id="features">
          <div className="row">
            <div className="feature-box col-lg-4">
              <h3 style={{ fontWeight: 700, fontSize: '1.5rem' }}>
              <FontAwesomeIcon className='icon-home' icon={faCircleCheck} style={{color: "#ff4c68",}} size="2xl" ref={easy} />
                <br />
                Easy to use.
              </h3>
              <p className="p1">So easy to use, easier than driving in Miami.</p>
            </div>
            <div className="feature-box col-lg-4">
              <h3 style={{ fontWeight: 700, fontSize: '1.5rem' }}>
              <FontAwesomeIcon className='icon-home' icon={faBullseye} style={{color: "#ff4c68",}} size="2xl" ref={bullseye} />
                <br />
                Extraordinarily accurate
              </h3>
              <p className="p1">Objectively true 100% of the time.</p>
            </div>
            <div className="feature-box col-lg-4">
              <h3 style={{ fontWeight: 700, fontSize: '1.5rem' }}>
              <FontAwesomeIcon className='icon-home' icon={faHeart} style={{color: "#ff4c68",}} size="2xl" ref={heart} />
                <br />
                Guaranteed to work.
              </h3>
              <p className="p1">Find the used car you've always dreamed of or your money back.</p>
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section id="testimonials">
          <div className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-slide-to="0" className="active"></li>
              <li data-slide-to="1"></li>
              <li data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div ref={firstTest} className="carousel-item active">
                <h2 style={{ fontWeight: 700 }} className="testimonial-text">
                  So no offense to TinCar but I bought a car here and realized driving is kind of pointless since I just web swing... I guess that's my fault? Anyway, let me stop talking before I spoil the next movie.
                </h2>
                <img className='superhero-pic' src="/spiderman.jpg" alt="hero-profile" /> &nbsp;
                <em>Peter, New York</em>
              </div>
              <div ref={lastTest} className="carousel-item">
                <h2 style={{ fontWeight: 700 }} className="testimonial-text">
                  Stark approved. Found a cherry red ferrari for the Mrs back in 2022, couldn't find a new one cause of the chip shortage and I was too busy to make a chip myself. TinCar was very helpful in finding said Ferrari. Peace.
                </h2>
                <img className='superhero-pic' src="/tonystark.jpg" alt="hero-profile" /> &nbsp;
                <em>Tony Stark, New York</em>
              </div>
            </div>
            {/* controls and arrows */}
            <a className="carousel-control-prev" role="button" data-slide="prev"
            onClick={(e) => switchCards(e)}>
              <span className="sr-only">Previous</span>
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </a>
            <a className="carousel-control-next" role="button" data-slide="next"
            onClick={(e) => switchCards(e)}>
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          {/* Bootstrap 5 */}
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossOrigin="anonymous"
          />
        </section>
        {/* Press */}
        <section id="press">
          <img className="sponsor" src="/techcrunch-logo.png" alt="tc-logo" />
          <img className="sponsor" src="/tnw-logo_1.png" alt="tnw-logo" />
          <img className="sponsor" src="/Bi_light_background_color_horizontal.png" alt="biz-insider-logo" />
          <img className="sponsor" src="/Mashable_Logo.svg.png" alt="mashable-logo" />
        </section>
        {/* Pricing */}
        <section id="pricing" style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontWeight: 900 }} className="pricing-header">
            A Plan for Every Car Shopper's Needs
          </h2>
          <p className="pricing-sub">Simple and affordable price plans for you and your engines.</p>
          <p>(Seriously, click on the sign up links. They work.)</p>
          <div className="row">
            <div style={{minHeight: '19rem', marginTop: '1rem'}} className="col-lg-4 col-md-6">
              <div style={{height: '100%'}} className="card">
                <div className="card-header">
                  <h3 style={{ fontWeight: 700 }}>PT Cruiser</h3>
                </div>
                <div className="card-body">
                  <h2 style={{ fontWeight: 700 }}>$10 / mo</h2>
                  <p>5 Matches Per Day</p>
                  <p>10 Messages Per Day</p>
                  <p>Unlimited App Usage</p>
                  <button onClick={(e) => callStripe(e, 1)} type="button" className="btn btn-lg btn-block btn-outline-danger">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
            <div style={{minHeight: '19rem', marginTop: '1rem'}} className="col-lg-4 col-md-6">
              <div style={{height: '100%'}} className="card">
                <div className="card-header">
                  <h3 style={{ fontWeight: 700 }}>Chevelle</h3>
                </div>
                <div className="card-body">
                  <h2 style={{ fontWeight: 700 }}>$30 / mo</h2>
                  <p>Unlimited Matches</p>
                  <p>Unlimited Messages</p>
                  <p>Unlimited App Usage</p>
                  <button onClick={(e) => callStripe(e, 2)} type="button" className="btn btn-danger btn-lg btn-block">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
            <div style={{minHeight: '19rem', marginTop: '1rem'}} className="col-lg-4">
              <div style={{height: '100%'}} className="card">
                <div className="card-header">
                  <h3 style={{ fontWeight: 700 }}>Testarossa</h3>
                </div>
                <div className="card-body">
                  <h2 style={{ fontWeight: 700 }}>$50 / mo</h2>
                  <p>Pirority Listing</p>
                  <p>Unlimited Matches</p>
                  <p>Unlimited Messages</p>
                  <p>Unlimited App Usage</p>
                  <button onClick={(e) => callStripe(e, 3)} type="button" className="btn btn-danger btn-lg btn-block">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        <section id="cta">
          <h3 style={{ fontWeight: 900, color: '#fff', size: '3rem', lineHeight: 1.5 }}>
            So what are you waiting for? Find your <br />Dream Used Car Today.
          </h3>
          <br />
          <div className="cta-butt">
            <button type="button" className="button2 btn btn-dark btn-lg">
            <Link to={'/find'}>Get Started</Link>
            </button>
          </div>
        </section>
        {/* Footer */}
        <footer id="footer">
          <div className="row">
            <div className="social-icons">
              <p>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>&nbsp;&nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M640 317.9C640 409.2 600.6 466.4 529.7 466.4C467.1 466.4 433.9 431.8 372.8 329.8L341.4 277.2C333.1 264.7 326.9 253 320.2 242.2C300.1 276 273.1 325.2 273.1 325.2C206.1 441.8 168.5 466.4 116.2 466.4C43.42 466.4 0 409.1 0 320.5C0 177.5 79.78 42.4 183.9 42.4C234.1 42.4 277.7 67.08 328.7 131.9C365.8 81.8 406.8 42.4 459.3 42.4C558.4 42.4 640 168.1 640 317.9H640zM287.4 192.2C244.5 130.1 216.5 111.7 183 111.7C121.1 111.7 69.22 217.8 69.22 321.7C69.22 370.2 87.7 397.4 118.8 397.4C149 397.4 167.8 378.4 222 293.6C222 293.6 246.7 254.5 287.4 192.2V192.2zM531.2 397.4C563.4 397.4 578.1 369.9 578.1 322.5C578.1 198.3 523.8 97.08 454.9 97.08C421.7 97.08 393.8 123 360 175.1C369.4 188.9 379.1 204.1 389.3 220.5L426.8 282.9C485.5 377 500.3 397.4 531.2 397.4L531.2 397.4z"/></svg> &nbsp;&nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg> &nbsp;&nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
              </p>
            </div>
          </div>
          <p className="copyright" style={{marginBottom: 0, paddingBottom: '1rem'}}>© Copyright 2023 TinCar</p>
        </footer>
 </>
  );
};

export default App;