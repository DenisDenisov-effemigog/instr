<template>
    <section class="cart">
        <div class="cart__content" v-if="empty">
            <div class="cart__purchases-wrapper">
                <div class="cart__header">
                    <div class="cart__title">Корзина пуста</div>
                </div>
            </div>
        </div>
        <div class="cart__content" v-else>
            <div class="cart__purchases-wrapper">
                <div class="cart__border-right">
                    <div class="cart__header">
                        <div class="cart__title">Корзина</div>
                        <div class="cart__header-layout">
                            <div class="cart__view-switcher">
                                <label name="mode" class="cart__view-switch">
                                    <input
                                        class="cart__view-switch-input"
                                        type="checkbox"
                                        name="mode">
                                    <span class="cart__view-switch-slider"></span>
                                    <span class="cart__view-switch-label">Табличный&nbsp;режим</span>
                                </label>
                            </div>
                            <div class="cart__clear-btn">
                                <svg>
                                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                                </svg>
                                Очистить корзину
                            </div>
                        </div>
                    </div>
                    <cart-order-head 
                        :mobileFlag="true"
                        :currentPrice=6920
                    ></cart-order-head>
                    <div class="cart__purchases">
                        Карточки товаров для корзины
                    </div>
                </div>
            </div>
            <div class="cart__sidebar-wrapper">
                <div class="cart__sidebar">
                    <cart-order></cart-order>
                </div>

            </div>
        </div>
    </section>
</template>

<script>
import CartOrderHead from './cart-order-head.vue'
import CartOrder from './cart-order.vue'
    export default {
        name: "cart",
        components: {
            CartOrder,
            CartOrderHead   
        },
        props: {
            products: {
                type: Array,
                required: false
            },
        },
        data(){
            return{
                empty: false,
            }
        },
        methods:{
        },
    }
</script>