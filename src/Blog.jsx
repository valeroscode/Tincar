import React, { useEffect, useState, useRef } from 'react'
import './styles/Blog.css'
import Footer from './Footer'
import Header from './Header'

function Blog () {

  const [posts, setPosts] = useState([])
  const [orderedPosts, setOrderedPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [occObj, setOccObj] = useState({})

  const blogPosts = useRef()
  const searchbar = useRef()
  const noMatches = useRef()

  useEffect(() => {
    fetch(`http://localhost:3000/auth/getPosts`, {
      headers: {'Content-Type': 'application/json'},
      }).then(res => {
      if (res.ok) return res.json()
     return res.json()
      }).then(value => {
       setPosts(value.data)
       value.data.map((prop) => !categories.includes(prop.category) ? categories.push(prop.category) : null)
       setCategories(categories)
       for (let i = 0; i < value.data.length; i++) {
        occObj[value.data[i].category] = 0
       }
       for (let i = 0; i < value.data.length; i++) {
       if (occObj.hasOwnProperty(value.data[i].category)) {
        occObj[value.data[i].category] = occObj[value.data[i].category] + 1
        }
       }
       setOccObj(occObj)
       sortArrayOfObj(value.data)
      }).catch((e) => {
        console.error(e.error)
      })
    
      document.getElementsByClassName('category-name')[0].style.color = 'black'
      document.getElementsByClassName('category-name')[0].style.fontWeight = 600

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      
  }, [])

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    function sortArrayOfObj(arr) {
     if (arr.length <= 1) {
      return arr
     } else {
      const middle = Math.floor(arr.length / 2)
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);
      
      return merge(sortArrayOfObj(left), sortArrayOfObj(right));
     }
    }

    function merge(left, right) {
      const result = [];
      while (left.length && right.length) {
        const leftYear = parseInt(left[0].date.split(' ')[2])
        const rightYear = parseInt(right[0].date.split(' ')[2])
        let leftMonth = months.indexOf(left[0].date.split(' ')[0])
        if (String(leftMonth).length === 1) {
        leftMonth = '0' + leftMonth
        }
        let rightMonth = months.indexOf(right[0].date.split(' ')[0])
        if (String(rightMonth).length === 1) {
          rightMonth = '0' + rightMonth
        }

        const day = left[0].date.split(' ')[1]
        const leftDay = String(day).replace(',')
        const next = right[0].date.split(' ')[1]
        const rightDay = String(next).replace(',')
        console.log(parseInt(`${leftYear}${leftMonth}${leftDay}`))
        console.log(parseInt(`${rightYear}${rightMonth}${rightDay}`))
         if (parseInt(`${leftYear}${leftMonth}${leftDay}`) < parseInt(`${rightYear}${rightMonth}${rightDay}`)) {
            result.push(right.shift());
         } else {
            result.push(left.shift());
         }
      }
      setOrderedPosts([...result, ...left, ...right])
      return [...result, ...left, ...right];
   }
 

  
  function matchTitles(e) {
     const collection = blogPosts.current.childNodes
     const visibleChildren = []
     for (let i = 0; i < collection.length; i++) {
      const title = collection[i].childNodes[2].textContent;
      const titleString = String(title).toLocaleUpperCase()
      if (titleString.includes(String(e.target.value).toLocaleUpperCase())) {
        collection[i].style.display = 'block'
        visibleChildren.push(collection[i])
      } else {
        collection[i].style.display = 'none'
        visibleChildren.splice(visibleChildren.indexOf(collection[i]), 0)
      } 

      if (visibleChildren.length === 0) {
        noMatches.current.textContent = `No blog posts titled '${searchbar.current.value}'`
      } else {
        noMatches.current.textContent = ''
      }
     }
  }

  function filterByCategory(e) {
    const collection = blogPosts.current.childNodes
    for (let i = 0; i < collection.length; i++) {
      const category = collection[i].childNodes[1];
      if (category) {
      const categoryString = String(category.textContent).split('| ')[2]
      if (e.target.textContent === 'All') {
        collection[i].style.display = 'block'
      } else {
      if (categoryString !== e.target.textContent) {
        collection[i].style.display = 'none'
      } else {
        collection[i].style.display = 'block'
      }
      }
     }
     }

     for (let i = 0; i < document.getElementsByClassName('category-name').length; i++) {
      document.getElementsByClassName('category-name')[i].style.color = 'gray'
      document.getElementsByClassName('category-name')[i].style.fontWeight = 300
     }

     e.target.style.color = 'black'
     e.target.style.fontWeight = 600

  }


  return (
    <>
    <Header/>
    <section id="blog-intro">
    <img src="/blog-img.jpg"></img>
    <h2>Blog</h2>
    </section>
    <section id="page-split">
    <div id="blog-posts" ref={blogPosts}>
    {
      posts.map((post) => <div>
        <img src={post.image}></img>
        <p>By {post.author} | {post.date} | {post.category}</p>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <button>Read</button>
      </div>)
    }
    <h2 ref={noMatches} id="no-matches"></h2>
    </div>

    <div id="blog-navigation">
    <div id='categories'>
      <div id="blog-searchbar">
        <input ref={searchbar} placeholder='Search...' onKeyUp={(e) => matchTitles(e)}/>
        <button>Go</button>
      </div>
    <h3>Categories</h3>
    <div className='category-line'></div>
    <div className='category-div'><p className='category-name' onClick={(e) => filterByCategory(e)}>All</p><p className='post-count'>{posts.length} Posts</p></div>
    <div id="mobile-flex">
    {
      categories.map((category) => <div className='category-div'><p className='category-name' onClick={(e) => filterByCategory(e)}>{category}</p><p className='post-count'>{occObj[category]} {occObj[category] > 1 ? 'Posts' : 'Post'}</p></div>)
    }
    </div>
    </div>

    <div id="recent-posts">
      <h2>Recent Posts</h2>
    <div className='category-line'></div>
    {
      orderedPosts.map((post, index) => index < 5 ?<div className='recent-post'>
        <img src={post.image}></img>
        <div>
          <p>{post.date}</p>
          <h4>{post.title}</h4>
        </div>
      </div> : null)
    }
    </div>

    <div id="blog-ad">
    <div>
      <h2>BuyUsd</h2>
      <h3>34%</h3>
      <p>Flat Discount</p>
    </div>
    <img src="whowearecar.png"></img>
    </div>

    </div>

    </section>
    <Footer/>
    </>
  )
}

export default Blog