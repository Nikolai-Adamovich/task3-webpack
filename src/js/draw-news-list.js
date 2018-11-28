const drawNewsList = (articles) => {
  const news = document.querySelector('.news');
  news.innerHTML = '';
  
  for (const {
      source: {
        name: sourceName
      },
      author,
      title,
      content,
      description = '',
      url,
      urlToImage,
      publishedAt
    } of articles) {
    if (!content && !description) continue;
    /* Fallback in case if content is Null */
    content = content || description;
    news.insertAdjacentHTML('beforeend',
    `<li class="news__item">
      <article class="news__article">
        <h2 class="news__title"><a href="${url}" target="_blank">${title}</a></h2>
        <div class="news__main">
          ${urlToImage ? `<div class="news__image" style="background-image: url(${urlToImage});"></div>` : ''}
          <div class="news__content">${content.replace(/\[\+\d+\s(chars\])/, '')}</div>
        </div>
        <footer class="news__footer">
          <div class="news__author">Author: ${author ? author : sourceName}</div>
          <div class="news__source-name">${sourceName ? `Source: ${sourceName}` : ''}</div>
          <div class="news__published-at">${(new Date(publishedAt)).toLocaleString()}</div>
        </footer>
      </article>
    </li>`
    );
  }
};

export default drawNewsList;