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
            {
                path: 'users',
                name: 'users',
                meta: { requiresAuth: true },
                component: () => import('../views/admin/users/Index.vue')
            },
            {
                path: 'users/create',
                name: 'users.create',
                meta: { requiresAuth: true },
                component: () => import('../views/admin/users/Create.vue')
            },
            {
                path: 'users/edit/:id',
                name: 'users.edit',
                meta: {requiresAuth: true},
                component: () => import('../views/admin/users/Edit.vue')
            },
            {
                path: 'employees',
                name: 'employees',
                meta: { requiresAuth: true },
                component: () => import('../views/admin/employee/Index.vue')
            },
            {
                path: 'employees/create',
                name: 'employees.create',
                meta: {requiresAuth: true},
                component: () => import('../views/admin/employee/Create.vue')
            },
            {
                path: 'employees/edit/:id',
                name: 'employees.edit',
                meta: {requiresAuth: true},
                component: () => import('../views/admin/employee/Edit.vue')
            },
            {
                path: 'customers',
                name: 'customers',
                meta: {requiresAuth: true},
                component: () => import('../views/admin/customer/Index.vue')
            },
            {
                path: 'customers/create',
                name: 'customers.create',
                meta: {requiredAuth: true},
                component: () => import('../views/admin/customer/Create.vue')
            },
            {
                path: 'customers/edit/:id',
                name: 'customers.edit',
                meta: {requiresAuth: true},
                component: () => import('../views/admin/customer/Edit.vue')
            },
            {
                path: 'vendors',
                name: 'vendors',
                meta: {requiredAuth: true},
                component: () => import('../views/admin/vendor/Index.vue')
            },
            {
                path: 'vendors/create',
                name: 'vendor.create',
                meta: {requiresAuth: true},
                component: () => import('../views/admin/vendor/Create.vue')
            },
            {
                path: 'vendors/edit/:id',
                name: 'vendors.edit',
                meta: {requiresAuth: true},
                component: () => import('../views/admin/vendor/Edit.vue')
            },
            {
                path: 'projects',
                name: 'projects',
                meta: {requiresAuth: true},
                component: () => import('../views/admin/project/Index.vue')
            },
            {
                path: 'projects/create',
                name: 'projects.create',
                meta: {requiresAuth: true},
                component: () => import('../views/admin/project/Create.vue')
            },
            {
                path: 'projects/show/:id',
                name: 'projects.show',
                meta: {requiresAuth: true},
                component: () => import('../views/admin/project/Show.vue')
            }
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