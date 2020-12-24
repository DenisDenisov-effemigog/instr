import * as types from '../../mutation-types';
import * as Api from '../../../api';

let api = Api.getInstance();

const state = {
    first_name: '',
    last_name: '',
    
    company: '',
    contact: '',
    personType: '',
    personTypePrint: '',
    phone: '',
    code: '',
    email: '',
    address: '',
    
    /*
    short_profile_fullname: '',
    short_profile_company: '',
    short_profile_avatar: '',
    short_profile_orders: {
        active: 0,
        delivered: 0,
        canceled: 0
    },

    contract: {
        number: '',
        effective_date: '',
        url: ''
    },
    payment_limit: {
        max: 0,
        current: 0
    },
    pricing_level: {
        max: 0,
        current: 0
    },*/
    orders: []
};

const mutations = {
    [types.PERSONAL_APPLY_PROFILE](state, data) {
        state.company = data.company;
        state.contact = data.contact;
        state.personType = data.personType;
        state.personTypePrint = data.personTypePrint;
        state.phone = data.phone;
        state.code = data.code;
        state.email = data.email;
        state.address = data.address;
    },
    [types.PERSONAL_APPLY_ORDERS](state, orders) {
        state.orders = orders;
    },
};

const actions = {
    personalUpdateShortProfile: ({commit, dispatch}) => { //TODO not used yet
        api.personalProfileSummary().then((answer) => {
            if(answer.base) {
                commit(types.PERSONAL_APPLY_SHORT_PROFILE, {
                    fullname: answer.base.fullname,
                    company: answer.base.company.name,
                    avatar: answer.base.avatar['50'],
                });
            }
            /*
            if(answer.addresses) {
                commit(types.ADDRESS_APPLY_ADDRESSES, answer.addresses);
            }
            if(answer.orders) {
                commit(types.PERSONAL_APPLY_SHORT_ORDERS, answer.orders);
            }
            if(answer.contract) {
                commit(types.PERSONAL_APPLY_CONTRACT, answer.contract);
            }
            if(answer.dept) {
                commit(types.PERSONAL_APPLY_PAYMENT_LIMIT, answer.dept);
            }
            if(answer.pricing) {
                commit(types.PERSONAL_APPLY_PRICING_LEVEL, answer.pricing);
            }
            */
        });
    },
    personalUpdateProfile: ({commit, dispatch}) => {
        api.personalProfile().then((profile) => {
            commit(types.PERSONAL_APPLY_PROFILE, profile);
        });
    },

    personalUpdateOrders: ({commit}) => {
        api.personalOrders().then((answer) => {
            if(answer.orders) {
                commit(types.PERSONAL_APPLY_ORDERS, answer.orders);
            }
        });
    },
}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
};