module.exports = async function(source) {
  this.cacheable();
  
  source = JSON.parse(source);

  const fetch = require('node-fetch');
  const yandexTranslateApiKey = 'trnsl.1.1.20181129T102625Z.ba075a8c563511bb.ba80c62aaf020e679ccbc62ac9b679fe97febc35';
  const textsArray = [];

  const translate = async (textArray) => {
    const params = new URLSearchParams();
    params.append('lang', 'en-ru');
    params.append('key', yandexTranslateApiKey);
    for (const text of textArray) {
      params.append('text', text);
    }

    const res = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?${params.toString()}`);
    const resObj = await res.json();
    if (resObj.code === 200) {
      return (resObj.text);
    } else {
      return textArray;
    }
  }

  const getTextFields = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (key === 'text') {
          if (obj[key] && typeof obj[key] === 'string') {
            textsArray.push(obj[key]);
          }
        }
        getTextFields(obj[key]);
      }
    }
  }
  
  getTextFields(source);

  const translatedTextsArray = await translate(textsArray);

  let index = 0;

  const setTextFields = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (key === 'text') {
          obj[key] = translatedTextsArray[index++];
        }
        setTextFields(obj[key]);
      }
    }
  }

  setTextFields(source);

  source = JSON.stringify(source);
  return source;
};