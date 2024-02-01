import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameCurved, faPlus, faStar, faChevronDown, faFlagCheckered  } from "@fortawesome/free-solid-svg-icons";
import Lottie from 'lottie-react';
import animationData from './assets/waitingAPI.json';
import { Helmet } from 'react-helmet';
import './styles/Finder.css'
import { Link } from 'react-router-dom';
import SavedCars from './SavedCars';
import dotenv from 'dotenv'
import { useCookies } from 'react-cookie';

function Finder() {

  const [cookies, setCookies] = useCookies(["access_token"])

    const lottie = useRef()
    const sorry = useRef()
    const searchRes = useRef()
    let results = [];
    const [loaded, setLoaded] = useState(false)
    const [vehicleResults, setVehicleResults] = useState([])
    const [filterSt, setFilterSt] = useState([])
    const [failedSearch, setFailedSearch] = useState([])
    const filters = []

    const makes = []
    const types = []
    const drive = []
    const years = []
    const engines = []
    const HP = []
    const transmissions = []

    let lastClicked;

    const ul = useRef();
    
    useEffect(() => {
        ul.current.style.display = 'none'
    })

    const financial = {
      Exotic_Cars: ['Lamborghini', 'Ferrari', "Aston Martin"],
      Luxury_Cars_Euro_Am: ['Mercedez-Benz', "BMW", 'Audi', "Cadillac", 'Jaguar'],
      Luxury_JDM: ['Lexus', 'Acura'],
      Eco_Dep_Fast: ['Nissan', 'Kia', 'Volkswagen', 'Mazda', 'Chevrolet', 'Ford'],
      Econ_Cars: ['Toyota'],
      Special_trims: ['M5', 'M2', 'M3', 'M4', 'M6', 'M8', 'S550', 'GS', 'LS', 'S8'],
      Premium_Trims: ['GT-R'],
      Semi_Premium_Trims: ['370Z'],
      Slight_Premium_Trims: ['A5'],
      getMonthlyPayment: function (e) {
          const div = e.target.closest(".market-value")
          const DP = div.childNodes[1].childNodes[0].childNodes[2].childNodes[1].value
          let P = document.getElementById('marketVal').childNodes[0].textContent.replace(',','');
          P = parseInt(P.replace('$','')) - DP
       
          const N = div.childNodes[1].childNodes[0].childNodes[1].childNodes[1].value
          const r = (div.childNodes[1].childNodes[0].childNodes[0].childNodes[1].value / 12)
          const R = r / 12
          div.childNodes[1].childNodes[1].childNodes[1].textContent = `$${(P * (R/12) * (Math.pow((1 + (R/12)), N))/ ((Math.pow((1 + (R/12)), N)) - 1)).toFixed(2)}/mo`
      },
      estMarketValue: function (cost, title) {
          const carName = String(title.childNodes[0].textContent).split(' ')[1];
          const carModel = String(title.childNodes[0].textContent).split(' ')[2];
          const yearsOld = 2013 - parseInt(String(title.childNodes[0].textContent).split(' ')[0])
          const carBody = title.parentNode.parentNode.childNodes[2].firstElementChild.textContent
          const carTrans = title.parentNode.parentNode.childNodes[2].childNodes[1].textContent
          const carDrive = title.parentNode.parentNode.childNodes[2].childNodes[2].textContent
          let averageValue = 9609 + Math.floor(Math.random() * 2100) + 0;
          let ecoFast = Math.floor(Math.random() * 1020) + 6000;
          let exoticCar = averageValue + Math.floor(Math.random() * 150371) + 90800;
          let performanceCar = Math.floor(Math.random() * 80000) + 53100;
          let Luxury = Math.floor(Math.random() * 1900) + 6900;
          let Ultra_Luxury = averageValue + Math.floor(Math.random() * 170300) + 91000
          let Porsche = Math.floor(Math.random() * 8000) + 14850

          const depreciation = (segment, rate) => {
            segment = segment - ((segment * rate) * yearsOld);
          }
          const mutateStr = (amount) => {
            cost.innerHTML = `$${amount.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
          }

          const upCharges = () => {
            carBody === 'SUV' || carBody === 'Minivan' || carBody === 'Crossover' ? averageValue = averageValue + 3200 : null
            carBody === 'Pickup' ? averageValue = averageValue + 11500 : null
            carDrive === 'AWD' || carDrive === '4WD' ? averageValue = averageValue + 1100 : null
            String(carTrans.includes('manual')) ? averageValue = averageValue - 1000 : null
          }

          const handleTrimPremiums = () => {
            if (this.Premium_Trims.includes(carModel)) {
              ecoFast = ecoFast + 80000
            } else if (this.Semi_Premium_Trims.includes(carModel)) {
              ecoFast = ecoFast + 15000
            } else if (this.Slight_Premium_Trims.includes(carModel)) {
              Luxury = Luxury + 6000
            }
          }
        
          //Fast Depreciating performance segment
          if (this.Exotic_Cars.includes(carName)) {
            depreciation(exoticCar, 0.1155)
            mutateStr(exoticCar)
          //Porsche is different bc of the Cayanne
          } else if (carName.includes('Porsche')) {
            if (carModel.includes('Cayenne')) {
            depreciation(Porsche, 0.75)
            mutateStr(Porsche)
            } else {
            Porsche = Porsche + 62995
            depreciation(Porsche, 0.1155)
            mutateStr(Porsche)
            } 
          //Fast depreciating Luxury segment
          } else if (this.Luxury_Cars_Euro_Am.includes(carName)) {
            depreciation(Luxury, 0.1155)
            if (this.Special_trims.includes(carModel)) {
            Luxury = Luxury + 20000
            }
            handleTrimPremiums()
            mutateStr(Luxury)
          //Fast depreciating economy segment
          } else if (this.Eco_Dep_Fast.includes(carName)) {
            depreciation(ecoFast, 0.1155)
            handleTrimPremiums()
            mutateStr(ecoFast)
          //Slow depreciating Luxury segment
          } else if (this.Luxury_JDM.includes(carName)) {
            depreciation(Luxury, 0.065)
            upCharges()
            mutateStr(Luxury)
          //Slow depreciating economy segment
          } else if (carName.includes('Rolls-Royce')) {
            depreciation(Ultra_Luxury, 0.1155)
            mutateStr(Ultra_Luxury)
          } else if (carName.includes('Bugatti')) {
            cost.innerHTML = '$2,000,000'
          } else {
            depreciation(averageValue, 0.065)
            mutateStr(averageValue)
          }
      }
      }


    const buttons = {
            "Years ": ["2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000"],
            "Make ": ['Toyota', 'Ford', 'Chevrolet', 'Honda', 'Nissan', 'Jeep', 'Kia', 'Ram', 'Subaru', 'GMC', 
            'Volkswagen', 'BMW', 'Genesis', 'Mazda', 'Mercedes-Benz', 'Lexus', 'Dodge', 'Audi', 'Acura', 'Cadillac',
            'Porsche', 'Jaguar', 'Ferrari', 'Lamborghini', 'Aston Martin', 'Rolls-Royce', 'Bugatti'].sort(),
            'Body Style ': ['Sedan', 'Coupe', 'Pickup', 'SUV', 'Crossover', 'Minivan'].sort(),
            "Engine ": ['in-line 4', 'V6', 'V8', 'V10', 'V12'],
            "Transmission ": ['Automatic', 'Manual', "CVT"],
            "Horsepower ": ['100 - 150', '150 - 200', '200 - 250', '250 - 300', 
            '300 - 350', '350 - 400', '400 - 500', '500 - 600', '600 - 700', '700 - 1500'],
            "Drive ": ['Front', 'Rear', 'AWD', '4WD'],
            handleFilterRender: function (e) {
              if (e.target.tagName !== 'UL') {
                if (ul.current.style.display === 'none') {
                    ul.current.style.display = 'block';
                }
                lastClicked = e.target.childNodes[0].data;
             
                ul.current.innerHTML = '';
                for (let i = 0; i < this[lastClicked].length; i++) {
                    let li = document.createElement('li');
                    li.innerHTML = `<input type="checkbox"/>${this[lastClicked][i]}`;
                    ul.current.appendChild(li)
                    e.target.parentNode.appendChild(ul.current)
                    if (filters.includes(this[lastClicked][i])) {
                        li.firstElementChild.checked = true
                    }
                }
              }
            },
         handleFilterClicks: function (e) {
            const item = e.target.parentNode.textContent
            const feedback = (array) => {
            const count = e.target.parentNode.parentNode.previousElementSibling.childNodes[2];
            count.innerHTML = `${array.length}`;
            count.innerHTML === '0' ? count.style.display = 'none' : count.style.display = 'inline'
            }
            const add = (array) => {
              !array.includes(item) ? array.push(item) : null;
              feedback(array)
            }
            const remove = (array) => {
              array.splice(array.indexOf(item), 1)
              feedback(array)
            }
            if (e.target.type === 'checkbox' && e.target.checked === true) {
              filters.push(item)
                if (lastClicked === 'Make ') {
                add(makes)
                } else if (lastClicked === 'Years ') {
                add(years)
                } else if (lastClicked === 'Body Style ') {
                add(types)
                } else if (lastClicked === 'Drive ') {
                add(drive)
                } else if (lastClicked === 'Engine ') {
                add(engines)
                } else if (lastClicked === 'Horsepower ') {
                add(HP)
                } else if (lastClicked === 'Transmission ') {
                add(transmissions)
                }
            } else if (e.target.type === 'checkbox' && e.target.checked === false) {
                filters.splice(filters.indexOf(item, 1))
                if (lastClicked === 'Years ') {
                  remove(years)
                }
                if (lastClicked === 'Make ') {
                  remove(makes)
                }
                if (lastClicked === 'Body Style ') {
                  remove(types)
                }
                if (lastClicked === 'Drive ') {
                remove(drive)
                }
                if (lastClicked === 'Transmission ') {
                remove(transmissions)
                }
                if (lastClicked === 'Engine ') {
                remove(engines)
                }
                if (lastClicked === 'Horsepower ') {
                remove(HP)
                }

            }
         },
         resetCounters: function (e) {
          for (let i = 0; i < $('.filter-btn').length; i++) {
            $('.filter-btn')[i].childNodes[2].style.display = 'none'
          }
         },
         handleSearch: function (e) {

            lottie.current.style.display = 'block';
            sorry.current.style.display = "none";
        
            let biggest_Arr = null
            let middle_Arr = null
            let smallest_Arr = null
            let biggest_Number = Math.max(years.length - 1, makes.length - 1, types.length - 1)
            let smallest_Number = Math.min(years.length - 1, makes.length - 1, types.length - 1)
            let middle_Number = (years.length - 1) + (makes.length - 1) + (types.length - 1) - smallest_Number - biggest_Number;

            let equalNumbers = 0
            biggest_Number === smallest_Number ? equalNumbers++ : null;
            biggest_Number === middle_Number ? equalNumbers++ : null;
            middle_Number === smallest_Number ? equalNumbers++ : null;

            let makeIndex;
            let typeIndex;
            let yearIndex;

            const arrayManager = {
              rankArrays: function (array, num) {
               
                array === years ? yearIndex = num : null;
                array === makes ? makeIndex = num : null;
                array === types ? typeIndex = num : null;
            
              },
              findArrays: (array) => {
                if (equalNumbers === 0) {
                if (array.length - 1 === biggest_Number) {
                biggest_Arr = array
                }
                if (array.length - 1 === smallest_Number) {
                smallest_Arr = array
                }
                if (array.length - 1 === middle_Number) {
                middle_Arr = array
                }
              } else if (equalNumbers >= 1) {
                if (array.length - 1 === smallest_Number) {
                  smallest_Arr = array;
                } else if (array.length - 1 === biggest_Number && biggest_Arr === null) {
                  biggest_Arr = array;
                } else if (biggest_Arr !== null && array.length - 1 === middle_Number ) {
                  middle_Arr = array;
                }
              }
              },
              placeArrays: function (array, rank, num) {
                if (array === rank) {
                  this.rankArrays(array, num)
                }
              }

            }

            if (equalNumbers <= 1) {
            arrayManager.findArrays(years)
            arrayManager.findArrays(makes)
            arrayManager.findArrays(types)
            } else {
              biggest_Arr = years;
              middle_Arr = makes;
              smallest_Arr = types;
            }

            this.resetCounters()

            let carCount = 0
            let doneSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path fill="#31902c" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>`
            let Overall_Score = 0
            const setScore = (array) => {
              array.length > 0 ? Overall_Score++ : null;
            }

            setScore(years)
            setScore(makes)
            setScore(types)
            setScore(drive)
            setScore(transmissions)
            setScore(engines)
            setScore(HP)

            let base_url = `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&year=${years[years.length - 1]}&make=${makes[makes.length - 1]}&body=${types[types.length - 1]}`
            //First, we get all the cars that match the user's criteria with the NHTSA Vehicle API
            for (let i = 0; i < (years.length * makes.length * types.length); i++) {

            $.getJSON(base_url, function(data) {

              i >= (years.length * makes.length * types.length) / 4 ? 
              lottie.current.childNodes[1].innerHTML = `${doneSVG} Done` : null;

              i >= (years.length * makes.length * types.length) / 2 ? 
              lottie.current.childNodes[2].innerHTML = `${doneSVG} Done` : null;

              i === (years.length * makes.length * types.length) - 1 ? 
              lottie.current.childNodes[3].innerHTML = `${doneSVG} Done` : null;

              

            const resLoop = (array, param) => {
              const auto_variants = ['8-speed shiftable automatic', "8-speed shiftable automatic Transmission", "6-speed automatic",
              "6-speed shiftable automatic", "5-speed shiftable automatic" ,"5-speed automatic"
            , "7-speed automated manual", "7-speed automatic", "6-speed automated manual Transmission",
            "6-speed automatic Transmission", "5-speed shiftable automatic Transmission"];
              const manual_variants = ['6-speed manual', "6-speed manual Transmission", "Manual Transmission"]
                for (let i = 0; i < data.Trims.length; i++) {
                    let value = data.Trims[i][param]
                   
                    auto_variants.map((a) => value === a ? value = "Automatic" : null)
                    manual_variants.map((a) => value === a ? value = "Manual" : null)


                    if (array.includes(value)) {
                    !data.Trims[i].hasOwnProperty('score') ? data.Trims[i].score = 3
                     : null;

                     data.Trims[i].score = data.Trims[i].score + 1
                    
                    }
                   
                    }
            }
            if (transmissions.length > 0) {
              
                resLoop(transmissions, "model_transmission_type")
            }
            if (drive.length > 0) {
              
                resLoop(drive, "model_drive")
            }
            if (engines.length > 0) {
                let cyls = []
                console.log(cyls)
                for (let n = 0; n < engines.length; n++) {
                    cyls.push(engines[n].substr(-1))
                }
                resLoop(cyls, "model_engine_cyl")
            }
            if (HP.length > 0) {
             
                let ints = []
                for (let n = 0; n < HP.length; n++) {
                const int1 = parseInt(HP[n].split(' - ')[0]);
                const int2 = parseInt(HP[n].split(' - ')[1]);
                ints.push(parseInt(int1), parseInt(int2))
                }
   
                const max = Math.max(...ints)
                const min = Math.min(...ints)

                for (let i = 0; i < data.Trims.length; i++) {

                  const power = parseInt(data.Trims[i].model_engine_power_ps)
    
                  if (power >= min && power <= max) {
                    
                  !data.Trims[i].hasOwnProperty('score') ? data.Trims[i].score = 3
                   : null;
                   data.Trims[i].score = data.Trims[i].score + 1;
                  
                  }
                  }
            }

            for (let v = 0; v < data.Trims.length; v++) {

                !data.Trims[v].hasOwnProperty('score') ? data.Trims[v].score = 3 : data.Trims[v].score + 3;
          
                if (data.Trims[v].score / Overall_Score >= 0.95) {
                  carCount++
                  data.Trims[v].score = `${data.Trims[v].score / Overall_Score * 100}%`
                $.getJSON(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModel&model=${data.Trims[v].model_id}`, function(res) {
                  data.Trims[v].displacement = res[0].model_engine_l;
                  data.Trims[v].mpg_mixed = res[0].model_mpg_mixed;
                  !results.includes(data.Trims[v]) ? results.push(data.Trims[v]) : null;
                  
                  }).then(() => {
                    if (results.length === carCount) {
                      setVehicleResults(results)
                      setFilterSt(filters)
                    }
                  }).then(() => {
                    if (results.length === carCount) {
                    setTimeout(() => {
                    const h4 = document.getElementsByClassName('cost');
                      const h2 = document.getElementsByClassName('carTitle');
                      for (let i = 0; i < h4.length; i++) {
                      financial.estMarketValue(h4[i], h2[i])
                      }
                      i = 0;
                    }, 500)
             
                    lottie.current.style.display = 'none'
                    lottie.current.childNodes[1].innerHTML = `Fetching car data...`;
                    lottie.current.childNodes[2].innerHTML = `Finding perfect matches...`;
                    lottie.current.childNodes[3].innerHTML = `Getting vehicle specifications...`;
                    
                    }
                  })
                }
            }
            
            }).then(() => {

              if (i === (years.length * makes.length * types.length) - 1) {
              setTimeout(() => {
                if (results.length === 0) {
                  lottie.current.style.display = 'none';
                  sorry.current.style.display = 'block';
                  setFailedSearch(filters)
                }
              }, 500);
            }
            })
             
            if (years.length * makes.length * types.length > 1) {
            if (equalNumbers === 0) {
            //Case in which all numbers are different
            if (smallest_Number === 0) {
              smallest_Number = smallest_Arr.length - 1;
              if (middle_Number !== 0) {
              middle_Number--
              } else {
              middle_Number = middle_Arr.length - 1;
              if (biggest_Number !== 0) {
                biggest_Number--
              } else {
                null;
              }
              }
            } else {
              smallest_Number--
            }
          } else if (equalNumbers >= 1) {
          //Case in which 2 numbers or more are the same 
            if (biggest_Number === 0 && middle_Number === 0 && smallest_Number === 0) {
              null
            } else {
              if (biggest_Number === 0) {
               
                biggest_Number = biggest_Arr.length - 1;
                middle_Number--
                if (middle_Number === 0 && biggest_Number === 0 && smallest_Number !== 0) {
                  middle_Number = middle_Arr.length - 1;
                  smallest_Number--
                }
              } else {
                biggest_Number--
              }
             
            }
          }

        arrayManager.placeArrays(years, smallest_Arr, smallest_Number)
        arrayManager.placeArrays(years, middle_Arr, middle_Number)
        arrayManager.placeArrays(years, biggest_Arr, biggest_Number)

        arrayManager.placeArrays(makes, smallest_Arr, smallest_Number)
        arrayManager.placeArrays(makes, middle_Arr, middle_Number)
        arrayManager.placeArrays(makes, biggest_Arr, biggest_Number)

        arrayManager.placeArrays(types, smallest_Arr, smallest_Number)
        arrayManager.placeArrays(types, middle_Arr, middle_Number)
        arrayManager.placeArrays(types, biggest_Arr, biggest_Number)
      
        base_url = `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&year=${years[yearIndex]}&make=${makes[makeIndex]}&body=${types[typeIndex]}`
       
          }
          
        }
        
    },
    }

    function handleClickableAds(e) {
      
      const parent = e.target.parentNode;
      const h4 = parent.nextElementSibling.childNodes[1].childNodes[1];
      const p = parent.nextElementSibling.childNodes[1].childNodes[3];
      const p2 = parent.nextElementSibling.childNodes[1].childNodes[4];
      const img = parent.nextElementSibling.childNodes[0];

      for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i].classList.contains('active-find')) {
          parent.children[i].classList.remove('active-find')
        }
      }

      e.target.classList.add('active-find');
   
      switch (e.target.textContent) {
        case 'Toyota':
         h4.innerHTML = '2013 Toyota 4Runner'
         p.innerHTML = `"...it's one of the most dependable cars of the 2010's."`
         p2.innerHTML = `-TinCar`
         img.src = `/4runner-ad.jpg`
          break;
        case 'Audi':
          h4.innerHTML = '2013 Audi A4'
          p.innerHTML = `"...it's one of the best values you can find. The perfect mix of sportiness and comfort"`
          p2.innerHTML = `-TinCar`
          img.src = `/audiA4.jpg`
          break;
        case 'Best Sedans':
          h4.innerHTML = 'Top Ranked Sedans'
          p.innerHTML = 'Toyota Avalon'
          p2.innerHTML = ``
          img.src = `/avalon.jpg`
          break;
        case 'Best Trucks':
          h4.innerHTML = 'Top Ranked Trucks'
          p.innerHTML = 'Ford F-150'
          p2.innerHTML = ``
          img.src = `/f150.jpg`
          break;

      }
    }

    const brands = useRef();
    const scroller = useRef();

    useEffect(() => {

        setLoaded(true)
        // If a user hasn't opted in for recuded motion, then we add the animation
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          addAnimation();
          }
        
          function addAnimation() {
          // add data-animated="true" to every `.scroller` on the page
          brands.current.setAttribute("data-animated", true);
          const scrollerContent = Array.from(scroller.current.children)

          if (scroller.current.children.length !== 54) {
          // For each item in the array, clone it
          // add aria-hidden to it
          // add it into the `.scroller-inner`
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scroller.current.appendChild(duplicatedItem);
            });
        
          } else {
            return
          }
          }
    }, [])

    //CarQuery object.
    var carquery = new CarQuery();
    //Run the carquery init function to get things started:
    carquery.init();
    //setFilters method to show only US models. 
    carquery.setFilters( {sold_in_us:true} );
    //Initialize the year, make, model, and trim drop downs by providing their element IDs
    carquery.initYearMakeModelTrim('car-years', 'car-makes', 'car-models', 'car-model-trims');

    //Optional: set minimum and/or maximum year options.
    carquery.year_select_min=2000;
    carquery.year_select_max=2013;

    //Optional: initialize search interface elements.
    //The IDs provided below are the IDs of the text and select inputs that will be used to set the search criteria.
    //All values are optional, and will be set to the default values provided below if not specified.
    var searchArgs =
    ({
        body_id:                       "cq-body"
       ,default_search_text:           "Keyword Search"
       ,doors_id:                      "cq-doors"
       ,drive_id:                      "cq-drive"
       ,engine_position_id:            "cq-engine-position"
       ,engine_type_id:                "cq-engine-type"
       ,fuel_type_id:                  "cq-fuel-type"
       ,min_cylinders_id:              "cq-min-cylinders"
       ,min_mpg_hwy_id:                "cq-min-mpg-hwy"
       ,min_power_id:                  "cq-min-power"
       ,min_top_speed_id:              "cq-min-top-speed"
       ,min_torque_id:                 "cq-min-torque"
       ,min_weight_id:                 "cq-min-weight"
       ,min_year_id:                   "cq-min-year"
       ,max_cylinders_id:              "cq-max-cylinders"
       ,max_mpg_hwy_id:                "cq-max-mpg-hwy"
       ,max_power_id:                  "cq-max-power"
       ,max_top_speed_id:              "cq-max-top-speed"
       ,max_weight_id:                 "cq-max-weight"
       ,max_year_id:                   "cq-max-year"
       ,search_controls_id:            "cq-search-controls"
       ,search_input_id:               "cq-search-input"
       ,search_results_id:             "cq-search-results"
       ,search_result_id:              "cq-search-result"
       ,seats_id:                      "cq-seats"
       ,sold_in_us_id:                 "cq-sold-in-us"
    }); 
    carquery.initSearchInterface(searchArgs);
    $('#cq-search-btn').click( function(){ carquery.search(); } );

    const DOMEvents = {
        scrollTop: function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        },
    }

const saving = {
    sideBar: useRef(),
    saved: [],
    saveBtn: function(e) {
    if (e.target.textContent === 'Save') {
      e.target.textContent = 'Saved!'
      e.target.style.backgroundColor = '#FF2547'
      const parent = e.target.closest(".parent-div")
      const li = document.createElement('li')
      const car = parent.childNodes[0].childNodes[0].childNodes[0].textContent
      const engine = parent.childNodes[1].textContent;
      const price = parent.childNodes[0].childNodes[1].childNodes[0].textContent
      const body = parent.childNodes[2].childNodes[0].textContent
      const trans = parent.childNodes[2].childNodes[1].textContent
      const drive = parent.childNodes[2].childNodes[2].textContent
      const payment = parent.childNodes[4].childNodes[1].childNodes[1].childNodes[1].textContent
      const months = parent.childNodes[4].childNodes[1].childNodes[0].childNodes[1].childNodes[1].value
      li.innerHTML = `<div class='container-top'><h4>${car}</h4><h5>${price}</h5></div><p>${engine}</p>
      <div class='vehicle-details'><p>${drive}</p><p>${body}</p><p>${trans}</p></div><p>${payment} for ${months} months</p><button class='remove-btn btn btn-danger'>Remove</button>`
      li.classList.add('saved-car')
      document.getElementById('cars-list').appendChild(li)
      if (payment === '') {
        li.lastElementChild.previousElementSibling.style.display = 'none';
      }

      this.saveToDataBase(car, drive, engine, trans, body, price)

     } else {
      e.target.textContent = 'Save'
     }
    },
    savedSuggestion: function(e) {
      const model = e.target.closest('.model').firstElementChild.textContent
      if (e.target.textContent === 'Save') {
      e.target.textContent = 'Saved!'
      e.target.style.backgroundColor = '#FF2547'
      const li = document.createElement('li')
      const createText = (car, price, engine, drive, body, trans) => {
        li.innerHTML = `<div class='container-top'><h4>${car}</h4><h5>${price}</h5></div><p>${engine}</p>
      <div class='vehicle-details'><p>${drive}</p><p>${body}</p><p>${trans}</p></div><p></p><button class='remove-btn btn btn-danger'>Remove</button>`;
      li.classList.add('saved-car')
      document.getElementById('cars-list').appendChild(li)
      }
      switch(model) {
        case '2013 Porsche 911 Carrera 4S':
          createText('2013 Porsche 911 Carrera 4S', '$54,000', '3.6L I6', 'RWD', 'Coupe', 'PDK');
          break;
        case '2013 BMW 4-Series Coupe':
          createText('2013 BMW 4-Series Coupe', '$12,747', 'Twin Turbo I6', 'RWD', 'Coupe', 'Automatic');
          break;
        case '2013 Toyota 4Runner':
          createText('2013 Toyota 4Runner', '$16,431', '4.0L V6', '4WD', 'SUV', 'Automatic');
          break;
      }
      } else {
        e.target.textContent = 'Save'
      }
    },
    saveToDataBase: async function(car_name, drive, engine, trans, body, price) {
      fetch(`http://localhost:3000/auth/updateCars/${localStorage.getItem('userID')}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "car": {
            car_name: car_name,
            drive: drive,
            engine: engine,
            transmission: trans,
            body: body,
            price: price
          }
        })
      }).then(res => {
       
     return res.json()
      }).then(value => {
       
      }).catch((e) => {
        console.error(e.error)
      })
    },
}

const carModelData = useRef()
$('#cq-show-data').click(function(){ 
  carquery.populateCarData('car-model-data');
  carModelData.current.style.display = 'flex'
} );

function hideSavedCars(e) {
  const sideBar = document.getElementById('saved-cars-container');
  if (e.target !== sideBar && !e.target.closest('#saved-cars-container') &&
   e.target.classList.contains('nav-link') == false &&
  (sideBar.style.right !== '-20vw' || sideBar.style.right !== '-80vw') && e.target.textContent !== 'Remove' 
  && e.target.textContent !== 'Saved!') {
    if (window.innerWidth <= 440) {
      sideBar.style.right = '-80vw';
    } else {
  sideBar.style.right = '-20vw';
    }
  } else {
    return
  }
}

useEffect(() => {
  document.body.addEventListener('click', (e) => {
    hideSavedCars(e)
  })
}, [])

function handleTrendingSearches(e) {
const text = e.target.textContent.split(' ')
for (let i = 0; i < text.length; i++) {
filters.push(text[i]) 
}
filters.push('2013')
const matchArrays = (populatedArr, arr) => {
populatedArr.map(item => filters.includes(item) ? arr.push(item) : null)
}
matchArrays(buttons['Years '], years)
matchArrays(buttons['Body Style '], types)
matchArrays(buttons['Make '], makes)
matchArrays(buttons['Engine '], engines)
matchArrays(buttons['Drive '], drive)
matchArrays(buttons['Transmission '], transmissions)
matchArrays(buttons['Horsepower '], HP)


DOMEvents.scrollTop();
buttons.handleSearch();
}

  return (
    <>
    <section id="title" style={{ backgroundColor: 'whitesmoke' }}>
          <div className="container-fluid" style={{ backgroundColor: 'whitesmoke' }}>
            <nav className="navbar navbar-expand-lg navbar-dark">
              <a className="navbar-brand">
                {' '}
                <h4 style={{ fontSize: '2rem' , color: '#ff4c68'}}>
                  <b>tincar <FontAwesomeIcon icon={faFireFlameCurved} /></b>
                </h4>
              </a>
              <ul className="bar1 navbar-nav ml-auto nav-style">
                <li className="nav-item">
                  <a className="nav-link" href="" style={{textDecoration: 'none'}}>
                  <Link style={{color: '#ff4c68'}} to={'/'}>Home</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{color: '#ff4c68'}}>
                  <SavedCars/>
                  </a>
                </li>
               
              </ul>
              {/* navbar content  */}
            </nav>
          </div>
    </section>
    <div ref={saving.sideBar}></div>
    <section onClick={(e) => e.target.classList.contains("container-fluid") ? ul.current.style.display = 'none' : null} className="container-fluid finder-section" style={{backgroundImage: 'url("/carwallpaper.jpg")', backgroundPosition: "center"}}>
    <div id='finder-section-content'>
        <h1 style={{color: 'white'}} className="display-6">
            Dream Car Finder
        </h1>
    <ul className='btn-list'
    onClick={(e) => buttons.handleFilterRender(e)} 
    style={{display: 'flex', flexWrap: 'wrap', listStyleType: "none"}}>
    <li>
    <p>*required</p><button className="btn btn-light filter-btn">Years <FontAwesomeIcon icon={faChevronDown} /><p>0</p></button>
    </li>
    <li><p>*required</p><button className="btn btn-light filter-btn">Make <FontAwesomeIcon icon={faChevronDown} /><p>0</p></button></li>
    <li><p>*required</p><button className="btn btn-light filter-btn">Body Style <FontAwesomeIcon icon={faChevronDown} /><p>0</p></button></li>
    <li><button className="btn btn-light filter-btn">Engine <FontAwesomeIcon icon={faChevronDown} /><p>0</p></button></li>
    <li><button className="btn btn-light filter-btn">Transmission <FontAwesomeIcon icon={faChevronDown} /><p>0</p></button></li>
    <li><button className="btn btn-light filter-btn">Horsepower <FontAwesomeIcon icon={faChevronDown} /><p>0</p></button></li>
    <li><button className="btn btn-light filter-btn">Drive <FontAwesomeIcon icon={faChevronDown} /><p>0</p></button></li>
    </ul>
    <ul className='freeform-ul'
     onClick={(e) => buttons.handleFilterClicks(e)} ref={ul}></ul>
    <button className='search-btn'  onClick={() => buttons.handleSearch()}>Search</button>
    </div>
    </section>
    <section>
    <div id="lottie" ref={lottie}>
        <Lottie animationData={animationData}/>
        <p>Fetching car data...</p>
        <p>Finding perfect matches...</p>
        <p>Getting vehicle specifications...</p>
    </div>

        <div ref={sorry} className='sorry'><h1>Sorry, couldn't find your perfect car with your selections. Try again!</h1>
        <div>{failedSearch.map((filter) =><p className='failed-filters' key={filter}>{filter}</p>)}</div>
        </div>
        {vehicleResults.length > 0 ? <h1 className='results-text'>{vehicleResults.length} Results</h1> : null}
        {vehicleResults.length > 0 ? <div className='filters-list'>{filterSt.map((filter) => <p className='filters' key={filter}>{filter}</p>)}</div> : null}
        <div id='filtered-car-data' ref={searchRes}>
            {vehicleResults.map((car, index) => <div key={car.model_name + car.model_trim + index} className='parent-div'><div className='container-top'><h2 className='carTitle'>{`${car.model_year} ${car.model_make_display} ${car.model_name} ${car.model_trim
            } `}</h2>
            <div id='marketVal'>
            <h4 className='cost'><Lottie className='small-lottie' animationData={animationData}/></h4>
            <p className='estVal'>Estimated Value</p>
            </div>
            </div>
            <div className='engine-stats'>{`${car.model_engine_power_ps !== null ? `${car.model_engine_power_ps} HP` : ''} ${car.displacement}L ${car.model_engine_type === 'in-line' ? 'I' : car.model_engine_type}${car.model_engine_cyl}`}</div>
            <div className='vehicle-details'>
            <p>{car.model_body}</p>
            <p>{car.model_transmission_type} Transmission</p>
            {car.model_drive === 'Front' ? <p>FWD</p> : null}
            {car.model_drive === 'Rear' ? <p>RWD</p> : null}
            {car.model_drive === 'AWD' || car.model_drive === '4WD' ? <p>{car.model_drive}</p> : null}
            {car.model_0_to_100_kph !== null ? <p>0 - 60 in {car.model_0_to_100_kph}s</p> : null}
            {car.mpg_mixed !== null ? <div className='mpg'><h4>{car.mpg_mixed}</h4><a>MPG</a></div> : null}
            </div>
            <hr />
            <div className='market-value'>
                <p className='finance-calc-text'>Finance Calculator</p>
    
                <div className='outerCon'>
                <div className='innerCon'>
                <div className='flex'>
                <p>Interest Rate</p>
                <input type="number" placeholder='%' min='3' max="21.38"/>
                </div>
                <div className='flex'>
                <p>Term</p>
                <select>
                <option value="24">24 Months</option>
                <option value="36">36 Months</option>
                <option value="48">48 Months</option>
                <option value="60">60 Months</option>
                <option value="72">72 Months</option>
                </select></div>
                <div className='flex'>
                <p>Down Payment</p>
                <input type='number' placeholder='$'/>
                </div>
                </div>
                <div className='btn-result'>
                <button className='getPayment-btn btn btn-success' onClick={(e) => financial.getMonthlyPayment(e)}>Get Monthly Payment</button>
                <h5 className='monthlyPayment'></h5>
                <button className='save-car btn btn-success' onClick={(e) => saving.saveBtn(e)}>Save</button>
                </div>
                </div>
            </div>
            </div>)}
        </div>
    </section>
    <section className='results-and-ads'>
    <div className='ads'>
    <div className='finance-tool-info'>
        <div className='avaliable'><p>Now Avaliable</p></div>
        <h4>Get all the numbers you need</h4>
        <p style={{color: 'gray'}}>Once you find your next dream car, try our financing tool!</p>
        <button type="button" onClick={() => DOMEvents.scrollTop()} style={{color: 'white'}} className="btn btn-dark">Try now</button>
    </div>
    <div className='user-rating-div'>
    <div className='user-info-text'>
    <h4>Car buyers love our quick and effective system</h4>
    <p><em>You will too!</em></p>
    <button type="button" onClick={() => DOMEvents.scrollTop()} style={{color: 'black'}} className="btn btn-light browsing-btn">Start Browsing</button>
    </div>
    <div className='user-rating-info'>
    <div className='user-rating-info-text'>
        <h1>4.8</h1>
        <div><FontAwesomeIcon icon={faStar} style={{color: "#ffbb00",}} />
        <FontAwesomeIcon icon={faStar} style={{color: "#ffbb00",}} />
        <FontAwesomeIcon icon={faStar} style={{color: "#ffbb00",}} />
        <FontAwesomeIcon icon={faStar} style={{color: "#ffbb00",}} />
        <FontAwesomeIcon icon={faStar} style={{color: "#ffbb00",}} /></div>
    
    <h6>Overall User Rating</h6>
    <p>Across 500,000+ users</p>
    </div>
    </div>
    </div>
    </div>

    </section>

    <section className='brands-section'>
    <h1 className='supp-brands'>Supported Brands</h1>
    <div ref={brands} className='brands' data-direction="left" data-speed="slow">
    <div ref={scroller} className='scroller'>
      <img src="/Acura.png" alt="" />
      <img src="/Toyota-logo.png" alt="" />
      <img src="/honda-logo.png" alt="" />
      <img src="/mazda-logo.png" alt="" />
      <img src="/Subaru-logo.png" alt="" />
      <img src="/lexus-logo.png" alt="" />
      <img src="/Ford-logo.png" alt="" />
      <img src="/GMC_logo.png" alt="" />
      <img src="/genesis-logo.png" alt="" />
      <img src="/jaguar-logo.png" alt="" />
      <img src="/jeep-logo.png" alt="" />
      <img src="/kia-logo.png" alt="" />
      <img src="/lambo-logo.png" alt="" />
      <img src="/mercedes-logo.png" alt="" />
      <img src="/nissan-logo.png" alt="" />
      <img src="/ram-logo.png" alt="" />
      <img src="/rolls-royce-logo.png" alt="" />
      <img src="/aston-logo.png" alt="" />
      <img src="/audi-logo.png" alt="" />
      <img src="/bugatti-logo.png" alt="" />
      <img src="/porsche-logo.png" alt="" />
      <img src="/dodge-logo.png" alt="" />
      <img src="/BMW-logo.png" alt="" />
      <img src="/chevy-logo.png" alt="" />
      <img src="/ferrari_logo.png" alt="" />
      <img src="/cadillac-logo.png" alt="" />
      <img src="/vw-logo.png" alt="" />
    </div>
    </div>
    </section>

    <section className='buy-with-confidence'>
    <h1 className='buy-text'>We'll Help You Buy With Confidence</h1>

    <div>
    <span>
    <img src="/used-car.jpeg" alt="" />
    <b>TinCar</b>
    <h4>Which Used Cars are the Best Value?</h4>
    <p>With TinCar you can compare models acorss multiple makes and in the same segment enabling you to find great details and see which cars are furthur along in their depreciation curve. Used car shoppers often need low prices and we're here to deliver. How about those shiny used exotics and sports cars? You'll find great information on those too!</p>
    </span>

    <span>
    <img src="/reliable.jpg" alt="" />
    <b>TinCar</b>
    <h4>Which Cars are the most reliable?</h4>
    <p>Find reliable used cars that dont even need a warranty. Cars that will go 500,000 miles before even needing an oil change. Cars so reliable that you can find someone in your neighborhood with that same car and a million miles on the odometer. **hint** just buy a toyota, any toyota.</p>
    </span>

    <span>
    <img src="/car-news.JPG" alt="" />
    <b style={{color: "#ff4c68"}}>SPONSORED CONTENT</b>
    <h4>Kia Car News</h4>
    <p>Find reliable used cars that dont even need a warranty. Cars that will go 500,000 miles before even needing an oil change. Cars so reliable that you can find someone in your neighborhood with that same car and a million miles on the odometer. **hint** just buy a toyota, any toyota.</p>
    </span>
    </div>
    <hr className='hr-before-models'/>
    </section>

    <section className='clickable-picks'>
    <div className='content'>
      <div onClick={(e) => handleClickableAds(e)} className='clickable-ads'>
        <h4 className='active-find'>Toyota</h4>
        <h4>Audi</h4>
        <h4>Best Sedans</h4>
        <h4>Best Trucks</h4>
      </div>
      <div className='ad-container'>
        <img src="/4runner-ad.jpg" alt="" />
        <div className='ad-info'>
          <h6>Ad</h6>
          <h4>2013 Toyota 4Runner</h4>
          <hr />
          <p>
            "...it's one of the most dependable cars of the 2010's."
          </p>
          <p>
            -TinCar
          </p>
          <button>Learn More</button>
        </div>
      </div>
    </div>
    </section>
    
    <section className='models-you-may-like'>
    <hr style={{width: '50vw'}} />
    <h1 className='models-text'>Models You May Like</h1>
   <div class='models-container'>
    <div class='model'>
    <h4>2013 Porsche 911 Carrera 4S</h4>
    <a className='line'></a>
    <img src="/porche-car.jpg" alt="" />
    <span>
    <p>400 HP from a 3.6L I6</p>
    <p>Market Value: $54,000</p>
    <button onClick={(e) => saving.savedSuggestion(e)}>Save</button>
    </span>
    </div>

    <div class='model'>
      <h4>2013 BMW 4-Series Coupe</h4>
      <a className='line'></a>
      <img src="/bmw-car.jpg" alt="" />
    <span>
    <p>320 HP from a Twin Scrolled Turbo I6</p>
    <p>Market Value: $12,747</p>
    <button onClick={(e) => saving.savedSuggestion(e)}>Save</button>
    </span>
    </div>

    <div class='model'>
    <h4>2013 Toyota 4Runner</h4>
    <a className='line'></a>
    <img src="/4runner-car.jpg" alt="" />
    <span>
    <p>270 HP from a 4.0L V6</p>
    <p>Market Value: $16,431</p>
    <button onClick={(e) => saving.savedSuggestion(e)}>Save</button>
    </span>
    </div>
    </div>
    <a className='big-line-1'></a>
    <a className='big-line-2'></a>
    </section>
    <section className='news-widget'>
      <h1>Latest Car News From Our Experts</h1>
      <div className='news-widget-grid'>
        <div className='news-widget-card'>
          <img src="/used-car-prices.jpg" alt="" />
          <h3 style={{fontSize: '1.4rem'}}>2023 Q4: Used Car Market Becoming Normal Again?</h3>
        </div>
        <div className='news-widget-card'>
        <img src="/money-saved.jpg" alt="" />
          <h3>New Study Shows How Much Used Car Buyers Save</h3>
        </div>
        <div className='news-widget-card'>
        <img src="/usedbmw-mercedes.jpg" alt="" />
          <h3>Which Is More Reliable? Used BMWs or Used Mercedes?</h3>
        </div>
        <div className='news-widget-card'>
        <img src="/boxter.jpg" alt="" />
          <h3>Car Care Secrets: How this 40 year old from Kentucky Daily Drives a Porsche Boxer</h3>
        </div>
      </div>
    </section>
    <section className='trending'> 
    <h1>Trending Searches</h1>
    <div onClick={(e) => handleTrendingSearches(e)}>
    <h4><img src="./toyota-logo.png" alt="" />Toyota SUV V6</h4>
    <h4><img src="./BMW-logo.png" alt="" />BMW Coupe I6</h4>
    <h4><img src="./Ford-logo.png" alt="" />Ford Pickup 4WD</h4>
    <h4><img src="./Subaru-logo.png" alt="" />Subaru Sedan SUV</h4>
    <h4><img src="/mazda-logo.png" alt="" />Mazda SUV AWD</h4>
    <h4><img src="/Acura.png" alt="" />Acura Sedan</h4>
    <h4><img src="/honda-logo.png" alt="" />Honda Sedan</h4>
    <h4><img src="/porsche-logo.png" alt="" />Porsche Coupe</h4>
    </div>
    </section>
    <section className="container jumbotron"> 
    <div><h1 style={{color: 'black'}} className="text-center">Get Vehicle Specs</h1></div>
    <div className="row text-center spec-categories">
      <div className="col-sm-3 category">Year</div>
      <div className="col-sm-3 category">Make</div>
      <div className="col-sm-3 category">Model</div>
      <div className="col-sm-3 category">Trim</div>
      </div>
      <div className="row spec-inputs">
        <div className="col-sm-3">
          <select name="car-years" id="car-years" className="form-control"></select> 
        </div>
        <div className="col-sm-3">
          <select name="car-makes" id="car-makes" className="form-control"></select> 
        </div>
        <div className="col-sm-3">
          <select name="car-models" id="car-models" className="form-control"></select>    
        </div>
        <div className="col-sm-3">
          <select name="car-model-trims" id="car-model-trims" className="form-control"></select> 
        </div>
      </div>
    <br/>
    <div className='bottom-specs-section'>
    <input style={{color: 'white', fontWeight: '500', fontFamily: "Montserrat"}} className="btn btn-primary" id="cq-show-data" type="button" value="Show Data" 
    />
      <div ref={carModelData} id="car-model-data"></div>
    </div>
  </section>
  <footer id="footer">
    <div className='footer-top'>
    <div className='join'>
      <h3>Join TinCar</h3>
      <p>Receive pricing, industry leading tools & more!</p>
    <div className='sm-links'>
      <p>Contact Us</p>
      <p>Careers</p>
      <p>Your Ad Choices</p>
      <p>Privacy Statement</p>
      <p>Visitor Agreement</p>
      <p>Accessibility</p>
      <p>Do Not Sell or Share My Personal Information</p>
      <p>TinCar Information</p>
      
    </div>
    </div>
    <div className='footer-ads'>
    <div className='footer-business-logos'>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M640 317.9C640 409.2 600.6 466.4 529.7 466.4C467.1 466.4 433.9 431.8 372.8 329.8L341.4 277.2C333.1 264.7 326.9 253 320.2 242.2C300.1 276 273.1 325.2 273.1 325.2C206.1 441.8 168.5 466.4 116.2 466.4C43.42 466.4 0 409.1 0 320.5C0 177.5 79.78 42.4 183.9 42.4C234.1 42.4 277.7 67.08 328.7 131.9C365.8 81.8 406.8 42.4 459.3 42.4C558.4 42.4 640 168.1 640 317.9H640zM287.4 192.2C244.5 130.1 216.5 111.7 183 111.7C121.1 111.7 69.22 217.8 69.22 321.7C69.22 370.2 87.7 397.4 118.8 397.4C149 397.4 167.8 378.4 222 293.6C222 293.6 246.7 254.5 287.4 192.2V192.2zM531.2 397.4C563.4 397.4 578.1 369.9 578.1 322.5C578.1 198.3 523.8 97.08 454.9 97.08C421.7 97.08 393.8 123 360 175.1C369.4 188.9 379.1 204.1 389.3 220.5L426.8 282.9C485.5 377 500.3 397.4 531.2 397.4L531.2 397.4z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="15.5" viewBox="0 0 496 512"><path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3 .8-3.4 5-20.3 6.9-28.1 .6-2.5 .3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
    </div>
    <p>Download the TinCar App</p>
      <div className='download-on'>
      <img src="/app-store.png" alt="" />
      <img src="/google-play.png" alt="" />
      </div>
    </div>
    </div>
    <p className='privacy-notice'>© TinCar.com, Inc., a wholly owned subsidiary of NoCompany, Inc. By using TinCar.com, you consent to the monitoring and storing of your interactions with the website, including by a TinCar vendor, for use in improving and personalizing our services. See our Privacy Statement for details.</p>
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
  )
}

export default Finder