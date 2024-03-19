import React, {useRef, useEffect} from 'react';
import './styles/Careers.css'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const numbers = useRef();

  function changeColor(e) {
    const num = numbers.current.childNodes
    for (let i = 0; i < num.length; i++) {
        num[i].firstElementChild.style.color = 'black'
        num[i].firstElementChild.style.backgroundColor = 'white'
        num[i].firstElementChild.style.padding = '0.5rem'
    }
    e.target.style.color = 'gray'
    e.target.style.backgroundColor = 'whitesmoke'
    e.target.style.borderRadius = '10px'
  }

  return (
    <nav>
      <ul ref={numbers} className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item' onClick={(e) => changeColor(e)}>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;