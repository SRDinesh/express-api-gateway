const express = require('express');
// const proxy = require('express-http-proxy');
const app = express();
const port = 3005;
const httpProxy = require('http-proxy');
const apiForwardingUrl = 'http://localhost:3000';
// app.use('/auth', proxy('localhost:3000'));
// app.get('/', (req, res) => res.send('Hello World!'));
httpProxy.prototype.onError = (err)=> {
    console.log(err);
};

const apiProxy = httpProxy.createProxyServer();

app.all("/auth/*", (req, res)=> {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));