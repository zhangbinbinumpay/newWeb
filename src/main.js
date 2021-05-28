// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

//  导入所有请求方法
import {getRequest} from './util/api'
import {postRequest} from './util/api'
import {deleteRequest} from './util/api'
import {putRequest} from './util/api'


//  向VUE的原型上添加请求方法
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;

import './assets/js/jquery-1.11.1.min.js'
import './assets/js/jquery-2.1.4.min.js'
import './assets/js/bootstrap.min'
import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome.min.css'
import './assets/css/style.css'


/* 自定义一些全局Vux UI */
import './ui/index'
/* 自定义拦截器*/
import './util/interceptors'
/* 字体转换*/
import './util/rem.js'
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
