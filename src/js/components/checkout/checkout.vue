<template>
    <section ref="checkout" class="checkout" v-if="loaded">
        <div class="columns">
            <div class="checkout__main" 
                :class="{'checkout__main--border-none': successFlag === 'success' || value !== 'new'}"
            >
                <h2 v-show='value === "experienced" && successFlag === "pay"' 
                    class="checkout__title"
                >{{ $tc('modal.title.auth') }}</h2>
                <h2 v-show='value === "new" && successFlag === "pay"' 
                    class="checkout__title"
                >{{ $tc('checkout.title') }}</h2>
                <div v-show="successFlag === 'pay' && user && !user.authorized || !user && successFlag === 'pay'" 
                    class="checkout-choice"
                >
                    <h3 class="checkout-choice__title">{{ $tc('checkout.title.contacts') }}</h3>
                    <form action="" class="checkout-choice__form">
                        <label class="checkout-choice__radio">
                            <input name="choice" type="radio" value="new" v-model="value">
                            <span class="checkout-choice__check"></span>
                            <span class="checkout-choice__radio-label">{{ $tc('checkout.client_new') }}</span>
                        </label>
                        <label class="checkout-choice__radio">
                            <input name="choice" type="radio" value="experienced" v-model="value">
                            <span class="checkout-choice__check"></span>
                            <span class="checkout-choice__radio-label">{{ $tc('checkout.client') }}</span>
                        </label>
                    </form>
                </div>
                <div v-show="successFlag === 'pay'" class="checkout__content">
                    <div v-show='value === "new"' class="checkout__desc">
                        <div class="checkout__tabs" v-if="user && !user.authorized || !user">
                            <div class="checkout__tab"
                                :class="{'checkout__tab--active': currentTab === 'individual'}"
                                @click="showTab('individual')"
                            >{{ $tc('title.person_individual') }}</div>
                            <div class="checkout__tab"
                                :class="{'checkout__tab--active': currentTab === 'corporate'}"
                                @click="showTab('corporate')"
                            >{{ $tc('title.person_corporate') }}</div>
                        </div>
                        <checkout-reg v-if="user && !user.authorized || !user"
                            :IndividualFlag="IndividualFlag"
                            :currentTab="currentTab"
                            :phoneMask="phoneMask"
                            :codeMask="codeMask"
                        ></checkout-reg>
                        <checkout-delivery
                            :currentTab="currentTab"
                            :deliveries="deliveries"
                            :deliveryPoints="deliveryPoints"
                            :addresses="addresses"
                            :user="user"
                            :cities="cities"
                            :streets="streets"
                        ></checkout-delivery>
                        <delivery-date v-model="date"></delivery-date>
                        <delivery-payment :payments="payments"></delivery-payment>
                        <div class="delivery-comment">
                            <h3 class="delivery-comment__title">{{ $tc('checkout.title.comments') }}</h3>
                            <div class="delivery-comment__form">
                                <label class="delivery-comment__label-textarea">
                                    <textarea class="delivery-comment__textarea" 
                                        v-model.trim="$v.message.$model"
                                    ></textarea>
                                    <span class="delivery-comment__label-text"
                                        :class="{'delivery-comment__label-text--up': $v.message.required}"
                                    >{{$tc('text.message')}}</span>
                                </label>
                                <label class="delivery-comment__label">
                                    <input type="checkbox" name="agreement" v-model="actionsAgreement" class="delivery-comment__checkbox">
                                    <span class="delivery-comment__checkbox-label">
                                        <svg class="delivery-comment__checkbox-svg" viewBox="0 0 10 8">
                                            <use xlink:href="/images/sprite.svg#icons__checked"></use>
                                            </svg>
                                        </span>
                                    <span class="delivery-comment__checkbox-text">{{ $tc('checkout.checkbox_text') }}</span>
                                </label>
                            </div>
                        </div>
                        <div class="checkout__btn-wrap">
                            <div class="checkout__btn"
                                @click="sendOrder"
                            >{{ $tc('button.go_payment') }}</div>
                        </div>
                        <div class="checkout__info">
                            {{ $tc('text.agreement') }}&nbsp; 
                            <a :href="conditionsLink" class="checkout__info-link"> {{ $tc('link.agreement') }}</a>&nbsp;
                            {{ $tc('text.more_info') }}&nbsp;
                            <a :href="deliveryLink" class="checkout__info-link">{{ $tc('link.more_info') }}</a>.
                        </div>
                    </div>
                    <div v-show='value === "experienced"' class="checkout__login">
                        <user-login></user-login>
                    </div>
                </div>
            </div>
            <div v-show="successFlag === 'pay' && value === 'new' && loaded"
                class="checkout__order checkout__order--tablet"
            >
                <cart-order :salePrice="salePrice"
                            :productsPrice="productsPrice"
                            :place="'checkout'"
                ></cart-order>
                <div class="checkout__btn-wrap checkout__btn-wrap--mobile"
                    :class="{'checkout__btn-wrap--fixed': fixedFlag}"
                >
                    <div class="checkout__btn"
                        @click="sendOrder"
                    >{{ $tc('button.go_payment') }}</div>
                </div>
            </div>
        </div>
    </section>
    <div v-else class="preloader">
        <svg viewBox="0 0 145 145">
            <use :xlink:href="templatePath + 'images/sprite.svg#preloader'"></use>
        </svg>
        <div class="preloader__loading preloader__loading--first"></div>
        <div class="preloader__loading preloader__loading--second"></div>
    </div>
</template>

<script>
    import cartOrder from '../cart/cart-order.vue'
    import UserLogin from '../header/header-modal/user-login.vue'
    import CheckoutDelivery from './checkout-delivery.vue'
    import CheckoutReg from './checkout-reg.vue'
    import DeliveryDate from './delivery-date.vue'
    import DeliveryPayment from './delivery-payment.vue'
    import config from "../../config";
    import {required} from "vuelidate/lib/validators"
    import * as Api from '../../api/index'

    let api = Api.getInstance();
    let base64 = require('base-64');

    export default {
        components: { cartOrder, UserLogin, CheckoutReg, CheckoutDelivery, DeliveryDate, DeliveryPayment },
        name: "checkout",
        validations: {
            message: {
                required,
            }
        },
        props: {
            deliveries: {
                required: true,
                type: Array
            },
            user: {
                default: {},
                type: Object
            },
            payments: {
                required: true,
                type: Array
            },
            deliveryPoints: {
                required: true,
                type: Array
            },
            cities: {
                required: true,
                type: Array
            },
            streets: {
                required: true,
                type: Array
            },
            salePrice:{
                type: Number,
                required: true,
            },
            phoneMask:{
                type: String,
                required: true,
            },
            codeMask:{
                type: String,
                required: true,
            },
            conditionsLink: {
                type: String,
                required: true
            },
            deliveryLink: {
                type: String,
                required: true
            },
        },
        data(){
            return {
                loaded: false,
                choiseFlag: true,
                value:'new',
                IndividualFlag: false,
                currentTab: "corporate",
                fixedFlag:false,
                successFlag:"pay",
                newAddressFlag: true,
                actionsAgreement: true,
                userData: {},
                personType: 2,
                message: '',
                currentDeliveryPoint: this.deliveries[0].type,
                currentDeliveryId: this.deliveries[0].id,
                currentDeliveryPayment: this.payments[0].id,
                date: '',
                pointAddress: this.deliveryPoints[0],
                deliveryAddress: '',
                deliveryNewAddress: {},
            }
        },
        computed: {
            addresses: {
                get: function() {
                    let selectAddresses = []
                    let newArr = this.$store.state.personal.addresses.slice()
                    newArr.map(address=>{
                        address.label = this.$tc('text.address') + ' №' + address.order + ': ' + address.address
                        address.value = address.order
                        selectAddresses.push(address)
                    })
                    return selectAddresses;
                },
                set: function() {
                    
                }
            },
            productsPrice() {
                return this.$store.state.basket.summury
            }
        },
        mounted() {
            this.$store.dispatch('basketOrderCalc');
            this.$store.dispatch('personalUpdateAddresses');
        },
        created(){
            window.addEventListener('scroll', this.mobileScroll)
            this.loading()
            this.$eventBus.$on('push-personal-data', this.buildPersonData)
            this.$eventBus.$on('push-delivery', this.buildDeliveryPoint)
            this.$eventBus.$on('push-payment', this.buildDeliveryPayment)
            this.$eventBus.$on('change-select-point', this.buildDeliveryAddress)
            this.$eventBus.$on('push-address', this.buildNewDeliveryAddress)
        },
        methods:{
            loading(){
                let vm = this
                setTimeout(function () {
                    vm.loaded = true
                }, 500)
            },
            buildPersonData(name,company,code,phone,newEmail){
                this.userData.name = name
                this.userData.company = company
                this.userData.code = code
                this.userData.phone = phone
                this.userData.newEmail = newEmail
            },
            buildDeliveryPoint(point, id){
                this.currentDeliveryPoint = point
                this.currentDeliveryId = id
            },
            buildDeliveryPayment(id){
                this.currentDeliveryPayment = id
            },
            buildDeliveryAddress(name, address){
                if(name === 'delivery-address'){
                    this.deliveryAddress = address
                } else if (name === 'receive-address') {
                    this.pointAddress = address
                }
            },
            buildNewDeliveryAddress(city,street,house,building,floor,apart) {
                this.deliveryNewAddress.city = city
                this.deliveryNewAddress.street = street
                this.deliveryNewAddress.house = house
                this.deliveryNewAddress.building = building
                this.deliveryNewAddress.floor = floor
                this.deliveryNewAddress.apart = apart
            },
            showTab(code) {
                if (this.currentTab !== code) {
                    this.currentTab = code;
                    this.IndividualFlag = code !== "corporate";
                }
                if (this.currentTab === 'corporate'){
                    this.personType = 2
                } else {
                    this.personType = 1
                }
            },
            mobileScroll(){
                if(window.innerWidth < 768) {
                    let windowPosition = window.pageYOffset + window.innerHeight
                    let checkoutPosition = this.$refs.checkout.offsetTop + this.$refs.checkout.offsetHeight - 64
                    this.fixedFlag = windowPosition < checkoutPosition;
                } else {
                    this.fixedFlag = false
                }
            },
            sendOrder() {
                let vm = this;
                
                if (vm.addresses.length && vm.deliveryAddress === '') {
                    vm.deliveryAddress = vm.addresses[0]
                }
                
                let userReg = {}
                let addressDelivery = ''
                if (vm.user && !vm.user.authorized || !vm.user) {
                    if (vm.personType === 1) {
                        if (vm.userData.name && vm.userData.phone && vm.userData.newEmail) {
                            if (vm.currentDeliveryPoint === 'delivery') {
                                if (vm.deliveryNewAddress.city && 
                                    vm.deliveryNewAddress.street && 
                                    vm.deliveryNewAddress.house
                                ) {
                                    userReg.is_company = false
                                    userReg.name = vm.userData.name
                                    userReg.email = vm.userData.newEmail
                                    userReg.phone = vm.userData.phone
                                    addressDelivery = vm.deliveryNewAddress
                                } else {
                                    vm.$eventBus.$emit('address-error')
                                    vm.$eventBus.$emit('autocomplete-error')
                                }
                            } else if (vm.currentDeliveryPoint === 'receive') {
                                userReg.is_company = false
                                userReg.name = vm.userData.name
                                userReg.email = vm.userData.newEmail
                                userReg.phone = vm.userData.phone
                                addressDelivery = vm.pointAddress.label
                            }
                        } else {
                            vm.$eventBus.$emit('register-error')
                        }
                    } else if (vm.personType === 2) {
                        if (vm.userData.name && vm.userData.company && vm.userData.code && vm.userData.phone && vm.userData.newEmail) {
                            if (vm.currentDeliveryPoint === 'delivery') {
                                if (vm.deliveryNewAddress.city &&
                                    vm.deliveryNewAddress.street &&
                                    vm.deliveryNewAddress.house
                                ) {
                                    userReg.is_company = true
                                    userReg.name = vm.userData.name
                                    userReg.company = vm.userData.company
                                    userReg.inn = vm.userData.code
                                    userReg.email = vm.userData.newEmail
                                    userReg.phone = vm.userData.phone
                                    addressDelivery = vm.deliveryNewAddress
                                } else {
                                    vm.$eventBus.$emit('address-error')
                                    vm.$eventBus.$emit('autocomplete-error')
                                }
                            } else if (vm.currentDeliveryPoint === 'receive') {
                                userReg.is_company = true
                                userReg.name = vm.userData.name
                                userReg.company = vm.userData.company
                                userReg.inn = vm.userData.code
                                userReg.email = vm.userData.newEmail
                                userReg.phone = vm.userData.phone
                                addressDelivery = vm.pointAddress.label
                            }
                        } else {
                            vm.$eventBus.$emit('register-error')
                        }
                    }
                } else if (vm.user && vm.user.authorized) {
                    if (vm.currentDeliveryPoint === 'receive') {
                        addressDelivery = vm.pointAddress.label
                    } else if (vm.currentDeliveryPoint === 'delivery') {
                        if (!vm.addresses.length) {
                            if (vm.deliveryNewAddress.city &&
                                vm.deliveryNewAddress.street &&
                                vm.deliveryNewAddress.house
                            ) {
                                addressDelivery = vm.deliveryNewAddress
                            } else {
                                vm.$eventBus.$emit('address-error')
                                vm.$eventBus.$emit('autocomplete-error')
                            }
                        } else if (vm.addresses.length) {
                            addressDelivery = vm.deliveryAddress.label
                        }
                    }
                }
                
                if (this.user && this.user.authorized && addressDelivery.length ||
                    this.user && this.user.authorized && Object.keys(addressDelivery).length ||
                    !this.user && Object.keys(userReg).length && Object.keys(addressDelivery).length ||
                    this.user && !this.user.authorized && Object.keys(userReg).length && Object.keys(addressDelivery).length
                ) {
                    api.orderValidate(
                        userReg, 
                        vm.currentDeliveryPayment, 
                        vm.currentDeliveryId, 
                        addressDelivery, 
                        vm.actionsAgreement, 
                        vm.message, 
                        vm.date
                    ).then(() => {
                        api.orderCreate(
                            userReg, 
                            vm.currentDeliveryPayment, 
                            vm.currentDeliveryId, 
                            addressDelivery, 
                            vm.actionsAgreement, 
                            vm.message, 
                            vm.date
                        ).then(answer => {
                            if (answer.order) {

                                if(answer.payment_form) {
                                    let elem = document.createElement('div');
                                    elem.style.cssText = 'position:absolute;left:0;top:0;z-index:-1000;opacity:0';
                                    elem.innerHTML = base64.decode(answer.payment_form);
                                    document.body.appendChild(elem);
                                    let form = elem.querySelector('form');
                                    if(form) {
                                        form.submit();
                                    } 
                                } else {
                                    window.location.replace(config.links.order_success + answer.order);
                                }
                            }
                        }).catch(errors => {
                            console.error('Cannot create order');
                            console.log(errors);
                        })
                    }).catch(errors => {
                        console.error('Cannot validate order');
                        console.log(errors);
                    })
                } else {
                    if (vm.user && !vm.user.authorized || !vm.user) {
                        vm.$eventBus.$emit('register-error')
                    }
                    if (vm.currentDeliveryPoint === 'delivery' && vm.user && !vm.addresses.length ||
                        vm.currentDeliveryPoint === 'delivery' && vm.user && !addressDelivery.length) {
                        vm.$eventBus.$emit('address-error')
                        vm.$eventBus.$emit('autocomplete-error')
                    }
                }
            }
        },
    }
</script>