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
    financeData: [],
    orders: [],
    addresses: [],

    country: '',
    
    manager: '',
    discount: '',
    contract: '',
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
    [types.PERSONAL_APPLY_FINANCE](state, financeData) {
        console.log('mut fin', financeData);
        state.financeData = financeData;
    },
    [types.PERSONAL_ADDRESSES](state, addresses) {
        console.log('mut', addresses);
        state.addresses = addresses;
    },
    [types.PERSONAL_APPLY_COUNTRY](state, newMode) {
        state.country = newMode;
    },
    [types.PERSONAL_APPLY_MANAGER](state, newMode) {
        state.manager = newMode;
    },
    [types.PERSONAL_APPLY_DISCOUNT](state, newMode) {
        state.discount = newMode;
    },
    [types.PERSONAL_APPLY_CONTRACT](state, newMode) {
        state.contract = newMode;
    }
};

const actions = {
    personalUpdateProfile: ({commit, dispatch}) => {
        api.personalProfile().then((profile) => {
            commit(types.PERSONAL_APPLY_PROFILE, profile);
        });
    },
    personalGetManager: ({commit, dispatch}) => {
        api.managerGet().then((profile) => {
            commit(types.PERSONAL_APPLY_MANAGER, profile);
        });
    },
    personalGetDiscount: ({commit, dispatch}) => {
        api.discountGet().then((profile) => {
            commit(types.PERSONAL_APPLY_DISCOUNT, profile);
        });
    },
    personalGetContract: ({commit, dispatch}) => {
        api.contractGet().then((profile) => {
            commit(types.PERSONAL_APPLY_CONTRACT, profile);
        });
    },
    personalUpdateOrders: ({commit}) => {
        api.personalOrders().then((answer) => {
            if(answer.orders) {
                commit(types.PERSONAL_APPLY_ORDERS, answer.orders);
            }
        });
    },
    personalSortOrders: ({commit}, status) => {
        api.sortOrders(status).then((answer) => {
            commit(types.PERSONAL_APPLY_ORDERS, answer);
        });
    },
    personalUpdateFinanceData: ({commit}) => {
        api.personalFinance().then((answer) => {
            if(answer.financeData) {
                commit(types.PERSONAL_APPLY_FINANCE, answer.financeData);
            }
        });
    },
    personalUpdateAddresses: ({commit}) => {
        api.personalAddressList().then((addresses) => {
            //debugger;
            //if(answer.addresses) {
                commit(types.PERSONAL_ADDRESSES, addresses);
            //}
        });
    },
    countrySetActive({commit}, newMode) {
        commit(types.PERSONAL_APPLY_COUNTRY, newMode);
    }
}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
};