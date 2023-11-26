import LoginLayout from 'layouts/LoginLayout.vue'
import LoginPage from 'pages/login.vue'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/IndexPage.vue') }
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
      { path: '', name: 'login_', component: LoginPage }
    ]
  }
]

export default routes
