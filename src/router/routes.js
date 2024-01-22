import LoginLayout from 'layouts/LoginLayout.vue'
import LoginPage from 'pages/login.vue'
import Home from 'pages/home.vue'
import authGuard from '../guards/authGuard'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', name: 'home', component: () => import('pages/IndexPage.vue'), beforeEnter: authGuard },
      { path: '/cozinheiro', name: 'cozinheiro', component: () => import('pages/pgCozinheiro.vue'), beforeEnter: authGuard },
      { path: '/pronto', name: 'pronto', component: () => import('pages/pgProntos.vue'), beforeEnter: authGuard },
      { path: '/adm', name: 'adm', component: () => import('pages/admin.vue'), beforeEnter: authGuard }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },

  {
    path: '',
    component: LoginLayout,
    children: [
      { path: '', name: 'login_', component: LoginPage },
      { path: '/sing-in', name: 'sing_', component: () => import('src/pages/signIn.vue') },
      { path: '/homel', name: 'home_', component: Home },
      { path: '/sobre', name: 'sobre', component: () => import('src/pages/sobre.vue') },
      { path: '/homeL', name: 'homeL', component: () => import('src/pages/home.vue') },
      { path: '/contato', name: 'contato', component: () => import('src/pages/contato.vue') },
      { path: '/recuperar', name: 'recuperar', component: () => import('pages/recuperacao.vue') },
      {
        path: '/novaSenha/:token',
        name: 'novaSenha',
        component: () => import('pages/novaSenha.vue'),
        props: true
      }
    ]
  }
]

export default routes
