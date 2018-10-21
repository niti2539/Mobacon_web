const baseUrl = 'http://mobacon-api.pieros.site/';

async function signUp (data){
    let response = await fetch(baseUrl+'mobacon/api/web/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(resp => resp.json());
    console.log(response);
    return response;
}

export default { signUp };
