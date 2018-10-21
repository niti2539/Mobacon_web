const baseUrl = 'http://mobacon-api.pieros.site/';

async function signUp (data){
    const response = await fetch(baseUrl+'mobacon/api/web/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json', // เซิฟเวอร์จะตอบกลับมารูปแบบไหน
            'Content-Type': 'application/json' // สิ่งที่จะส่งไปให้เซิฟเวอร์รูปแบบไหน
        },
        body: JSON.stringify(data), //เอาดาต้าที่ได้ไปแปลงเป็นเจสันก่อน
    }).then(resp => resp.json()); //แปลงเรสปอนซ์ที่ได้กลับมาให้กลายเป็นไฟล์เจสัน
    console.log(response);
    return response; 
}

export default { signUp };
