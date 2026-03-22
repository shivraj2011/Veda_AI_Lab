
// Node fetch removed to use native http

const http = require('http');

const options = {
    hostname: '127.0.0.1',
    port: 7860,
    path: '/sdapi/v1/progress?skip_current_image=true', // Check progress/status
    method: 'GET',
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.end();
