import React, { useEffect, useRef, useState } from 'react'
import './styles/Finder.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameCurved  } from "@fortawesome/free-solid-svg-icons";
import {useCookies} from 'react-cookie'


function SavedCars() {
    const h3 = useRef();
    const showMenuBtn = useRef();
    const hr = useRef();
    const carsList = useRef();

    const [cookies, setCookies] = useCookies(["cars"])
    const [cars, setCars] = useState([])

    useEffect(() => {
    
      async function getCars() { 
      fetch(`http://localhost:5173/auth/getCars/${localStorage.getItem('userID')}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }).then(res => {
        return res.json()
      }).then(value => {
        setCars(value.data.cars)
      }).catch((e) => {
        console.error(e.error)
      })
    }

    if (cookies.access_token) {
      getCars();
    }

      document.body.addEventListener('click', (e) => {
        hideSavedCars(e)
      })
 

    }, [])

    function hideSavedCars(e) {
      const sideBar = document.getElementById('saved-cars-container');
      if (e.target !== sideBar && !e.target.closest('#saved-cars-container') &&
       e.target.classList.contains('nav-link') == false &&
       (sideBar.style.right !== '-30vw' || sideBar.style.right !== '-80vw')) {
        if (window.innerWidth <= 440) {
          sideBar.style.right = '-100vw';
        } else {
        sideBar.style.right = '-30vw';
      } 
    }
  }

    function showSideBar() {
        document.getElementById('saved-cars-container').style.right = '0vw';
    }

    function removeCar(e) {
    const carData = document.getElementsByClassName('parent-div')
    const model = document.getElementsByClassName('model')
    if (document.getElementById('filtered-car-data').style.display !== 'none') {
    if (e.target.textContent === 'Remove') {
        for (let i = 0; i < carData.length; i++) {
        if (carData[i].firstElementChild.firstElementChild.textContent === e.target.closest('.saved-car').childNodes[0].childNodes[0].textContent) {
        carData[i].childNodes[4].childNodes[1].childNodes[1].childNodes[2].innerHTML = 'Save';
        carData[i].childNodes[4].childNodes[1].childNodes[1].childNodes[2].style.backgroundColor = '#ff4c68'
        }
        }
        
        for (let i = 0; i < model.length; i++) {
        if (model[i].firstElementChild.textContent === e.target.closest('.saved-car').childNodes[0].childNodes[0].textContent) {
        model[i].childNodes[3].childNodes[2].innerHTML = 'Save'
        model[i].childNodes[3].childNodes[2].style.backgroundColor = '#ff4c68'
        }
        }
      }
        e.target.closest('.saved-car').remove()

        fetch(`http://localhost:5173/auth/removeCar`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "userID": localStorage.getItem("userID"),
            "id": e.target.id
          })
        }).then(res => {
          console.log(res.json())
       return res.json()
        }).then(value => {
          console.log(value)
        }).catch((e) => {
          console.error(e.error)
        })

    }
    }

    const styles = {
        color: 'white',
        style: function () {
        window.location.pathname === '/find' ? this.color = '#ff4c68' : null
        },
    }

    styles.style();

  return (
    <>
    <a ref={showMenuBtn} className="nav-link" style={{cursor: 'pointer', color: styles.color}} onClick={() => showSideBar()}>
    Saved Cars
    </a>
    <div id='saved-cars-container'>
       <h3 ref={h3} className='fw-bold position-relative align-items-center'><FontAwesomeIcon icon={faFireFlameCurved} className='p-2 position-relative' style={{color: "#ff4c68", marginRight: '0.5rem'}} /> Saved Cars</h3>
        <hr ref={hr} className='position-relative' />
        <ul onClick={(e) => removeCar(e)} ref={carsList} id='cars-list' className='list-group list-group-flush'>
        {
          cars.map((car) => <li className='saved-car'>
            <div className='container-top'>
            <h4>{car.car_name}</h4>
            <h5>{car.price}</h5>
            </div>
            <p>{car.engine}</p>
            <div className='vehicle-details'>
              <p>{car.drive}</p>
              <p>{car.body}</p>
              <p>{car.transmission}</p>
            </div>
              <p></p>
              <button id={car._id}
               className='remove-btn btn btn-danger'>Remove</button>
            
          </li>)
        }
        </ul>
    </div>
    </>
  )
}

export default SavedCars