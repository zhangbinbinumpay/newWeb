import Vue from 'vue'
import Router from 'vue-router'
import guide from '../components/guide'
import confirm from "../components/confirm";
import home from "../components/home";
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', redirect: 'home'},
        {
            path: '/home',
            name: 'home',
            component: home
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
        }
    ]
})
