
function getWeatherInfo(){

    document.getElementById('climaInfo').innerHTML = generateLoading();
    const weatherCity = 'Barranquilla';//document.getElementById('city').value;

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
        // document.getElementById('city').value = '';
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

function loagingRegister(){
    return '<div class="spinner-border spinner-border-sm text-primary" role="status"><span class="sr-only">Estamos validando los datos ingresados</span></div>';
}

function createUser(){
    
    document.getElementById('registerInfo').innerHTML = loagingRegister();
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    
    if(username === undefined || username.trim() === ''){
        document.getElementById('registerInfo').innerHTML = generateAlert('ERROR', 'Debe ingresar usuario');
        return;
    }
    
    if(name === undefined || name.trim() === ''){
        document.getElementById('registerInfo').innerHTML = generateAlert('ERROR', 'Debe ingresar nombre');
        return;
    }

    if(email === undefined || email.trim() === ''){
        document.getElementById('registerInfo').innerHTML = generateAlert('ERROR', 'Debe ingresar correo');
        return;
    }
    
    if(password === undefined || password.trim() === ''){
        document.getElementById('registerInfo').innerHTML = generateAlert('ERROR', 'Debe ingresar contraseña');
        return;
    }

    if(passwordConfirm === undefined || passwordConfirm.trim() === ''){
        document.getElementById('registerInfo').innerHTML = generateAlert('ERROR', 'Debe confirmar contraseña');
        return;
    }
    
    if(password !== passwordConfirm){
        document.getElementById('registerInfo').innerHTML = generateAlert('ERROR', 'Las contraseñas no coinciden');
        return;
    }
    
    const userBody = {
        username,
        name,
        email,
        password
    };
    
    fetch('api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userBody)
    })
    .then(res => res.json())
    .then(resp => {
        if(resp.est === 1){
            document.getElementById('username').value = '';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('passwordConfirm').value = '';
            document.getElementById('registerInfo').innerHTML = generateAlert('OK', 'Se ha creado el usuario satisfactoriamente');
        }else{
            document.getElementById('registerInfo').innerHTML = generateAlert('ERROR', resp.msg);
        }
    })
    .catch(error => {
        document.getElementById('registerInfo').innerHTML = generateAlert('ERROR', 'Ha ocurrido un error creando el usuario');
    });

}

function loginUser(){
    
    document.getElementById('loginInfo').innerHTML = loagingRegister();
    const username = document.getElementById('login_username').value;
    const password = document.getElementById('login_password').value;
    
    if(username === undefined || username.trim() === ''){
        document.getElementById('loginInfo').innerHTML = generateAlert('ERROR', 'Debe ingresar usuario');
        return;
    }
    
    if(password === undefined || password.trim() === ''){
        document.getElementById('loginInfo').innerHTML = generateAlert('ERROR', 'Debe ingresar contraseña');
        return;
    }

    const loginBody = {
        username,
        password
    };
    
    fetch('api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginBody)
    })
    .then(res => res.json())
    .then(resp => {
        if(resp.est === 1){
            document.getElementById('login_username').value = '';
            document.getElementById('login_password').value = '';
            
            const token = resp.token;
            localStorage.setItem('token', token);

            const divLogin = document.getElementById('div-login');
            const divRegister = document.getElementById('div-register');
            const divTweets = document.getElementById('div-tweets');
            
            divLogin.classList.add('hiddenElement');
            divRegister.classList.add('hiddenElement');
            divTweets.classList.remove('hiddenElement');
            listTweets();

        }else{
            document.getElementById('loginInfo').innerHTML = generateAlert('ERROR', resp.msg);
        }
    })
    .catch(error => {
        document.getElementById('loginInfo').innerHTML = generateAlert('ERROR', 'Ha ocurrido un error creando el usuario');
    });

}

function verifyUser(){

    const divLogin = document.getElementById('div-login');
    const divRegister = document.getElementById('div-register');
    const divTweets = document.getElementById('div-tweets');
    
    // divLogin.classList.add('hiddenElement');
    // divRegister.classList.add('hiddenElement');
    // divTweets.classList.remove('hiddenElement');

}