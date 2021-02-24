import axios from 'axios';
import { date } from 'locutus/php/datetime';

if (window.runAction == undefined) {
    window.runAction = function (action, payload) {
        //debugger;
        console.log('runAction call from site');
        return new Promise((resolve, reject) => {
            //debugger;
            let url = '/bitrix/services/main/ajax.php?action='+encodeURIComponent(action);
            let formData = new HttpDataTransfer(payload.data).getFormData();

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
                    console.error('[BX.ajax error]', response.errors);
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
        if (typeof data === 'object')
        {
            Object.keys(data).forEach((index) => {
                this._collectFormData(formData, data[index], !name ? index : name + '['+index+']');
            });
        }
        else
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
                        console.error('[BX.ajax error]', response.errors);
                        reject([{code: 'bx_sys_error', message: 'Invalid response'}]);
                    }
                })
                .catch((response) => {
                    console.error('[BX.ajax error]', response.errors);
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
    /*personalProfileSummary() {
        return this._promiseBitrixRequest('instrument2:rest.api.user.get', {});
    }*/
    authSignIn(email, password) {
        return this._promiseBitrixRequest('instrument2:rest.api.auth.sign_in', {
            email: email,
            password: password
        });
    }
    authSignUp( type,name, company, tin, email, phone, nds) {
        return this._promiseBitrixRequest('instrument2:rest.api.auth.sign_up', {
            name: name,
            company: company,
            tin: tin,
            email: email,
            phone: phone,
            type: type,
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
    managerGet() {
        return this._promiseBitrixRequest('instrument2:rest.api.manager.get');
    }
    discountGet() {
        return this._promiseBitrixRequest('instrument2:rest.api.discount.get');
    }
    contractGet() {
        return this._promiseBitrixRequest('instrument2:rest.api.contract.get');
    }
    petitionsGet() {
        return this._promiseBitrixRequest('instrument2:rest.api.petitions.get');
    }
    changePassowrd(currentPass, newPass) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.change.password', {
            currentPass: currentPass,
            newPass: newPass,
        });
    }
    addAddress(address, message) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.address.add', {
            address: address,
            message: message,
        });
    }
    deleteAddress(reason, message, id) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.address.delete', {
            reason: reason,
            message: message,
            id: id,
        });
    }
    personalOrders() {
        return this._promiseBitrixRequest('instrument2:rest.api.user.order.list', {});
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
    sortOrders(params) {
        return this._promiseBitrixRequest('instrument2:rest.api.sortOrders.get', {
            params: params
        });
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
    orderValidate(data, agreement, message, date) {
        return this._promiseBitrixRequest('instrument2:rest.api.order.validate', {
            data: data,
            agreement: agreement,
            message: message,
            date: date,
        });
    }
    orderCreate(data, agreement, message, date) {
        return this._promiseBitrixRequest('instrument2:rest.api.order.create', {
            data: data,
            agreement: agreement,
            message: message,
            date: date,
        });
    }
    finedCity(query) {
        return this._promiseBitrixRequest('instrument2:rest.api.location.find.city', {
            query: query,
        });
    }
    finedStreet(query, id) {
        return this._promiseBitrixRequest('instrument2:rest.api.location.find.street', {
            query: query,
            id: id,
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
        return this._promiseBitrixRequest('instrument2:rest.api.cart.favorite', {
            id: id,
        });
    }
    addCompare(id) {
        return this._promiseBitrixRequest('instrument2:rest.api.cart.compare', {
            id: id,
        });
    }
}

let instance = new Api();

export function getInstance() {
    return instance;
}