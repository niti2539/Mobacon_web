const baseUrl = 'http://mobacon-api.pieros.site/';
async function signUp (data){
    let auth = localStorage.getItem('accessToken');
    console.log(localStorage.getItem('accessToken'));
    let response;
    try{
        response = await fetch(baseUrl+'/mobacon/api/web/operator', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${auth}`,  
                'Content-Type': 'multipart/form-data'
            },
            body: data, //เอาดาต้าที่ได้ไปแปลงเป็นเจสันก่อน
        }).then(resp => resp.json()); //แปลงเรสปอนซ์ที่ได้กลับมาให้กลายเป็นไฟล์เจสัน
        console.log(response);
    }catch(e){
        response= {message: "fails"};
    }
    return response; 
}

async function signIn (data){
    let response;
    try{
        response = await fetch(baseUrl+'mobacon/api/web/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(resp => resp.json());
        console.log(response);
    }catch(e){
        response= {message: "fails"};
    }
    return response;
}

async function getOperators (data){
    let response;
    try{
        response = await fetch(baseUrl+'/mobacon/api/web/operators', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: data,
        }).then(resp => resp.json());
        console.log(response);
    }catch(e){
        response= {message: "fails"};
    }
    return response;
}

export default { signUp, signIn, getOperators };
