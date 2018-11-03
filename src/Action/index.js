const baseUrl = 'http://mobacon-api.pieros.site/';

async function signUp (data){
    let response = await fetch(baseUrl+'mobacon/api/web/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(resp => resp.json())
    .catch(error => {
     return {message: "error"}
    });
    console.log(response);
    return response; 
}

async function signIn (data){
    const response = await fetch(baseUrl+'mobacon/api/web/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(resp => resp.json())
    .catch(error => {
     return {message: "error"}
    });
    console.log(response);
    return response;
}
export default { signUp, signIn };
