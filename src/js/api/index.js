import axios from 'axios';

class Api {
    _promiseBitrixRequest(action, payload) {
        //debugger;
        
        return new Promise((resolve, reject) => {
            //debugger;
            let url = '/bitrix/services/main/ajax.php?action='+encodeURIComponent(action);
            let formData = new FormData();
            Object.keys(payload).forEach(function (key){
                //console.log(key, payload[key]);
                formData.append(key, payload[key]);
            });
            
            console.log('formData', formData, payload.id);
                
            axios.post(url, formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
                .then((response) => {
                    console.log('[response]', response);
                    if (response && response.data) {
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
    _promiseBitrixRequest66(action, payload) {
        debugger;
        return new Promise((resolve, reject) => {
            debugger;
            window.BX.ajax.runAction(action, {
                data: payload
            })
                .then((response) => {
                    if (response && response.data) {
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
    
    setBasketQuantity(productId, quantity) {
        return this._promiseBitrixRequest(quantity === 0 ? 'instrum:main.api.basket.delete' :'instrum:main.api.basket.update', {
            id: productId,
            quantity: quantity
        });
    }
}

let instance = new Api();

export function getInstance() {
    return instance;
}