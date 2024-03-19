import React, { useEffect, useRef, useState } from 'react'
import {careersInfo, locations, types, fields} from './CareersInfo'
import './styles/Careers.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faStar, faBullseye, faCheck, faHeart, faFireFlameCurved, faThumbsUp, faCar, faScrewdriverWrench, faFaceSmile  } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Pagination from './Pagination'

function Careers() {

const searchTitle = useRef();
const results = useRef();
const jobDetails = useRef();
const findCareerSec = useRef();
const jobFinderText = useRef();
const [reload, setReload] = useState(false)
const [selectedJob, setSelectedJob] = useState({
    title: "",
    description: "",
    "job type": "",
    "job field": "",
    education: "",
    skills: "",
    location: "",
    date: "",
})
const careerFinder = useRef();
const careerVideo = useRef();
const [searchResults, setSearchResults] = useState([...careersInfo])
const [scores, setScores] = useState([])
const [filterArr, setFilterArr] = useState({
    location: 0,
    field: 0,
    type: 0
});

const [filterScores, setFilterScores] = useState({
    location: 0,
    'job type': 0,
    'job field': 0
})

const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(10);

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);

// Change page
const paginate = pageNumber => setCurrentPage(pageNumber);

useEffect(() => {

    //This state variable will not be changed.
    //It's purpose is to stay constant on each rerender
    setScores([...careersInfo])

    careerFinder.current.classList.add('componentShow')

    window.scrollTo({
        top: 0
      })

      careersInfo.map((job) => job.score = 0)


      const slideLeftObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('slideFadeInLeft', entry.isIntersecting)
        })
      })
      slideLeftObserver.observe(jobFinderText.current)

      if (window.location.pathname === 'careers') {
      window.addEventListener('click', (e) => {

        if (jobDetails.current.style.right === '0px' && e.target.closest("#job-details") === null && e.target.closest(".job-listing") === null) {
           jobDetails.current.style.right = '-60rem'
        }
      })
    }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

}, [])

function toggleDropdown(e) {
const list = e.target.closest('.dropdown-container').nextElementSibling;
if (list.style.display === 'none') {
    list.style.display = 'flex'
} else {
    list.style.display = 'none'
}
}

function handleFiltering(e, type) {
    setSearchResults([])
    const filter = e.target.nextElementSibling.textContent;

    if (!e.target.checked) {
        const nodes = Array.from(document.querySelectorAll(`[name='${type}']`));
        if (filterScores[type] === 1 && nodes.every((node) => node.checked === false)) {
            filterScores[type] = 0;
            setFilterScores(filterScores)
        }

        for (let i = 0; i < scores.length; i++) {
            if (scores[i][type] === filter) {
            scores[i].score = scores[i].score - 1
            }
        }
    } else {
        if (filterScores[type] === 0) {
            filterScores[type] = 1;
            setFilterScores(filterScores)
        }
    
        for (let i = 0; i < scores.length; i++) {
            if (scores[i][type] === filter) {
            scores[i].score = scores[i].score + 1
            }
        }
    }
    setScores(scores)
}

useEffect(() => {

    if (searchResults.length === 0) {
    //Sets the total score used to determine which jobs can show
    const total = filterScores.location + filterScores['job field'] + filterScores['job type']

    for (let i = 0; i < scores.length; i++) {
        if (scores[i].score === total) {
            searchResults.push(scores[i])
        } 
    }
    
    setSearchResults(searchResults)
    }
    setReload(!reload)

}, [searchResults])

function showJobDetails(e) {
const job = e.target;
selectedJob.title = job.getAttribute('title')
selectedJob.description = job.getAttribute('description')
selectedJob["job type"] = job.getAttribute('type')
selectedJob["job field"] = job.getAttribute('field')
selectedJob.education = job.getAttribute('education')
selectedJob.skills = job.getAttribute('skills')
selectedJob.location = job.getAttribute('location')
selectedJob.date = job.getAttribute('date')
setSelectedJob(selectedJob)
setReload(!reload)
jobDetails.current.style.right = 0;
}

function hideJobDetails(e) {
    if (jobDetails.current.style.right === 0) {
        jobDetails.current.style.right = '-60rem'
    }
}


  return (
    <>
    <Header/>
    <section id='career-section' ref={careerFinder} onClick={(e) => hideJobDetails(e)}>
    <div id='careers-image'>
      <img id='careers-background-img' ref={careerVideo} src="careersinfo2.jpg"></img>
      <h1>TINCAR GROUP USA</h1>
    </div>

    <div id="careers-text-div">
    <h1>CAREER WITH THE TINCAR GROUP IN THE USA.</h1>
    <h5>SHARE YOUR PASSION.</h5>
    <p>If you’re passionate about changing the way the world moves for good then there’s never been a more exciting time to be part of the Tincar Group. Our brands TinCar, TinMotors, TinFridges and TinBlenders have made us the world’s leading premium finder of cars and a provider of premium financial and mobility services. We are always looking for new talent to help us keep pushing the limits of what’s possible in a broad variety of roles.
    Scroll down to explore your opportunities with us, discover more about our world, and experience our unique culture through the eyes of the people who know it best – our people.</p>
    </div>
         
   <div id='job-finder'>
    <h3 ref={jobFinderText}>JOB FINDER.</h3>
   </div>

    <section id='find-career-section' ref={findCareerSec}>
    <h3 ref={searchTitle}>We found {searchResults.length} vacancies based on your filters.</h3>
    <ul id='career-selection-modal'>
        
        <li name="LOCATION" id="">
            
            <div className='dropdown-container' onClick={(e) => toggleDropdown(e)}>
                <h6>LOCATION ({filterArr.location})</h6>
                <button>▼</button>
            </div>
            <div className='dropdown-list' key='parent' style={{display: "none"}}>
            {
                
                locations.map((value, index) => <div key={'d' + index} className='DD-item'>
                    <input key={'i' + index} type="checkbox" name='location' onClick={(e) => {
                        if (e.target.checked) {
                            filterArr.location++
                            setFilterArr(filterArr)
                        } else {
                            filterArr.location--
                            setFilterArr(filterArr)
                        }
                        handleFiltering(e, e.target.getAttribute('name'))
                        }} />
                    <p key={'P' + index}>{value}</p>
                </div>
                )
            }
            </div>
            
        
        </li>

        <li name="JOB TYPE" id="">
            
        <div className='dropdown-container' onClick={(e) => toggleDropdown(e)}>
                <h6>JOB TYPE ({filterArr.type})</h6>
                <button>▼</button>
            </div>
            <div className='dropdown-list' style={{display: "none"}}>
            {
                
                types.map((value) => <div className='DD-item'>
                    <input type="checkbox" name='job type' onClick={(e) => {
                        if (e.target.checked) {
                            filterArr.type++
                            setFilterArr(filterArr)
                        } else {
                            filterArr.type--
                            setFilterArr(filterArr)
                        }
                        handleFiltering(e, e.target.getAttribute('name'))}}/>
                    <p>{value}</p>
                </div>
                )
            }
            </div>
        </li>

        <li name="JOB FIELD" id="">
            
        <div className='dropdown-container' onClick={(e) => toggleDropdown(e)}>
                <h6>JOB FIELD ({filterArr.field})</h6>
                <button>▼</button>
            </div>
            <div className='dropdown-list' style={{display: "none"}}>
            {
                
                fields.map((value) => <div className='DD-item'>
                    <input type="checkbox" name='job field' onClick={(e) => {
                        if (e.target.checked) {
                            filterArr.field++
                            setFilterArr(filterArr)
                        } else {
                            filterArr.field--
                            setFilterArr(filterArr)
                        }
                        handleFiltering(e, e.target.getAttribute('name'))}}/>
                    <p>{value}</p>
                </div>
                )
            }
            </div>
            
        </li>

    </ul>

    <div id='search-results' ref={results}>
            {
                currentPosts.map((career) => 
                    <div className='job-listing'
                    location={career.location}
                    field={career['job field']}
                    type={career['job type']}
                    title={career.title}
                    description={career.description}
                    education={career.education}
                    skills={career.skills}
                    date={career.date}
                    onClick={(e) => showJobDetails(e)}>
                        <div><h5>{career.title}</h5>
                        <p>Listed: {career.date}</p>
                        </div>
                        <div>
                            <h5>{career['job field']}</h5>
                        </div>
                        <div>
                            <h5>{career.location}</h5>
                        </div>
                        
                    </div>
                )
            }
    </div>
    <Pagination
        postsPerPage={postsPerPage}
        totalPosts={searchResults.length}
        paginate={paginate}
      />
    </section>
    </section>

    <div id='job-details' ref={jobDetails}>
    <img src="careerimg.jpg">
    </img>
    <button className='X-btn' onClick={() => jobDetails.current.style.right = '-60rem'}>
    <svg xmlns="http://www.w3.org/2000/svg" height="42" width="34" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
    </button>
    <div id='job-details-info'>
    <p>{selectedJob['job field']} | {selectedJob.location} | {selectedJob.date}</p>
    <h1>{selectedJob.title}</h1>
    <p className='description'>{selectedJob.description}</p>
    <p className='benefits'>&nbsp;<br/>- Medical, Dental, Prescription and Vision coverage 
    <br/>- Paid time off <br/>- 401(k) plan with company matching contribution <br/>
    - Retirement Income Account <br/>- Life insurance <br/>
    - Medical Flexible Spending Account (FSA) <br/>
    - Company vehicle program</p>
    
    <h4 style={{margin: 0}}>Qualifications:</h4>
    <p>{selectedJob.education}</p>
    <div className='bottom'>
        <h3>{selectedJob.title}</h3>
        <div id='bottom-details'>
        <div>
            <h5>Legal Entity:</h5>
            <p>TinCar LLC</p>
        </div>
        <div>
            <h5>Location:</h5>
            <p>1100 Ferrari Way</p>
        </div>
        <div>
            <h5>Job field:</h5>
            <p>{selectedJob['job field']}</p>
        </div>
        <div>
            <h5>Job ID:</h5>
            <p>1234567WSS</p>
        </div>
        <div>
            <h5>Publication date:</h5>
            <p>{selectedJob.date}</p>
        </div>
        </div>
        <button id='apply-btn'>APPLY</button>
    </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Careers