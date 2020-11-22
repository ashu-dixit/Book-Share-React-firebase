const proxy = require('http-proxy-middleware').createProxyMiddleware

exports = module.exports = (app)=>{
    app.use(proxy('/data',{target:'http://127.0.0.1:5555/'}))    
}