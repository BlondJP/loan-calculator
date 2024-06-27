import { createMemoryHistory, createRouter } from 'vue-router'

import Loan from './components/Loan.vue'
import Metal from './components/Metal.vue'

const routes = [
    { path: '/loan', component: Loan },
    { path: '/metal', component: Metal },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router