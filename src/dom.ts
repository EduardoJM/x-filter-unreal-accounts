import { FetchedTweet } from './types';

export const tweetInnerDivSelector = 'div[data-testid="cellInnerDiv"]:not([data-hide])';
export const tweetSelector = 'article[data-testid="tweet"]';
export const userNameSelector = 'div[data-testid="User-Name"]';
export const userHandleSelector = `div:last-child > div > div:first-child > a`;

export const getTweets = (parent?: HTMLElement): FetchedTweet[] => {
  const element = parent ? parent : document;

  const tweetsNamesSelector = `${tweetInnerDivSelector} ${tweetSelector} ${userNameSelector} ${userHandleSelector}`;
  return Array
    .from(element.querySelectorAll(tweetsNamesSelector))
    .map((item) => {
      const innerElement = item.closest(tweetInnerDivSelector) as HTMLElement;
      const tweetElement = item.closest(tweetSelector) as HTMLElement;
      const userHandle = item.textContent || '';
  
      return { innerElement, tweetElement, userHandle };
    });
};
