import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import login from "../views/auth/login.vue";
import NotFound from "../views/NotFound.vue";
import Cookies from "js-cookie";

const getToken = () => Cookies.get('token')


const routes = [
    {
        path: '/login',
        name: 'login',
        component: login
    },

    {
        path: '/',
        component: MainLayout,
        redirect: '/dashboard', // Redirect otomatis saat akses path /
        children: [
        {
            path: 'dashboard',
            name: 'dashboard',
            meta: { requiresAuth: true },
            component: () => import('../views/admin/dashboard/index.vue')
        },
        // Tambahkan rute internal lainnya di sini
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
        meta: { requiresAuth: false }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _from, next) => {
    const token = getToken()

    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next({ name: 'login' })
    }
    else if ((to.name === 'login') && token) {
        next({ name: 'dashboard' })
    }
    else {
        next()
    }
})



export default router