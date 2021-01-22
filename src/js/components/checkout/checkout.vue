<template>
    <div class="checkout">
        <div class="checkout__main">
            <h2 v-show='value == "experienced"' class="checkout__title">Авторизация</h2>
            <h2 v-show='value == "new"' class="checkout__title">Оформление заказа</h2>
            <div class="checkout-choice">
                <div class="checkout-choice__title">Контактная информация</div>
                <form action="" class="checkout-choice__form">
                    <label name="choice" class="checkout-choice__radio">
                        <input name="choice" type="radio" value="new" v-model="value">
                        <span class="checkout-choice__check"></span>
                        <span class="checkout-choice__radio-label">Я новый клиент</span>
                    </label>
                    <label name="choice" class="checkout-choice__radio">
                        <input name="choice" type="radio" value="experienced" v-model="value">
                        <span class="checkout-choice__check"></span>
                        <span class="checkout-choice__radio-label">Я уже заказывал ранее и у меня есть учетная запись</span>
                    </label>
                </form>
            </div>
            <div class="checkout__content">
                <div v-show='value == "new"' class="checkout__desc">
                     <div class="checkout__tabs">
                        <div class="checkout__tab"
                            :class="{'checkout__tab--active': currentTab == 'individual'}"
                            @click="showTab('individual')"
                        >Физическое лицо</div>
                        <div class="checkout__tab"
                            :class="{'checkout__tab--active': currentTab == 'corporate'}"
                            @click="showTab('corporate')"
                        >Юридическое лицо</div>
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
                </div>
                <div v-show='value == "experienced"' class="checkout__login">
                   <user-login></user-login>
                </div>
            </div>
        </div>
        <div class="checkout__order">
            <cart-order :productsPrice="productsPrice" :place="'checkout'"></cart-order>
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
            }
        },
        computed: {
            productsPrice() {
                const basketData = this.$store.getters.basketProductsSummary;
                return parseFloat((basketData.price).toFixed(3));
            },
        },
        methods:{
            showTab(code) {
                if (this.currentTab !== code) {
                    this.currentTab = code;
                    if(code == "corporate"){
                        this.IndividualFlag = false
                    }else{
                        this.IndividualFlag = true
                    }
                }
            },
        },
    }
</script>