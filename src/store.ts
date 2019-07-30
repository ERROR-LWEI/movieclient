import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/modules/RootState';
import { metadata } from '@/modules/metadata';
import { movie } from '@/modules/movie';
import { user } from '@/modules/user';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
  },
  modules: {
    metadata,
    movie,
    user
  }
}

export default new Vuex.Store<RootState>(store);

// export default new Vuex.Store({
//   state: {

//   },
//   mutations: {

//   },
//   actions: {

//   },
// });
