import Vue from 'vue'
import VueRouter from 'vue-router'
// import Main from "@/views/Main";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Mall from "../views/Mall.vue";
import PageOne from "../views/PageOne.vue";
import PageTwo from "../views/PageTwo.vue";
import Login from "../views/Login.vue"
import Cookie from 'js-cookie'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name:'Main',
        component: () => import('../views/Main.vue'),
        redirect: '/home',
        children: [
            // { path: '/home', name: 'home', component: Home },
            // { path: '/user', name: 'user', component: User },
            // { path: '/mall', name: 'mall', component: Mall },
            // { path: '/page1', name: 'page1', component: PageOne },
            // { path: '/page2', name: 'page2', component: PageTwo },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]
const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    const token = Cookie.get('token')
    if (!token && to.name !== 'login') {
        next({ name: 'login' })
    } else if (token && to.name == 'login') {
        next({ name: 'home' })
    } else {
        next()
    }
})
export default router

