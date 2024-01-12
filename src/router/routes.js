import LoginLayout from 'layouts/LoginLayout.vue'
import LoginPage from 'pages/login.vue'
import Home from 'pages/home.vue'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: '/cozinheiro', name: 'cozinheiro', component: () => import('pages/pgCozinheiro.vue') },
      { path: '/pronto', name: 'pronto', component: () => import('pages/pgProntos.vue') },
      { path: '/adm', name: 'adm', component: () => import('pages/admin.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },

  {
    path: '/',
    component: LoginLayout,
    children: [
      { path: '/login', name: 'login_', component: LoginPage },
      { path: '/homel', name: 'home_', component: Home },
      { path: '/sobre', name: 'sobre', component: () => import('pages/pgSobre.vue') }
    ]
  }
]

export default routes
