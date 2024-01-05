const filterWithSequentialNumbers = (item) => {
  const numbers = 4;
  const regex = `\\d{${numbers}}`;
  return new RegExp(regex, 'i').test(item.userHandle);
};

const filterPubli = (item) => {
  const links = Array.from(item.tweetElement.querySelectorAll('a'));
  const hasLinks = !!links.find((item) => {
    if (!/^De(.*?).com(.*?)/.test(item.innerText)) {
      return false;
    }
    return !item.getAttribute('href').startsWith('https://t.co/');
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

const isInvalidHandle = (tweet) => {
  for(const filter of FILTERS) {
    if (filter(tweet)) {
      return true;
    }
  }
  return false;
}

const INTERVAL_TIME = 200;

const tweetInnerDivSelector = 'div[data-testid="cellInnerDiv"]:not([data-hide])';
const tweetSelector = 'article[data-testid="tweet"]';
const userNameSelector = 'div[data-testid="User-Name"]';
const userHandleSelector = `div:last-child > div > div:first-child > a`;

const getTweets = () => {
  const tweetsNamesSelector = `${tweetInnerDivSelector} ${tweetSelector} ${userNameSelector} ${userHandleSelector}`;
  return Array
    .from(document.querySelectorAll(tweetsNamesSelector))
    .map((item) => {
      const innerElement = item.closest(tweetInnerDivSelector);
      const tweetElement = item.closest(tweetSelector);
      const userHandle = item.textContent;
  
      return { innerElement, tweetElement, userHandle };
    });
};

const hideTweet = (element) => {
  element.setAttribute('data-hide', '1');
  //element.style.display = 'none';
  element.style.background = 'red';
};

const processFeed = () => {
  const tweets = getTweets();

  for (item of tweets) {
    if (!isInvalidHandle(item)) {
      continue;
    }

    hideTweet(item.innerElement);
  }
};

const interval = setInterval(processFeed, INTERVAL_TIME);
