const http = require('http');

const data = JSON.stringify({
  message: "I am feeling stressed",
  history: [
    { role: 'model', text: 'Hello! I am your Releafy AI assistant. How can I help you find peace today?' }
  ]
});

const options = {
  hostname: 'localhost',
  port: 5004,
  path: '/api/ai/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', d => { body += d; });
  res.on('end', () => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Response: ${body}`);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
