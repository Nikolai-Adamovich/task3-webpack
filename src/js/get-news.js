import {mainParameters, paginationParameters} from './url-parameters';

const baseUrl = 'https://newsapi.org/v2/';
const apiKey = 'd72c9d0925a44fb8a00c4f2ed855167c';

const createQueryUrl = () => {
  let parameterIndex = 0;
  let queryUrl = baseUrl;

  // Add user search query if it is specified otherwise add
  if (/[а-яё\w\d]{3,}/i.test(mainParameters.get('q'))) {
    queryUrl += 'everything';
  } else {
    queryUrl += 'top-headlines';
  }
  
  for (let parameter of mainParameters) {
    if (parameter[1]) {
      queryUrl += createQuery(parameter, parameterIndex++);
    }
  }

  // Fallback in case if none of the required parameters are specified
  if (parameterIndex === 0) {
    queryUrl += createQuery(['language', 'en'], parameterIndex++);
  }

  // Pagination parameters
  for (let parameter of paginationParameters) {
    if (parameter[1]) {
      queryUrl += createQuery(parameter, parameterIndex++);
    }
  }

  queryUrl += createQuery(['apiKey', apiKey], parameterIndex++);

  return queryUrl;
};

const createQuery = ([field, value], i) => {
  return `${i === 0 ? '?' : '&'}${field}=${encodeURIComponent(value)}`;
};

const getNews = async () => {
  const queryUrl = createQueryUrl();
  const res = await fetch(queryUrl);
  return res.json();
};

export default getNews;