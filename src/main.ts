import Vue from 'vue';
import Component from 'vue-class-component';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueLazyload)

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
