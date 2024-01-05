const filterWithSequentialNumbers = (item) => {
  const numbers = 4;
  const regex = `\\d{${numbers}}`;
  return new RegExp(regex, 'i').test(item.userHandle);
};

const filterPubli = (item) => {
  const links = Array.from(item.tweetElement.querySelectorAll('a'));
  return !!links.find((item) => /^De(.*?).com(.*?)/.test(item.innerText));
}

const FILTERS = [filterWithSequentialNumbers, filterPubli];

const isInvalidHandle = (tweet) => {
  const failedFilters = FILTERS.filter((item) => {
    return item(tweet);
  });

  return failedFilters.length > 0;
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

    console.log(item.innerElement);
    hideTweet(item.innerElement);
  }
};

const interval = setInterval(processFeed, INTERVAL_TIME);
