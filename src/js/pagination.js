class Pagination {

  constructor(root, totalResults, pageSize, page) {
    this.root = root;
    this.totalResults = totalResults;
    this.pageSize = pageSize;
    this.page = page;
    this.empty();
    this.render();
  }
  
  empty() {
    this.root.innerHtml = '';
    this.root.textContent = '';
  }
  
  render() {
    const pagesCount = Math.ceil(this.totalResults / this.pageSize);
    
    const appendItem = (itemSign, specialClass) => {
      this.root.insertAdjacentHTML('beforeend', `<li class="pagination__item${specialClass ? ` pagination__item--${specialClass}` : ''}">${itemSign}</li>`);
    }
        
    if (this.page === 1) {
      appendItem('\u00ab', 'disabled');
    } else {
      appendItem('\u00ab');
    }
    if (this.page > 6) {
      appendItem(1);
      appendItem(2);
      appendItem('..', 'disabled');
      appendItem(this.page - 2);
      appendItem(this.page - 1);
    } else {
      for (let i = 1; i < this.page; i++) {
        appendItem(i);
      }
    }
    appendItem(this.page, 'active');
    if (pagesCount - this.page > 6) {
      appendItem(this.page + 1);
      appendItem(this.page + 2);
      appendItem('..', 'disabled');
      appendItem(pagesCount - 1);
      appendItem(pagesCount);
    } else {
      for (let i = this.page + 1; i <= pagesCount; i++) {
        appendItem(i);
      }
    }
    if (this.page === pagesCount) {
      appendItem('\u00bb', 'disabled');
    } else {
      appendItem('\u00bb');
    }
    this.root.classList.toggle('pagination--visible', true);
  }

}

export default Pagination;