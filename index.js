const cheerio = require('cheerio');
const axios = require('axios');
const baseUrl = 'http://www.repostered.com';

const getSeriesUrl = async () => {
  const res = await axios.get(`${baseUrl}/labels`);
  const $ = cheerio.load(res.data);
  const designers = $('.designer-info');
  const randomNumber = Math.floor(Math.random() * 21);
  return designers.eq(randomNumber).find('a').attr('href');
};

const getPosterUrl = async url => {
  const res = await axios.get(`${baseUrl}/${url}`);
  const $ = cheerio.load(res.data);
  const posters = $('.poster-container');
  return posters.eq(Math.floor(Math.random() * posters.length)).find('a').attr('href');
};

const getPoster = async url => {
  const res = await axios.get(`${baseUrl}/${url}`);
  const $ = cheerio.load(res.data);
  const imageUrl = $('#posterBig').attr('src');
  return { imageUrl, url };
};

getSeriesUrl()
  .then(getPosterUrl)
  .then(getPoster).then(poster => {
      console.log(poster);
});