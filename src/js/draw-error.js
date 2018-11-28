const drawError = (message) => {
  const news = document.querySelector('.news');
  news.innerHTML = `<div class="error">${message}</div>`;
};

export default drawError;