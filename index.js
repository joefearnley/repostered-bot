const cheerio = require('cheerio');
const axios = require('axios');
const twitter = require('twitter');
require('dotenv').config();

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
  const randomNumber = Math.floor(Math.random() * designers.length);
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
    title: $('.page-title > a').text(),
    imageUrl: `${baseUrl}${$('#posterBig').attr('src')}`,
    url: `${baseUrl}${url}`,
    designer: designer.text(),
    designerUrl: `${baseUrl}${designer.attr('href')}`
  };
};

const sendTweet = async poster => {
  const res = await axios.get(poster.imageUrl, { responseType: 'arraybuffer' });
  const photo = res.data;

  twitterClient.post('media/upload', { media: photo }, (error, media, response) => {
    if(error) {
      console.error(`Error posting image to Twitter: ${JSON.parse(response.body).error}`);
      return;
    }

    const status = {
      status: `${poster.title} created by ${poster.designer} - ${poster.url}`,
      media_ids: media.media_id_string 
    };

    twitterClient.post('statuses/update', status, function(error, tweet, response) {
      if (error) {
        console.error(`Error posting status to Twitter: ${JSON.parse(response.body).error}`);
      }
    });
  });
};

getSeriesUrl()
  .then(getPosterUrl)
  .then(getPoster)
  .then(sendTweet);
