import axios from 'axios';

if (window.runAction == undefined) {
    window.runAction = function (action, payload) {
        //debugger;
        if (payload.data){
            payload = payload.data; 
        }
        console.log('runAction call from site');
        return new Promise((resolve, reject) => {
            //debugger;
            let url = '/bitrix/services/main/ajax.php?action='+encodeURIComponent(action);
            let formData = new FormData();
            if (payload) {
                Object.keys(payload).forEach(function (key) {
                    //console.log(key, payload[key]);
                    formData.append(key, payload[key]);
                });
                //console.log('formData', formData, payload.id);
            } else {
                //console.log('formData', formData);
            }

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