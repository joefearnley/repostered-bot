const request = require('request');
const cheerio = require('cheerio');

request('http://www.repostered.com/labels', (error, response, body) => {
  if (error) {
    console.log('Error encountered:');
    console.log(error);
  }

  const $ = cheerio.load(body);
  const designers = $('.designer-info');
  const randomNumber = Math.floor(Math.random() * 21);
  const setLink = designers.eq(randomNumber).find('a').attr('href');

  request('http://www.repostered.com' + setLink, 
    (error, response, body) => {
      const $$ = cheerio.load(body);
      const posters = $$('.poster-container');
      const postLink = posters.eq(Math.floor(Math.random() * posters.length)).find('a').attr('href');

      request('http://www.repostered.com' + postLink, (error, response, body) => {
        const $$$ = cheerio.load(body);
        const imageUrl = $$$('#posterBig').attr('src');
        console.log('http://www.repostered.com' + imageUrl);
      });
    });
});