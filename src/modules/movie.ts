
import { Response, RootState } from '@/modules/RootState';
import { Commit, Module } from 'vuex';
import request, { RequestParam } from '@/middleware/request';
interface MovieInterface {
    addmovie: Response
}
const state: MovieInterface = {
    addmovie: { }
}

const namespaced: boolean = true;

const actions: any = {
    addMovie(context: { commit: Commit }, params: RequestParam) {
        context.commit('UpdateAddMovie', { });
        request(params).then((res) => {
            context.commit('UpdateAddMovie', res);
        }).catch((e) => null);
    }
}

const mutations: any  = {
    UpdateAddMovie(states: any, params: object) {
        state.addmovie = params;
    }
}

export const movie: Module<MovieInterface, RootState> = {
    namespaced,
    state,
    actions,
    mutations
}