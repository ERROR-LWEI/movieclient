import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import BasicLayout from '@/Layout/BasicLayout.vue';
import UserLayout from '@/Layout/UserLayout.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Basic',
      component: BasicLayout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: UserLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: ()=> import('./views/user/Login.vue'),
        },{
          path: 'sigin',
          name: 'sigin',
          component: () => import('./views/user/Sigin.vue'),
        },
      ],
    },
  ],
});
