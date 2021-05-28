// let devurl = 'http://47.95.9.162/';
let devurl = 'http://activitytest.hewa.cn/';
let productionurl = 'http://activitytest.hewa.cn/';

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
