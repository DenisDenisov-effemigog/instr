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
    feeds: [],
    
    manager: '',
    discount: '',
    contract: '',
    currentOrders: [],
    petitions: '',
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
        state.financeData = financeData;
    },
    [types.PERSONAL_ADDRESSES](state, addresses) {
        state.addresses = addresses;
    },
    [types.PERSONAL_APPLY_MANAGER](state, newMode) {
        state.manager = newMode;
    },
    [types.PERSONAL_APPLY_DISCOUNT](state, newMode) {
        state.discount = newMode;
    },
    [types.PERSONAL_APPLY_CONTRACT](state, newMode) {
        state.contract = newMode;
    },
    [types.PERSONAL_APPLY_CURRENTORDERS](state, newMode) {
        state.currentOrders = newMode;
    },
    [types.PERSONAL_APPLY_PETITIONS](state, newMode) {
        state.petitions = newMode;
    },
    [types.PERSONAL_APPLY_FEEDS](state, feeds) {
        state.feeds = feeds;
    }
};

const actions = {
    personalUpdateProfile: ({commit, dispatch}) => {
        api.personalProfile().then((profile) => {
            commit(types.PERSONAL_APPLY_PROFILE, profile);
        });
    },
    personalDashboard: ({commit, dispatch}) => {
        api.userDashboard().then((profile) => {
            commit(types.PERSONAL_APPLY_MANAGER, profile.manager);
            commit(types.PERSONAL_APPLY_CONTRACT, profile.contract);
            commit(types.PERSONAL_APPLY_PETITIONS, profile.petitions);
            commit(types.PERSONAL_APPLY_CURRENTORDERS, profile.order);
            commit(types.PERSONAL_APPLY_FINANCE, profile.finance);
            commit(types.PERSONAL_APPLY_DISCOUNT, profile.discounts);
        });
    },
    personalContract: ({commit, dispatch}) => {
        api.userDashboard().then((profile) => {
            commit(types.PERSONAL_APPLY_CONTRACT, profile.contract);
        });
    },
    personalGetDiscount: ({commit, dispatch}) => {
        api.discountGet().then((profile) => {
            commit(types.PERSONAL_APPLY_DISCOUNT, profile);
        });
    },
    personalUpdateOrders: ({commit}, data) => {
        let status = null;
        let page = null
        if (!!data) {
            status = data.status;
            page = data.page
        }
        api.personalOrders(status, page).then((answer) => {
            commit(types.PERSONAL_APPLY_ORDERS, answer);
        }).catch(errors => {
            console.log(errors);
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
    personalUpdateFeeds: ({commit}) => {
        api.personalFeedsList().then((feeds) => {
            commit(types.PERSONAL_APPLY_FEEDS, feeds);
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