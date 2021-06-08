import Vue from 'vue'
import Router from 'vue-router'
import guide from '../components/guide'
import confirm from "../components/confirm";
import home from "../components/home";
import baichang from "../components/baichang";
import escorts from "../components/escorts";


Vue.use(Router)

export default new Router({
    mode: 'hash',//history、hash
    base: 'exclusive',
    routes: [
        {path: '/', redirect: 'escorts'},
        {
           path: '/escorts',
           name: 'escorts',
           component:escorts
        },
        {
            path: '/guide',
            name: 'guide',
            component: guide
        },
        {
            path: '/confirm',
            name: 'confirm',
            component: confirm
        },
        {
            path: '/baichang',
            name: 'baichang',
            component: baichang
        },
        {
            path: '/escorts',
            name: 'escorts',
            component:escorts
        }
    ]
})
