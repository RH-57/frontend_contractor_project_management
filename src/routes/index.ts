// import vue router
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// define routes with proper type
const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/auth/login.vue')
    },
]

// create router
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

