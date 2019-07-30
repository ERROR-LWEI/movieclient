import { Module, Commit } from 'vuex';
import { RootState, Response } from '@/modules/RootState';
import request, { RequestParam } from '@/middleware/request';

interface Res {
    movietype: Response
    language: Response
    nation: Response
}

const state: Res = {
    movietype: {
        data: []
    },
    language: {
        data: []
    },
    nation: {
        data: []
    }
}

const namespaced: boolean = true;

const actions: any = {
    getMovietype(context: { commit: Commit }, params: RequestParam) {
        request(params).then((res) => {
            context.commit('GetMovietype', res);
        }).catch((e) => null);
    },
    getLanguage(context: { commit: Commit }, params: RequestParam) {
        request(params).then(res => {
            context.commit('GetLanguage', res);
        }).catch((e) => null);
    },
    getNation(context: { commit: Commit }, params: RequestParam) {
        request(params).then(res => {
            context.commit('GetNation', res);
        }).catch((e) => null);
    }
}

const mutations: any = {
    GetMovietype(states: any, params: object) {
        state.movietype = params;
    },
    GetLanguage(states: any, params: object) {
        state.language = params;
    },
    GetNation(states: any, params: object) {
        state.nation = params;
    }
}

export const metadata: Module<Res, RootState> = {
    namespaced,
    state,
    actions,
    mutations
}