
import { SERVER_URL, getToken } from './utils';
/**
 * get all rules
 */
export function allRules() {
  let myHeaders = new Headers();
  return getToken().then((token) => {
    //after token is read from storage, send request
    myHeaders.append("Authorization", "Bearer " + token);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let result = fetch(SERVER_URL + "/api/v1/rule/getAll", requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.log('error sending current request', error));

    return result;
  })
}