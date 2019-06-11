import Vue from 'vue';
import Component from 'vue-class-component';
import request from '@/middleware/request';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

router.beforeEach(async (to, from, next) => {
  const toPath = to.path,
        fromPath = from.path;
  if (toPath.indexOf('/user') < 0) {
    const { code } = await request({
      api: '/api/user/getUser',
    });
    if (code === 401) {
      next('/user/login');
    }
  }
  next();
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
