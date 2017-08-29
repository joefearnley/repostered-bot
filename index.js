const cheerio = require('cheerio');
const axios = require('axios');
const baseUrl = 'http://www.repostered.com';

async function getSeriesUrl() {
  const res = await axios.get(`${baseUrl}/labels`);
  const $ = cheerio.load(res.data);
  const designers = $('.designer-info');
  const randomNumber = Math.floor(Math.random() * 21);
  return designers.eq(randomNumber).find('a').attr('href');
};

getSeriesUrl().then(url => {

  axios.get('http://www.repostered.com' + url).then(res => {
      const $$ = cheerio.load(res.data);
      const posters = $$('.poster-container');
      const posterLink = posters.eq(Math.floor(Math.random() * posters.length)).find('a').attr('href');

      axios.get('http://www.repostered.com' + posterLink).then(res => {
        const $$$ = cheerio.load(res.data);
        const imageUrl = $$$('#posterBig').attr('src');
        console.log(posterLink);
        console.log('http://www.repostered.com' + imageUrl);
      });
    });


});