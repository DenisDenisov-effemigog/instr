<template>
    <section class="cart">
        <div class="cart__content" v-if="products.length == 0">
            <div class="cart__purchases-wrapper">
                <div class="cart__header cart__header--empty">
                    <div class="cart__title">Корзина пуста</div>
                </div>
                <div class="cart__purchases">
                    <component is="cart-search"></component>
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
                                <label name="mode" class="cart__view-switch" @click="changeView()">
                                    <input
                                        class="cart__view-switch-input"
                                        type="checkbox"
                                        name="mode"
                                        v-model="table">
                                    <span class="cart__view-switch-slider"></span>
                                    <span class="cart__view-switch-label">Табличный&nbsp;режим</span>
                                </label>
                            </div>
                            <div class="cart__clear-btn" @click="clearCart">
                                <svg>
                                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                                </svg>
                                Очистить корзину
                            </div>
                        </div>
                    </div>
                    <cart-order-head 
                        :mobileFlag="true"
                        :currentPrice="productsPrice"
                    ></cart-order-head>
                    
                    <div class="cart__purchases" :class="{'cart__purchases--table': view === 'table_cards'}">
                        <div class="table-header" v-if="view === 'table_cards'">
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
                                :view="changedView"
                            ></cart-card>
                        </div>
                        <div class="cart__purchases-out-of-stock" v-if="notAvailable">
                            <div class="cart__title cart__title--out-of-stock">Нет в наличии</div>
                            <div class="table-header" v-if="view === 'table_cards'">
                                <div class="table-header__code">Артикул</div>
                                <div class="table-header__dscr">Название</div>
                            </div>
                            <div class="cart__out-of-stock">
                                <cart-card
                                    v-for="product in products"
                                    v-if="!product.available"
                                    :product="product"
                                    :view="changedView"
                                ></cart-card>
                            </div>
                        </div>
                    </div>
                    <component is="cart-search"></component>
                </div>
            </div>
            <div class="cart__sidebar-wrapper">
                <div class="cart__sidebar">
                    <cart-order
                        :productsPrice="productsPrice"
                    ></cart-order>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import CartOrderHead from './cart-order-head.vue'
import CartOrder from './cart-order.vue'
import CartCard from './cart-card.vue'
    export default {
        name: "cart",
        components: {
            CartOrder,
            CartOrderHead,
            CartCard 
        },
        props: {
            view:{
                type: String,
                required: true,
            }  
        },
        data(){
            return{
                table: false,
                changedView: this.view,
                notAvailable: false
            }
        },
        computed: {
            products() {
                return this.$store.state.basket.products.filter((product) => {
                    if (product.available) {
                        this.notAvailable = true
                    }
                    return product.basket_quantity > 0;
                });
            },
            /*loaded() {
                return this.$store.state.basket.loaded
            },
            productsQuantity() {
                const basketData = this.$store.getters.basketProductsSummary;
                
                return basketData.quantity;
            },*/
            productsPrice() {
                const basketData = this.$store.getters.basketProductsSummary;
                return parseFloat((basketData.price).toFixed(3));
            },
            /*deliveryCost() {
                return this.productsPrice > this.delivery_treshold ? 0 : this.delivery_price;
            },*/
        },
        methods: {
            tableMode() {
                if (window.innerWidth < 988) {
                    this.table = false
                }
            },
            clearCart() {
                // TODO не удалось очистить корзину в Api 
                this.$store.dispatch('basketClear');
            },
            changeView(){
                if(this.table){
                    this.changedView = 'horiz_cards'
                } else {
                    this.changedView = 'table_cards'
                }
                this.$store.dispatch('cartSetViewMode', this.changedView);
            }
        },
        created() {
            window.addEventListener('resize', this.tableMode)
        },
        mounted() {
            this.$store.dispatch('cartSetViewMode', this.view);
        },
    }
</script>