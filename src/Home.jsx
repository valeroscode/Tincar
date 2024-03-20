import React, { useRef, useEffect, useState } from 'react';
import './styles/Home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faStar, faBullseye, faCheck, faHeart, faFireFlameCurved, faThumbsUp, faCar, faScrewdriverWrench, faFaceSmile  } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import SavedCars from './SavedCars'
import Login from './login'
import { useCookies } from 'react-cookie';
import Footer from './Footer';

function App() {

  const [activeForm, setActiveForm] = useState('login')

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

    function callStripe(e, id) {
      if (cookies.access_token) {
      fetch('https://tincar.onrender.com/create-checkout-session', {
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

      if (document.getElementById('create-account').style.display !== 'none') {
        document.getElementById('create-account').style.display = 'none'
      }
      
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
              <Link to={'/find'}><button id="find-car">Find A Car</button></Link>
              <Link to={'/Blog'}><button id="careers-btn">Blog</button></Link>
              <Link to={'/careers'}><button id="careers-btn">Careers</button></Link>
              <ul className="bar1 navbar-nav ml-auto" style={{flexDirection: 'row'}}>
               
                <li className="nav-item">

                {
                  cookies.access_token ? <SavedCars/> : 
                  <div>
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
                }
                  
                </li>
                <li className="nav-item">
                  {
                    cookies.access_token ? <div id="account"><p className='name-of-user'>Hello, {localStorage.getItem('name')} 👋</p><button onClick={() => logOut()}>Log Out</button></div> : null
                  }
                </li>
             
              </ul>
            </nav>
          </div>
          {/* Title */}
          <div className='title-container'>
          <div className="title-page col-lg-6">
            <div className="content">
              <h1 style={{ fontWeight: 700, fontSize: '3rem', textAlign: 'left' }}>Find your dream used car nearby.</h1>
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
        <section id="who-we-are">

          <div id="who-we-are-left">

            <h5>Who We Are</h5>

            <h3>Make Car Shopping Easy and Fun</h3>
            <p className='who-we-are-info'>Take your car buying experience to the next level with TinCar. We make it easier than ever to narrow down your search and find exactly what you're looking for.</p>
            <div id="who-we-are-cards">
              <div>
              <FontAwesomeIcon icon={faCar} color='#ff4c68' />
                <h4>For Enthusiasts</h4>
              </div>
              <div>
              <FontAwesomeIcon icon={faThumbsUp} color='#ff4c68' />
                <h4>Easy To Use</h4>
              </div>
              <div>
              <FontAwesomeIcon icon={faScrewdriverWrench} color='#ff4c68' />
              <h4>Everything You Need</h4>
              </div>
            </div>
          </div>

          <div id="who-we-are-right">
              <img src="whowearecar.png"></img>
              <div></div>
          </div>

        </section>
        
        <section id="dont-settle">
          <div id="dont-settle-left">
              <img src="dontsettle2.jpg"></img>
              <img src="dontsettle1.jpg"></img>
          </div>

          <div id="dont-settle-right">
              <h2>Don't Settle For Mediocre Car Shopping.</h2>
              <p>Let us help you find the perfect used car by letting YOU spec out important parts that similar brands have never thought of.</p>
              <Link to={'/find'}><button>Find A Car</button></Link>
          </div>
        </section>


        <section id="more-info-about">

          <div id="flex-1">
            <div className='flex-text'>
                  <h3>Take your car shopping from zero to hero.</h3>
                  <div>
                  <FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",}} />
                    <p>Filter by engine, drive train and more.</p>
                  </div>
                  <div>
                  <FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",}} />
                    <p>Shop across the most popular makes and models.</p>
                  </div>
                  <div>
                  <FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",}} />
                  <p>Get financing information with just a few clicks.</p>
                  </div>
                  <Link to="/About"><button>
                    Learn More
                  </button></Link>
            </div>

            <div className='flex-media'>
                <img src='moreinfocars.jpg'></img>
                <div className='flex-media-info-block'>
                <FontAwesomeIcon icon={faStar} style={{color: "#ffffff",}} />
                  <div>
                    <h5>All the best features</h5>
                    <p>Transform the way you shop for cars, making it more customizable than ever.</p>
                  </div>
                </div>
            </div>
          </div>

          <div id="flex-2">
          <div className='flex-text'>
          <h3>Log in to get all the features.</h3>
                  <div>
                  <p className='flex-2-info'>
                    Create an account or login to get access to our memberships, save cars with financing information, and get the most optimized car shopping experience. Get exclusive details on cars within your price range making it even easier to find your dream car.
                  </p>
                  </div>
                  
                  <button onClick={() => showLoginModal()}>
                    Log In
                  </button>
          </div>

          <div className='flex-media'>
          <img src='moreinfocars.jpg'></img>
                <div className='flex-media-info-block-2'>
                <FontAwesomeIcon icon={faCar} style={{color: "#ffffff",}} />
                  <div>
                    <h5>Create An Account</h5>
                    <p>Optimize your car shopping even further with us and create your account.</p>
                  </div>
                </div>
          </div>
          </div>

        </section>

        <section id="achieve">
          <h1><a>Find</a> your dream car sooner rather than later.</h1>
          <div id="awards">

            <div className='margin'>
            <FontAwesomeIcon icon={faStar} color='#FF4C68' />
            <p>Forbes Top 10</p>
            </div>
            <div className='margin'>
            <FontAwesomeIcon icon={faHeart} color='#FF4C68' />
            <p>Customers #1 Pick</p>
            </div>
            <div>
            <FontAwesomeIcon icon={faCheck} color='#FF4C68' />
            <p>98% Success Rate</p>
            </div>

          </div>
          <hr/>

          <div id="customer-stats">
              <h2>Here's some stats on our customers and what YOU can expect.</h2>
              <div id="stats">
                  <div className='stat'>
                    <div className='background-div'></div>
                    <div className='colored-div' style={{width:'98%'}}>
                      <p>Customer Satisfaction</p>
                      <p>98%</p>
                    </div>
                  </div>

                  <div className='stat'>
                  <div className='background-div'></div>
                  <div className='colored-div' style={{width:'80%'}}>
                  <p>Take only 1 week to find a car</p>
                  <p>80%</p>
                  </div>
                  </div>

                  <div className='stat'>
                  <div className='background-div'></div>
                  <div className='colored-div' style={{width:'80%'}}>
                  <p>Take only 1 week to find a car</p>
                  <p>80%</p>
                  </div>
                  </div>
              </div>
          </div>
        </section>

        <section id="links">
          <div className='links-div'>
            <img src='blog.jpg'></img>
            <div>
            <h3>Blog</h3>
            <Link to="/Blog"><button>See Blog</button></Link>
            </div>
          </div>
          <div className='links-div'>
          <img src='handshake.jpg'></img>
          <div>
            <h3>Carrers</h3>
            <Link to="/Careers"><button>See Careers</button></Link>
            </div>
          </div>
          <div className='links-div'>
          <img src='carfinder.jpg'></img>
          <div>
            <h3>Car Finder</h3>
            <Link to="/Find"><button>Find A Car</button></Link>
          </div>
          </div>
        </section>

        <section id="more-stats">
        <h2>Discover the exceptional quality of Tincar.</h2>
        <div id='stat-numbers'>
        <div className='stat-info'>
            <h3>3,000+</h3>
            <div>
              <FontAwesomeIcon icon={faFaceSmile} color='#ff4c68' />
              <p>Happy Customers</p>
            </div>
          </div>
          
          <div className='stat-info'>
          <h3>9,000+</h3>
            <div> 
              <FontAwesomeIcon icon={faCar} color='#ff4c68' />
              <p>Vehicles Found</p>
            </div>
          </div>
        </div>
        </section>


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
          <img className="sponsor" src="biz-insider-logo.png" alt="biz-insider-logo" />
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
                  <button onClick={(e) => callStripe(e, 1)} type="button" className="btn btn-lg btn-block btn-outline-danger editbtn">
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
                  <button onClick={(e) => callStripe(e, 2)} type="button" className="btn btn-danger btn-lg btn-block editbtn">
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
        <Footer/>
 </>
  );
};

export default App;