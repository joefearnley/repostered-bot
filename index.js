const cheerio = require('cheerio');
const axios = require('axios');
const reposteredUrl = 'http://www.repostered.com';

axios.get('http://www.repostered.com/labels').then(res => {
  const $ = cheerio.load(res.data);
  const designers = $('.designer-info');
  console.log(designers.length);
  const randomNumber = Math.floor(Math.random() * 21);
  const setLink = designers.eq(randomNumber).find('a').attr('href');

  axios.get('http://www.repostered.com' + setLink).then(res => {
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
})
.catch(err => {
  console.log('Error encountered:');
  console.log(error);
});