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
                <div class="checkout-success__text">{{ $tc('checkout.text.success') }}</div><!--TODO добавить вариант текста, если новый адрес не добавляли-->
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
            <div v-show="successFlag === 'pay'" 
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
            <div  v-show="successFlag === 'pay'" class="checkout__content">
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
                    ></checkout-delivery>
                    <delivery-date></delivery-date>
                    <delivery-payment></delivery-payment>
                    <delivery-comment></delivery-comment>
                    <div class="checkout__btn-wrap">
                        <div class="checkout__btn"
                            @click="successFlag='success'"
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
                    @click="successFlag='success'"
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

    export default {
        components: { cartOrder, UserLogin, CheckoutReg, CheckoutDelivery, DeliveryDate, DeliveryPayment, DeliveryComment },
        name: "checkout",
        data(){
            return {
                choiseFlag: true,
                value:'new',
                IndividualFlag: false,
                currentTab: "corporate",
                fixedFlag:false,
                successFlag:"pay"
            }
        },
        computed: {
            productsPrice() {
                const basketData = this.$store.getters.basketProductsSummary;
                return parseFloat((basketData.price).toFixed(3));
            },
        },
        created(){
            window.addEventListener('scroll', this.mobileScroll)
        },
        
        methods:{
            showTab(code) {
                if (this.currentTab !== code) {
                    this.currentTab = code;
                    if(code === "corporate"){
                        this.IndividualFlag = false
                    }else{
                        this.IndividualFlag = true
                    }
                }
            },
            mobileScroll(){
                if(window.innerWidth < 768) {
                    let windowPosition = window.pageYOffset + window.innerHeight
                    let checkoutPosition = this.$refs.checkout.offsetTop + this.$refs.checkout.offsetHeight - 64
                    console.log('windowPosition ' + windowPosition)
                    console.log('checkoutPosition ' + checkoutPosition)
                    if(windowPosition < checkoutPosition){
                        this.fixedFlag = true
                    }else{
                        this.fixedFlag = false
                    }
                } else {
                    this.fixedFlag = false
                }
            }
        },
    }
</script>