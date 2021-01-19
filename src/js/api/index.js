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
        return this._promiseBitrixRequest('instrum:main.api.basket.get');
    }
    setBasketQuantity(productId, quantity) {
        return this._promiseBitrixRequest(quantity === 0 ? 'instrum:main.api.basket.delete' :'instrum:main.api.basket.update', {
            id: productId,
            quantity: quantity
        });
    }
    /*personalProfileSummary() {
        return this._promiseBitrixRequest('instrum:main.api.user.get', {});
    }*/
    personalProfile() {
        return this._promiseBitrixRequest('instrum:main.api.user.base.get', {});
    }
    personalOrders() {
        return this._promiseBitrixRequest('instrum:main.api.user.order.list', {});
    }
    personalOrder(id) {
        return this._promiseBitrixRequest('instrum:main.api.user.order.get', {
            id: id
        });
    }
    personalChecks() {
        return this._promiseBitrixRequest('instrum:main.api.user.checks.list', {});
    }
    personalAddressList() {
        return this._promiseBitrixRequest('instrum:main.api.user.address.get', {});
    }
    getMoreListing() {
        return this._promiseBitrixRequest('instrum:main.api.listing.get');
    }

    sortListing(params) {
        return this._promiseBitrixRequest('instrum:main.api.sortListing.get', {
            params: params
        });
    }

    filteredListing(hash, params) {
        return this._promiseBitrixRequest('instrum:main.api.filteredListing.get', {
            hash: hash,
            params: params
        });
    }

    listingFilter(filtersPayload) {
        return this._promiseBitrixRequest('instrum:main.api.catalog.filter', filtersPayload);
    }
    
}

let instance = new Api();

export function getInstance() {
    return instance;
}