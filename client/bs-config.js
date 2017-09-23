"use strict";
var proxyMiddleware = require('http-proxy-middleware');

module.exports = {
  server: {
    baseDir: "src",
    routes: {
      "/node_modules": "node_modules"
    },
    middleware: {
      2: proxyMiddleware('/api', {
          target: 'http://localhost:8000',
          changeOrigin: true,  // for vhosted sites, changes host header to match to target's host
          secure: false
      })
    }
  }
}
