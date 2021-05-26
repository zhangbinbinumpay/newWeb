let devurl = 'http://47.95.9.162/';
let productionurl = 'http://47.95.9.162/';

module.exports = {
    proxy: {
        '/apis/': {
            target: process.env.NODE_ENV === 'production' ? productionurl : devurl,
            changeOrigin: true,
            pathRewrite: {
                '^/apis/': ''
            }
        }
    }
}
