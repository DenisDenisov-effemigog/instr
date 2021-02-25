import * as types from '../../mutation-types'

const state = {
    h1: '',
};

const mutations = {
    [types.LAYOUT_APPLY_TITLE] (state, title) {
        // document.title = title; не получается вывести название из языкового файла
    },
    [types.LAYOUT_APPLY_H1] (state, title) {
        state.h1 = title;
    }
};

export default {
    state,
    mutations
};