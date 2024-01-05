import { FetchedTweet } from '../types';
import { getTweets } from '../dom';
import { settings } from '../settings';

const filterWithSequentialNumbers = (item: FetchedTweet) => {
  const numbers = 4;
  const regex = `\\d{${numbers}}`;
  return new RegExp(regex, 'i').test(item.userHandle);
};

const filterPubli = async (item: FetchedTweet) => {
  const blockAds = await settings.getItem('blockAds', true);
  if (!blockAds) {
    return false;
  }

  const links = Array.from(item.tweetElement.querySelectorAll('a'));
  const hasLinks = !!links.find((item) => {
    if (!/^De(.*?).com(.*?)/.test(item.innerText)) {
      return false;
    }
    return !item.getAttribute('href')?.startsWith('https://t.co/');
  });

  if (hasLinks) {
    return true;
  }

  const spans = item.tweetElement.querySelectorAll('span');
  
  const spansText = !!Array.from(spans)
    .map((item) => item.innerText)
    .find((text) => text === 'Promovido');

  return spansText;
}

const FILTERS = [filterWithSequentialNumbers, filterPubli];

const isInvalidHandle = async (tweet: FetchedTweet) => {
  for(const filter of FILTERS) {
    if (await filter(tweet)) {
      return true;
    }
  }
  return false;
}


const hideTweet = (element: HTMLElement) => {
  element.setAttribute('data-hide', '1');
  //element.style.display = 'none';
  element.style.background = 'red';
};


const processFeed = async () => {
  const tweets = getTweets();

  for (const item of tweets) {
    if (!(await isInvalidHandle(item))) {
      continue;
    }

    hideTweet(item.innerElement);
  }
};

const INTERVAL_TIME = 200;
const interval = setInterval(processFeed, INTERVAL_TIME);
