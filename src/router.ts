import Vue from 'vue';
import Router from 'vue-router';
import BasicLayout from '@/Layout/BasicLayout.vue';
import UserLayout from '@/Layout/UserLayout.vue';
import MetaRouter from '@/views/meta/route';
import projectRouter from '@/views/user/project/router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Basic',
      component: () => import('@/Layout/BasicLayout.vue'),
      redirect: { name: 'home' },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/home/home.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('./views/About.vue'),
        }, 
        {
          path: 'usermessage',
          name: 'usermessage',
          component: () => import('@/Layout/AdminLayout.vue'),
          children: [projectRouter]
        },
        {
          path: 'movie/add',
          name: 'add',
          component: () => import('./views/movie/editandadd/movieform.vue')
        },
        {
          path: 'setting',
          name: 'setting',
          component:() => import('@/Layout/SettingLayout.vue')
        },
        MetaRouter
      ],
    },
    {
      path: '/user',
      name: 'user',
      component: UserLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('./views/user/Login.vue'),
        }, {
          path: 'sigin',
          name: 'sigin',
          component: () => import('./views/user/Sigin.vue'),
        },
      ],
    },
  ],
});
