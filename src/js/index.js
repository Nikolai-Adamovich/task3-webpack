'use strict';
import '../scss/style.scss';

import '@babel/polyfill';
import 'whatwg-fetch';
import getNews from './get-news.js';
import drawNewsList from './draw-news-list.js';
import drawError from './draw-error.js';
import {setMainParameters, setPaginationParameters} from './set-parameters';
import Pagination from './pagination.js';
import {mainParameters, paginationParameters} from './url-parameters';

const fetchNews = async () => {
  const paginationRoot = document.querySelector('.pagination');
  try {
    const data = await getNews();
  
    if (data.status === 'ok') {
      if (data.totalResults > 0) {
        drawNewsList(data.articles);
        window.scrollTo(0, 0);

        const pageSize = paginationParameters.get('pageSize');
        
        if (data.totalResults > pageSize) {
          new Pagination(paginationRoot, data.totalResults, pageSize, paginationParameters.get('page') || 1);
        } else {
          paginationRoot.classList.toggle('pagination--visible', false);
        }
      } else {
        drawError(`Sorry. We can't find anything. Try to change your search options.`);
        paginationRoot.classList.toggle('pagination--visible', false);
      }
    } else {
      drawError(data.message);
      paginationRoot.classList.toggle('pagination--visible', false);
    }
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener('load', () => {
  fetchNews();
    
  /* Minimize header height when scroll down */
  const html = document.querySelector('html');
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--small', html.scrollTop > 0);
  });
  
  /* Toggle navigation menu */
  const navButton = document.querySelector('.nav__button');
  const navMenu = document.querySelector('.nav__menu');
  
  navButton.addEventListener('click', () => {
    navMenu.classList.toggle('nav__menu--visible');
  });
  
  /* Clear search parameters and send default request */
  const clearBtn = document.querySelector('#clear');
  const searchTextInput = document.querySelector('.nav__search');
  const categoryDefaultInput = document.querySelector('#category-all');
  const countryDefaultInput = document.querySelector('#country-all');
  
  clearBtn.addEventListener('click', () => {
    searchTextInput.value = '';
    categoryDefaultInput.checked = true;
    countryDefaultInput.checked = true;
    navMenu.classList.toggle('nav__menu--visible', false);
    setMainParameters({
      category: '',
      country: '',
      q: ''
    });
    setPaginationParameters({
      pageSize: 20,
      page: 1
    });
    fetchNews();
  });
  
  /* Apply search parameters and send new request */
  const applyBtn = document.querySelector('#apply');
  
  applyBtn.addEventListener('click', () => {
    let categoryCheckedValue = document.querySelector('input[name="category"]:checked').value;
    let countryCheckedValue = document.querySelector('input[name="country"]:checked').value;
    const searchTextInputValue = searchTextInput.value.trim();
    
    if (searchTextInputValue) {
      /* Search text can't be sent with other parameters using 'everything' endpoint */
      categoryDefaultInput.checked = true;
      countryDefaultInput.checked = true;
      categoryCheckedValue = '';
      countryCheckedValue = '';
    }
    
    setMainParameters({
      category: categoryCheckedValue,
      country: countryCheckedValue,
      q: searchTextInputValue
    });
    navMenu.classList.toggle('nav__menu--visible', false);
    fetchNews();
  });
  
  /* Pagination click */
  const paginationRoot = document.querySelector('.pagination');
  
  paginationRoot.addEventListener('click', (e) => {
    const target = e.target;
    
    if (target.tagName === 'LI') {
      let value = parseInt(target.innerText);
      
      if (target.innerText === '\u00ab') {
        value = paginationParameters.get('page') - 1;
      } else if (target.innerText === '\u00bb') {
        value = paginationParameters.get('page') + 1;
      }
      
      if (value && value !== paginationParameters.get('page')) {
        setPaginationParameters({
          pageSize: 20,
          page: value
        });
        fetchNews();
      }
    }
  });
});