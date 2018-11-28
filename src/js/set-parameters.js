import {mainParameters, paginationParameters} from './url-parameters';

const setMainParameters = ({
  category,
  country,
  q
}) => {
  mainParameters.set('category', category);
  mainParameters.set('country', country);
  mainParameters.set('q', q);
};

const setPaginationParameters = ({
  pageSize,
  page
}) => {
  paginationParameters.set('pageSize', pageSize);
  paginationParameters.set('page', page);
};

export {
  setMainParameters,
  setPaginationParameters
}