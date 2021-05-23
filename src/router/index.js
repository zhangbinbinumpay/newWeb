import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/Home'
import content from '../components/Content';
import list from '../components/List';
import label from '../components/Label';

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/content/detail/:cid',
      name: 'Content',
      component: content
    },
    {
      path: '/list/special/:specialId',
      name: 'List-special',
      component: list
    },
    {
      path: '/list/search/:keyword',
      name: 'List-search',
      component: list
    },
    {
      path: '/list/type/:typeId',
      name: 'List-type',
      component: list
    },
    {
      path: '/list/label/:label',
      name: 'List-label',
      component: list
    },
    {
      path: '/label',
      name: 'Label',
      component: label
    }
  ]
})
