
function getWeatherInfo(){

    document.getElementById('climaInfo').innerHTML = generateLoading();
    const weatherCity = document.getElementById('city').value;

    if(weatherCity === undefined || weatherCity === ''){
        document.getElementById('climaInfo').innerHTML = generateAlert('ERROR', 'Debe ingresar Ciudad');
        return;
    }

    fetch(`api/weather/${weatherCity}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(resp => {
        document.getElementById('climaInfo').innerHTML = generateAlert('INFO', `Clima en ${weatherCity}: ${resp.temp}°C`);
        document.getElementById('city').value = '';
    })
    .catch(error => {
        document.getElementById('climaInfo').innerHTML = generateAlert('ERROR', 'Ha ocurrido un error en la petición HTTP');
    });

}

function createTweet(){

    document.getElementById('tweetsInfo').innerHTML = generateLoading();
    const tweetTitle = document.getElementById('title').value;
    const tweetContent = document.getElementById('content').value;

    if(tweetContent === undefined || tweetContent.trim() === ''){
        document.getElementById('tweetsInfo').innerHTML = generateAlert('ERROR', 'Debe ingresar Contenido');
        return;
    }

    const tweetBody = {
        title: tweetTitle,
        content: tweetContent
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
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        listTweets();
    })
    .catch(error => {
        document.getElementById('tweetsInfo').innerHTML = generateAlert('ERROR', 'Ha ocurrido un error creando el tweet');
    });

}

function listTweets(){

    fetch('api/tweets', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(resp => {
        let tweetsList = "";
        for(i in resp){
            tweetsList += generateTweetStructure(resp[i]);
        }
        document.getElementById('tweetsInfo').innerHTML = tweetsList;
    })
    .catch(error => {
        document.getElementById('tweetsInfo').innerHTML = generateAlert('ERROR', 'Ha ocurrido un error listando los tweets');
    });

}

function generateLoading(){
    return '<div class="spinner-border spinner-border-sm text-primary" role="status"><span class="sr-only">Loading...</span></div>';
}

function generateTweetStructure(tweet){
    return `<a href="#" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${tweet.title}</h5>
        <small>${tweet.date}</small>
        </div>
        <p class="mb-1">${tweet.content}</p>
        <small>By @${tweet.user}</small>
    </a>`;
}

function generateAlert(tip, msg){
    let tipAlert;
    switch(tip){
        case 'OK': // ok
            tipAlert = 'success';
            break;
        case 'ERROR': // error
            tipAlert = 'danger';
            break;
        case 'WARN': // warning
            tipAlert = 'warning';
            break;
        case 'INFO':
            tipAlert = 'primary';
            break;
        default:
            tipAlert = 'secondary';
    }

    return `<div class="alert alert-${tipAlert}" role="alert">${msg}</div>`;
}