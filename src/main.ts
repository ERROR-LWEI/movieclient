import Vue from 'vue';
import Component from 'vue-class-component';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

router.beforeEach((to, from, next) => {
  const toPath = to.path,
        fromPath = from.path;
  console.log('to', toPath);
  console.log('from', fromPath);
  next();
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
