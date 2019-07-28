import { Module, Action, Commit } from 'vuex';
import { RootState } from '@/modules/RootState';
import request, { RequestParam } from '@/middleware/request';

interface Metadata {
    code?: number,
    message?: string,
    type?: string,
    data?: any
}

interface Res {
    movietype: Metadata
    language: Metadata
}

const state: Res = {
    movietype: {
        data: []
    },
    language: {
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
    }
}

const mutations: any = {
    GetMovietype(states: any, params: object) {
        state.movietype = params;
    },
    GetLanguage(states: any, params: object) {
        state.language = params;
    }
}

export const metadata: Module<Res, RootState> = {
    namespaced,
    state,
    actions,
    mutations
}