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
                        <input name="choice" type="radio" value="experienced"  v-model="value">
                        <span class="checkout-choice__check"></span>
                        <span class="checkout-choice__radio-label">Я уже заказывал ранее и у меня есть учетная запись</span>
                    </label>
                </form>
            </div>
            <div class="checkout__content">
                <div v-show='value == "new"' class="checkout__desc">
                    <checkout-reg></checkout-reg>
                </div>
                <div v-show='value == "experienced"' class="checkout__login">
                   <user-login></user-login>
                </div>
            </div>
        </div>
        <div class="checkout__order">
            <cart-order></cart-order>
        </div>
    </div>
</template>

<script>
    import cartOrder from '../cart/cart-order.vue'
    import UserLogin from '../header/header-modal/user-login.vue'
import CheckoutReg from './checkout-reg.vue'

    export default {
    components: { cartOrder, UserLogin, CheckoutReg },
        name: "checkout",
        data(){
            return {
                choiseFlag: true,
                value:'new'
            }
        },
        methods:{
        },
    }
</script>