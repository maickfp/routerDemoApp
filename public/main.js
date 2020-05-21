
function getWeatherInfo(){

    const weatherCity = document.getElementById('city').value;

    fetch(`api/weather/${weatherCity}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(resp => {
        document.getElementById('climaInfo').innerHTML = `<span>Clima en ${weatherCity}: ${resp.speed}</span>`
    });

}

function createTweet(){

    const tweetContent = document.getElementById('content').value;
    
    const tweetBody = {
        content: tweetContent,
        userId: 'maickfp'
    };
    
    fetch('api/tweets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tweetBody)
    })
    .then(res => res.json())
    .then(resp => {
        alert(resp.msg);
        document.getElementById('content').value = '';
        listTweets();
    });

}

function listTweets(){

    fetch('api/tweets', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(resp => {
        let tweetsList = "<ul>";
        for(i in resp){
            tweetsList += `<li>@${resp[i].userId}: ${resp[i].content}</li>`;
        }
        tweetsList += "</ul>";
        document.getElementById('tweetsInfo').innerHTML = tweetsList;
    });

}