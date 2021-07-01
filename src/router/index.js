import Vue from 'vue'
import Router from 'vue-router'
import guide from '../components/guide'
import confirm from "../components/confirm";
import home from "../components/home";
import baichang from "../components/baichang";
import escorts from "../components/escorts";
import mian from "../components/comment/viwe/main.vue";
import NavMenu from "../components/comment/viwe/NavMenu.vue";
import footer from "../components/comment/Footer.vue";
import helpList from "../components/comment/viwe/helpList.vue";
import SingleNews from "../components/comment/SingleNews.vue";

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
            path: '/home',
            name: 'home',
            component:home,
				// ����·��
				children:[
					{
						path:'/mian',
						name:'mian',
						component:mian,
						
					},{
						path:'/NavMenu',
						name:'NavMenu',
						component:NavMenu,
						
					},{
						path:'/helpList',
						name:'helpList',
						component:helpList,
						
					},{
						path: '/SingleNews',
						name: 'SingleNews',
						component: SingleNews
					},
					
				]
			
        },
		{
		    path: '/footer',
		    name: 'footer',
		    component:footer
		},
		
    ]
})
