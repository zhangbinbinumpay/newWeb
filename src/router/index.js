import Vue from 'vue'
import Router from 'vue-router'
import guide from '../components/guide'
import confirm from "../components/confirm";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/guide',
            name: 'Guide',
            component: guide
        },
        {
            path: '/confirm',
            name: 'Confirm',
            component: confirm
        }
    ]
})
