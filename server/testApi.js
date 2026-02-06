const axios = require('axios');

async function testApi() {
    try {
        const res = await axios.get('http://127.0.0.1:5000/api/gallery');
        console.log('Success:', res.data);
    } catch (err) {
        console.log('Error Status:', err.response ? err.response.status : 'No Response');
        console.log('Error Data:', err.response ? err.response.data : 'N/A');
    }
}
testApi();
