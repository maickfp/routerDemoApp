const tweetsArray = [];

/* Tweet format
{
    id: auto,
    content: string,
    date: string,
    user: number
}
 */
const newTweet = (tweet) => {
    tweetsArray.push(tweet);
};

const loadTweets = () => {
    return tweetsArray;
};

const arrayLength = () => {
    return tweetsArray.length;
};

module.exports = {newTweet, loadTweets, arrayLength};