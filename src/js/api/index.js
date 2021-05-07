import axios from 'axios';
import { date } from 'locutus/php/datetime';

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

class ApiRequest
{
    static runNoWait(action, payload)
    {
        return new Promise((resolve, reject) => {
            axios.post(
                '/bitrix/services/main/ajax.php?action='+encodeURIComponent(action),
                new HttpDataTransfer(payload.data).getFormData(), //=> object to FormData
                {
                    headers: 
                    {
                        "Content-Type": "application/x-www-form-urlencoded",
                    }
                }
            )
            .then((response) => {
                console.warn("[API.BX]", action, payload, response);
                resolve(response);
            })
            .catch((response) => {
                console.error('[BX.ajax error]', response, {action: action});
                reject([{code: 'bx_sys_error', message: ''}]);
            });

        });
    }
    
    constructor(action, payload) 
    {
        this.action = action;
        this.payload = payload;
        
        this.cacheble = false;
        this.ttl = 86400; //seconds
    }
    
    setCacheble(cacheble)
    {
        this.cacheble = cacheble;
    }
    
    setTtl(seconds)
    {
        this.ttl = seconds;
    }
    
    getCacheKey()
    {
        return "BXREST_"+this.action;
    }
    
    cacheAvailable()
    {
        try
        {
            let item = this.readCache();
            if(item.ttl < Date.now()) return false;
            return true;
        }
        catch (e) 
        {
            return false;
        }     
    }
    
    readCache()
    {
        return JSON.parse(localStorage.getItem(this.getCacheKey()));
    }
    
    writeCache(data)
    {
        localStorage.setItem(
            this.getCacheKey(), 
            JSON.stringify({
                data: data, 
                ttl: Date.now() + this.ttl * 1000}
            )
        )
    }
    
    resolve(response)
    {
        this.p_resolve(response.data.answer)
    }
    
    reject(response, action)
    {
        console.error('[BX.ajax error]', response, {action: this.action});
        this.p_reject([{code: 'bx_sys_error', message: response.data.errors.message}]);
    }
    
    is_success(response)
    {
        if(!response.data || response.data.status === 0) return false;
        if(response.data.errors && response.data.errors.length) return false;
        return true;
    }
    
    parse_answer(response)
    {
        if(this.is_success(response))
        {
            if(this.cacheble) this.writeCache(response.data.answer);
            this.resolve(response);
        }
        else
        {
            this.reject(response);   
        }
    }
    
    process() 
    {
        return new Promise((resolve, reject) => {
            this.p_resolve = resolve;
            this.p_reject = reject;
            
            if(this.cacheble && this.cacheAvailable()) return resolve(this.readCache().data);
            
            if(!ApiRequest.method) return reject({code: 'gateway_error', message: 'Api router not found'})

            ApiRequest.method(this.action, {data: this.payload})
                .then((response) => this.parse_answer(response.data))
                .catch((response) => this.reject(response))
        });
    }
}

if(window.apiRouter)
{
    ApiRequest.method = window.apiRouter;
}
else
{
    ApiRequest.method = ApiRequest.runNoWait;
}

class Api {

    _promiseBitrixRequest(action, payload, cacheable = false) {
        let request = new ApiRequest(action, payload);
        request.setCacheble(cacheable);
        if(parseInt(cacheable)) 
            request.setTtl(cacheable);
        
        return request.process();
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
    OrderCalc(payment_id, delivery_id, city) {
        return this._promiseBitrixRequest('instrument2:rest.api.order.calc', {
            payment_id: payment_id,
            delivery_id: delivery_id,
            city: city
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
    personalOrderRepaet(id) {
        return this._promiseBitrixRequest('instrument2:rest.api.user.order.repeat', {
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
    finedStreet(query, cityId) {
        return this._promiseBitrixRequest('instrument2:rest.api.location.find.street', {
            query: query,
            city_id: cityId
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
    // filterCompare() {
    //     return this._promiseBitrixRequest('instrument2:rest.api.compare.filter',);
    // }
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
    
    loadLangData()
    {
        return this._promiseBitrixRequest('instrument2:rest.api.lang.all', {}, true);
    }
}

let instance = new Api();

export function getInstance() {
    return instance;
}