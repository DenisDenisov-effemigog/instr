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
            <div class="checkout__contnet">
                <div v-show='value == "new"' class="checkout__option-one">
                    Вариант 1
                </div>
                <div v-show='value == "experienced"' class="checkout__option-two">
                    Вариант 2
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

    export default {
    components: { cartOrder },
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