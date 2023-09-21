import { createRouter, createWebHistory } from 'vue-router'
import MainVue from './pages/Main.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: MainVue,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router