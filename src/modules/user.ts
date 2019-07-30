
import { Response, RootState } from '@/modules/RootState';
import { Commit, Module } from 'vuex';
import request, { RequestParam } from '@/middleware/request';
interface UserInterface {
    usermsg: Response
}
const state: UserInterface = {
    usermsg: {}
}

const namespaced: boolean = true;

const actions: any = {
    getUsermsg(context: { commit: Commit }, params: RequestParam) {
        request(params).then((res) => {
            const { data } = res;
            if (data) {
                context.commit('GetUsermsg', res);
            } else {
                context.commit('GetUsermsg', {});
            }
        }).catch(e => {
            return null
        });
    },
    loginOut(context: { commit: Commit }, params: RequestParam) {
        request(params).then((res) => {
            context.commit('GetUsermsg', {});
        }).catch(e => null);
    }
}

const mutations: any = {
    GetUsermsg(states: any, params: object) {
        states.usermsg = params;
    }
}

export const user: Module<UserInterface, RootState> = {
    namespaced,
    state,
    actions,
    mutations
}