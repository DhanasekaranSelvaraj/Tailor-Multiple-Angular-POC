'use strict'
 
const http = require('http')
const url = require('url'); // built-in utility

const Tailor = require('node-tailor')
const tailor = new Tailor({
  maxAssetLinks: 15,
  templatesPath: __dirname   
})


http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    console.log('request URL', req.url);
    if (req.url === '/') {
      req.url = '/index';
    }
    tailor.requestHandler(req, res)

  })
  .listen(9090, function () {
    console.log('Tailor server listening on port 9090')
  })
