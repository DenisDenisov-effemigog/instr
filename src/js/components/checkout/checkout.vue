<template>
    <div class="checkout">
        <div class="container">
            <div class="checkout__page">
                <h2 class="checkout__title">{{title}}</h2>
                <div class="checkout__choice">
                    <form action="" class="checkout__choice-form">
                        <label for="" class="checkout__choice-label">
                            <input type="radio" value="new">
                            <span class="checkout__choice-check"></span>
                            <span class="checkout__choice-text">Я новый клиент</span>
                        </label>
                        <label for="" class="checkout__choice-label">
                            <input type="radio" value="experienced">
                            <span class="checkout__choice-check"></span>
                            <span class="checkout__choice-text">Я уже заказывал ранее и у меня есть учетная запись</span>
                        </label>
                    </form>
                </div>
                <div class="checkout__contnet">
                    <div class="checkout__option-one">
                        Вариант 1
                    </div>
                    <div class="checkout__option-two">
                        Вариант 2
                    </div>
                </div>
            </div>
            <div class="checkout__order">
                <cart-order></cart-order>
            </div>
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
                title:"Оформление заказа"
            }
        },
        methods:{
        },
    }
</script>