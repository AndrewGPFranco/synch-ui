import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: 'Synch - Home',
      },
    },
    {
      path: '/auth',
      name: 'login',
      component: () => import('@/views/AuthView.vue'),
      meta: {
        title: 'Synch - Autenticação',
      },
    },
    {
      path: '/tables',
      name: 'tables',
      component: () => import('@/views/TableListingView.vue'),
      meta: {
        title: 'Synch - Tabelas',
      },
    },
    {
      path: '/table/:id',
      name: 'table-detail',
      component: () => import('@/views/TableView.vue'),
      meta: {
        title: 'Synch - Visualização Tabela',
      },
    },
  ],
})

export default router
