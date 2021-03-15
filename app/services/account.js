
function signInUser(username, password) {
    console.log('signing in...');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": username,
        "password": password
    })
    console.log(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fjellturchallenge-backend-dev.herokuapp.com/api/v1/accounts/login", requestOptions)
        .then(result => {
            if (result.status === 200) {
                console.log('Success logging in:'+ result.text())
            }
            else{
                console.log('login failed: '+result.body);
            }
        })
        .then(data=>{console.log(data);})
        .catch(error => console.log('error', error));
}

export {signInUser}