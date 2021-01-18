<template>
    <section class="cart">
        <div class="cart__content" v-if="products.length == 0">
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
                                        name="mode"
                                        v-model="table">
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
                    
                    <div class="cart__purchases" :class="{'cart__purchases--table': table}">
                        <div class="table-header" v-if="table">
                            <div class="table-header__code">Артикул</div>
                            <div class="table-header__dscr">Название</div>
                            <div class="table-header__qnty">Кол-во</div>
                            <div class="table-header__price">Цена/шт.</div>
                            <div class="table-header__old-price">Старая цена</div>
                            <div class="table-header__discount">Скидка</div>
                            <div class="table-header__new-price">Новая цена</div>
                        </div>
                        <div class="cart__in-stock">
                            <cart-card
                                v-for="product in products"
                                v-if="product.available"
                                :product="product"
                                :table="table"
                            ></cart-card>
                        </div>
                        <div class="cart__purchases-out-of-stock" v-if="notAvailable">
                            <div class="cart__title cart__title--out-of-stock">Нет в наличии</div>
                            <div class="table-header" v-if="table">
                                <div class="table-header__code">Артикул</div>
                                <div class="table-header__dscr">Название</div>
                            </div>
                            <div class="cart__out-of-stock">
                                <cart-card
                                    v-for="product in products"
                                    v-if="!product.available"
                                    :product="product"
                                    :table="table"
                                ></cart-card>
                            </div>
                        </div>
                    </div>
                    <component is="cart-search"></component>
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
            items: {
                type: Array,
                required: false
            },
        },
        data(){
            return{
                empty: false,
                table: false,
                notAvailable: false
            }
        },
        methods:{
            },
        computed: {
            products() {
                return this.items
            },
            notAvailableTitle() {
                this.items.forEach(element => {
                    if (element.available) {
                        this.notAvailable = true
                    }
                });
            }
        },
        created() {
            this.notAvailableTitle
        }
    }
</script>