// 配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由组件
// import axios from 'axios'
// 导入组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
    ],
})

export default router