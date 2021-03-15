/**
 * Sign in user
 * @param {String} username 
 * @param {String} password 
 */
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
                return true;
            }
            else{
                console.log('login failed: '+result.body);
            }
        })
        .then(data=>{console.log(data);})
        .catch(error => console.log('error', error));
}

function createUser(username, password) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": username,
        "password": password
    })

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fjellturchallenge-backend-dev.herokuapp.com/api/v1/accounts/register", requestOptions)
        .then(result => {
            if (result.status === 200) {
                console.log('Success')
                navigation.navigate("Sign In")
            }
        })
        .catch(error => console.log('error', error));
}

export {signInUser, createUser}