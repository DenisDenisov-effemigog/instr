<template>
    <div ref="checkout" class="checkout">
        <div class="checkout__main" 
             :class="{'checkout__main--border-none': successFlag === 'success' || value !== 'new'}"
        >
            <h2 v-show="successFlag === 'success'" 
                class="checkout__title"
            >{{ $tc('checkout.title.success') }}</h2>
            <div v-show="successFlag === 'success'" 
                 class="checkout-success"
            >
                <div v-if="newAddressFlag" class="checkout-success__text">{{ $tc('checkout.text.success_new_address') }}</div>
                <div v-else class="checkout-success__text">{{ $tc('checkout.text.success') }}</div>
                <div class="checkout-success__number">
                    <span class="checkout-success__number-text">{{ $tc('checkout.title.order_number') }}:</span>
                    <span>123456789009876</span><!--TODO из базы-->
                </div>
                <div class="checkout-success__date">
                    <span class="checkout-success__date-title">{{ $tc('checkout.title.order_date') }}:</span>
                    <span>12.10.2020</span><!--TODO из базы-->
                </div>
                <div class="checkout-success__btn"
                    @click="successFlag='pay'"
                >{{ $tc('button.go_catalog') }}</div>
            </div>
            <h2 v-show='value === "experienced" && successFlag === "pay"' 
                class="checkout__title"
            >{{ $tc('modal.title.auth') }}</h2>
            <h2 v-show='value === "new" && successFlag === "pay"' 
                class="checkout__title"
            >{{ $tc('checkout.title') }}</h2>
            <div v-show="successFlag === 'pay' && !user.authorized" 
                 class="checkout-choice"
            >
                <div class="checkout-choice__title">{{ $tc('checkout.title.contacts') }}</div>
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
                     <div class="checkout__tabs">
                        <div class="checkout__tab"
                            :class="{'checkout__tab--active': currentTab === 'individual'}"
                            @click="showTab('individual')"
                        >{{ $tc('title.person_individual') }}</div>
                        <div class="checkout__tab"
                            :class="{'checkout__tab--active': currentTab === 'corporate'}"
                            @click="showTab('corporate')"
                        >{{ $tc('title.person_corporate') }}</div>
                    </div>
                    <checkout-reg
                        :IndividualFlag="IndividualFlag"
                        :currentTab="currentTab"
                    ></checkout-reg>
                    <checkout-delivery
                        :currentTab="currentTab"
                        :deliveries="deliveries"
                        :deliveryPoints="deliveryPoints"
                    ></checkout-delivery>
                    <delivery-date></delivery-date>
                    <delivery-payment :payments="payments"></delivery-payment>
<!--                    <delivery-comment></delivery-comment>-->
                    <div class="delivery-comment">
                        <div class="delivery-comment__title">{{ $tc('checkout.title.comments') }}</div>
                        <div class="delivery-comment__form">
                            <label class="delivery-comment__label-textarea">
                                <textarea class="delivery-comment__textarea" 
                                          :placeholder="$tc('text.message')"
                                          v-model="message"
                                ></textarea>
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
                        <a href="#" class="checkout__info-link"> {{ $tc('link.agreement') }}</a>&nbsp;
                        {{ $tc('text.more_info') }}&nbsp;
                        <a href="#" class="checkout__info-link">{{ $tc('link.more_info') }}</a>.
                    </div>
                </div>
                <div v-show='value === "experienced"' class="checkout__login">
                   <user-login></user-login>
                </div>
            </div>
        </div>
        <div v-show="successFlag === 'pay' && value === 'new'" class="checkout__order">
            <cart-order :productsPrice="productsPrice" :place="'checkout'"></cart-order>
            <div class="checkout__btn-wrap checkout__btn-wrap--mobile"
                :class="{'checkout__btn-wrap--fixed': fixedFlag}"
            >
                <div class="checkout__btn"
                    @click="sendOrder"
                >{{ $tc('button.go_payment') }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import cartOrder from '../cart/cart-order.vue'
    import UserLogin from '../header/header-modal/user-login.vue'
    import CheckoutDelivery from './checkout-delivery.vue'
    import CheckoutReg from './checkout-reg.vue'
    import DeliveryComment from './delivery-comment.vue'
    import DeliveryDate from './delivery-date.vue'
    import DeliveryPayment from './delivery-payment.vue'
    import * as Api from '../../api/index'

    let api = Api.getInstance();

    export default {
        components: { cartOrder, UserLogin, CheckoutReg, CheckoutDelivery, DeliveryDate, DeliveryPayment, DeliveryComment },
        name: "checkout",
        props: {
            deliveries: {
                required: true,
                type: Array
            },
            user: {
                required: true,
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
        },
        data(){
            return {
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
                currentDeliveryPayment: this.payments[0].value
            }
        },
        computed: {
            productsPrice() {
                const basketData = this.$store.getters.basketProductsSummary;
                return parseFloat((basketData.price).toFixed(3));
            },
        },
        mounted() {
            this.$store.dispatch('personalUpdateAddresses');
        },
        created(){
            window.addEventListener('scroll', this.mobileScroll)
            this.$eventBus.$on('push-personal-data', this.buildPersonData)
            this.$eventBus.$on('push-delivery', this.buildDeliveryPoint)
            this.$eventBus.$on('push-payment', this.buildDeliveryPayment)
        },
        methods:{
            buildPersonData(name,company,code,phone,newEmail){
                this.userData.name = name
                this.userData.company = company
                this.userData.code = code
                this.userData.phone = phone
                this.userData.newEmail = newEmail
                console.log(this.userData)
            },
            buildDeliveryPoint(point){
                this.currentDeliveryPoint = point
            },
            buildDeliveryPayment(type){
                this.currentDeliveryPayment = type
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
                /*vm.personType, vm.userData, vm.currentDeliveryPoint, vm.currentDeliveryPayment, vm.actionsAgreement, vm.message*/
                
                if(vm.userData.name && 
                    vm.userData.company && 
                    vm.userData.code && 
                    vm.userData.phone && 
                    vm.userData.newEmail) {
                    api.orderValidate(1, 2, 3).then(() => {
                        api.orderCreate(1, 2, 3).then(answer => {
                            if (answer.order) {

                                /*if(answer.payment_form) {
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
                                }*/
                            }
                        }).catch(errors => {
                            console.error('Cannot create order');
                            console.log(errors);
                        })
                    }).catch(errors => {
                        console.error('Cannot validate order');
                        console.log(errors);
                    })
                    vm.successFlag='success'
                } else {
                    console.log('!!! Заполнены не все поля !!!')
                }
            }
        },
    }
</script>