import axios from 'axios';
import { date } from 'locutus/php/datetime';

if (window.runAction == undefined) {
    window.runAction = function (action, payload) {
        //debugger;
        console.log('runAction call from site', action, payload);
        return new Promise((resolve, reject) => {
            //debugger;
            let url = '/bitrix/services/main/ajax.php?action='+encodeURIComponent(action);
            let formData = new HttpDataTransfer(payload.data).getFormData();
            console.log('execAction', action, url, formData);
            axios.post(url, formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
                .then((response) => {
                    //debugger;
                    resolve(response);
                })
                .catch((response) => {
                    console.error('[BX.ajax error]', response, {action: action});
                    reject([{code: 'bx_sys_error', message: ''}]);
                });
        });
    };
}

/**
 *      let params = {outer: {inner: "value"}};
 *      let formData = new HttpDataTransfer(params).getFormData();
 *      formData // => FormData({"outer[inner]" : "value"})
 */
class HttpDataTransfer
{
    constructor(params)
    {
        this.params = params;
    }

    _collectFormData(formData, data, name = '')
    {
        if (typeof data === 'object' && data !== undefined && data !== null)
        {
            Object.keys(data).forEach((index) => {
                this._collectFormData(formData, data[index], !name ? index : name + '['+index+']');
            });
        }
        else if(data !== undefined && data !== null)
        {
            formData.append(name, data);
        }
    }

    getFormData()
    {
        let formData = new FormData();
        this._collectFormData(formData, this.params);
        return formData;
    }
}

class Api {

    _promiseBitrixRequest(action, payload) {
        //debugger;
        return new Promise((resolve, reject) => {
            //debugger;
            runAction(action, {
                data: payload
            })
                .then((response) => {
                    // debugger;
                    console.log('[response]', response);
                    if (response && response.data) {
                        response = response.data;
                        if (response.data.status === 0) {
                            reject(response.data.errors)
                        } else if (response.data.status === 1) {
                            resolve(response.data.answer);
                        }
                    } else {
                        console.error('[BX.ajax error]', response, {action: action});
                        reject([{code: 'bx_sys_error', message: 'Invalid response'}]);
                    }
                })
                .catch((response) => {
                    console.error('[BX.ajax error]', response, {action: action});
                    reject([{code: 'bx_sys_error', message: ''}]);
                });
        });
    }
    getBasket() {
        return this._promiseBitrixRequest('instrument2:rest.api.basket.get');
    }
    getOldBasket() {
        return this._promiseBitrixRequest('instrument2:rest.api.basket.get_old');
    }
    setBasketQuantity(productId, quantity) {
        return this._promiseBitrixRequest(quantity === 0 ? 'instrument2:rest.api.basket.delete' :'instrument2:rest.api.basket.update', {
            id: productId,
            quantity: quantity
        });
    }
    clearBasket() {
        return this._promiseBitrixRequest('instrument2:rest.api.basket.clear');
    }
    searchItem(arr) {
        return this._promiseBitrixRequest('instrument2:rest.api.basket.searchItem',
            {arr: arr}
        );
    }
    combineCarts(arr) {
        return this._promiseBitrixRequest('instrument2:rest.api.basket.combineCarts',
            {arr: arr}
        );
    }
    OrderCalc(payment_id, delivery_id) {
        return this._promiseBitrixRequest('instrument2:rest.api.order.calc', {
            payment_id: payment_id,
            delivery_id: delivery_id
        });
    }
    authSignIn(email, password) {
        return this._promiseBitrixRequest('instrument2:rest.api.auth.sign_in', {
            email: email,
            password: password
        });
    }
    authOut() {
        return this._promiseBitrixRequest('instrument2:rest.api.auth.out', {
            
        });
    }
    authSignUp(is_company, name, company, inn, email, phone, nds) {
        return this._promiseBitrixRequest('instrument2:rest.api.auth.sign_up', {
            name: name,
            company: company,
            inn: inn,
            email: email,
            phone: phone,
            is_company: is_company,
            nds: nds,
        });
    }
    personalProfile() {
        return this._promiseBitrixRequest('instrument2:rest.api.user.base.get', {});
    }
    editProfile(name, phone, email) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.base.edit', {
            name: name,
            phone: phone,
            email: email,
        });
    }
    deleteProfile(reason, message) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.base.delete', {
            reason: reason,
            message: message,
        });
    }
    userDashboard() {
        return this._promiseBitrixRequest('instrument2:rest.api.user.dashboard');
    }
    discountGet() {
        return this._promiseBitrixRequest('instrument2:rest.api.user.discount.list');
    }
    changePassword(password, confirmPassword) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.base.change_password', {
            password: password,
            confirmPassword: confirmPassword,
        });
    }
    addAddress(address, message) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.address.add', {
            address: address,
            message: message,
        });
    }
    deleteAddress(reason, message, id, value) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.address.delete', {
            reason: reason,
            message: message,
            id: id,
            address: value
        });
    }
    personalOrders(status, page) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.order.list', {
            status: status,
            page: page
        });
    }
    personalOrder(id) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.order.get', {
            id: id
        });
    }
    personalFinance() {
        return this._promiseBitrixRequest('instrument2:rest.api.user.finance.list', {});
    }
    personalAddressList() {
        return this._promiseBitrixRequest('instrument2:rest.api.user.address.get', {});
    }
    addFeedToList(title, date, filter1, filter2, brand1, brand2) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.feeds.add', {
            title: title,
            date: date,
            updateDate: date,
            filter1: filter1,
            filter2: filter2,
            brand1: brand1,
            brand2: brand2
        });
    }
    editFeedInList(id) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.feeds.edit', {
            id: id
        });
    }
    deleteFeedFromList(id) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.feeds.delete', {
            id: id
        });
    }
    personalFeedsList() {
        return this._promiseBitrixRequest('instrument2:rest.api.user.feeds.get', {});
    }
    catalogGet(hash, params) {
        return this._promiseBitrixRequest('instrument2:rest.api.catalog.get', {
            hash: hash,
            params: params
        });
    }
    catalogUpdate(hash, params) {
        return this._promiseBitrixRequest('instrument2:rest.api.catalog.update', {
            hash: hash,
            params: params
        });
    }
    listingFilter(hash, filters) {
        return this._promiseBitrixRequest('instrument2:rest.api.catalog.filter', {
            hash: hash,
            filters: filters,
        });
    }
    goToPage (hash, page) {
        return this._promiseBitrixRequest('instrument2:rest.api.catalog.next', {
            hash: hash,
            page: page,
        });
    }
    orderValidate(user, payment_id, delivery_id, address, agreement, message, delivery_date) {
        return this._promiseBitrixRequest('instrument2:rest.api.order.validate', {
            user: user,
            payment_id: payment_id,
            delivery_id: delivery_id,
            address: address,
            agreement: agreement,
            message: message,
            delivery_date: delivery_date,
        });
    }
    orderCreate(user, payment_id, delivery_id, address, agreement, message, delivery_date) {
        return this._promiseBitrixRequest('instrument2:rest.api.order.create', {
            user: user,
            payment_id: payment_id,
            delivery_id: delivery_id,
            address: address,
            agreement: agreement,
            message: message,
            delivery_date: delivery_date,
        });
    }
    finedCity(query) {
        return this._promiseBitrixRequest('instrument2:rest.api.location.find.city', {
            query: query,
        });
    }
    finedStreet(query) {
        return this._promiseBitrixRequest('instrument2:rest.api.location.find.street', {
            query: query
        });
    }
    sendQuestion(productId, email, message) {
        return this._promiseBitrixRequest('instrument2:rest.api.cart.faq', {
            productId: productId,
            message: message,
            email: email,
        });
    }
    addFavorite(id) {
        return this._promiseBitrixRequest('instrument2:rest.api.favorite.toggle', {
            id: id,
        });
    }
    getFavorites() {
        return this._promiseBitrixRequest('instrument2:rest.api.favorite.get');
    }
    clearFavorites() {
        return this._promiseBitrixRequest('instrument2:rest.api.favorite.clear');
    }
    addCompare(productId) {
        return this._promiseBitrixRequest('instrument2:rest.api.compare.toggle', {
            id: productId,
        });
    }
    getCompare() {
        return this._promiseBitrixRequest('instrument2:rest.api.compare.get');
    }
    filterCompare() {
        return this._promiseBitrixRequest('instrument2:rest.api.compare.filter',);
    }
    clearCompare() {
        return this._promiseBitrixRequest('instrument2:rest.api.compare.clear');
    }

    searchGetHistory() {
        return this._promiseBitrixRequest('instrument2:rest.api.search.history',);
    }

    searchClearHistory() {
        return this._promiseBitrixRequest('instrument2:rest.api.search.clear',);
    }

    startSearch(value) {
        return this._promiseBitrixRequest('instrument2:rest.api.search.query', {
            value: value
        });
    }
}

let instance = new Api();

export function getInstance() {
    return instance;
}