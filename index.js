const cheerio = require('cheerio');
const axios = require('axios');
const twitter = require('twitter');
const twitterClient = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
const baseUrl = 'http://www.repostered.com';

const getSeriesUrl = async () => {
  const res = await axios.get(`${baseUrl}/labels`);
  const $ = cheerio.load(res.data);
  const designers = $('.designer-info');
  const randomNumber = Math.floor(Math.random() * randomNumber.length);
  return designers.eq(randomNumber).find('a').attr('href');
};

const getPosterUrl = async url => {
  const res = await axios.get(`${baseUrl}${url}`);
  const $ = cheerio.load(res.data);
  const posters = $('.poster-container');
  const randomNumber = Math.floor(Math.random() * posters.length);
  return posters.eq(randomNumber).find('a').attr('href');
};

const getPoster = async url => {
  const res = await axios.get(`${baseUrl}${url}`);
  const $ = cheerio.load(res.data);
  const designer = $('#poster-image').next().find('a').first();

  return { 
    title,
    imageUrl: $('#posterBig').attr('src'),
    url: $('.page-title > a').text(),
    designer: designer.text(),
    designerUrl: `${baseUrl}${designer.attr('href')}`
  };
};

function sendTweet(poster) {
  const tweet = {
    status: poster.title
  };

  twitterClient.post('statuses/update', tweet, (error, tweet, response) => {
      if (error) {
        console.log('Error sending tweet');
        console.log(error);
      }
    });
}

getSeriesUrl()
  .then(getPosterUrl)
  .then(getPoster).then(sendTweet);