const http = require('http');

const options = {
    hostname: '127.0.0.1',
    port: 11434,
    path: '/api/tags',
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Ollama Status: ONLINE');
        console.log('Available Models:', JSON.parse(data));
    });
});

req.on('error', (error) => {
    console.error('Ollama Error:', error.message);
    console.error('Make sure Ollama is running!');
});

req.end();
