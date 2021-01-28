<template>
    <section class="cart">
        <div class="cart__content" v-if="products.length === 0">
            <div class="cart__purchases-wrapper">
                <div class="cart__header cart__header--empty">
                    <div class="cart__title">{{ $tc('cart.title.empty') }}</div>
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
                        <div class="cart__title">{{ $tc('cart.title.full') }}</div>
                        <div class="cart__header-layout">
                            <div class="cart__view-switcher">
                                <label class="cart__view-switch" @click="changeView()">
                                    <input
                                        class="cart__view-switch-input"
                                        type="checkbox"
                                        name="mode"
                                        v-model="table">
                                    <span class="cart__view-switch-slider"></span>
                                    <span class="cart__view-switch-label">{{ $tc('cart.view.table') }}</span>
                                </label>
                            </div>
                            <div class="cart__clear-btn" @click="clearCart">
                                <svg>
                                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                                </svg>
                                {{ $tc('cart.clear') }}
                            </div>
                        </div>
                    </div>
                    <cart-order-head 
                        :mobileFlag="true"
                        :currentPrice="productsPrice"
                    ></cart-order-head>
                    <selected-items
                        :products="oldProducts"
                    ></selected-items>
                    <div class="cart__purchases" :class="{'cart__purchases--table': changedView === 'table_cards'}">
                        <div class="table-header" v-if="changedView === 'table_cards'">
                            <div class="table-header__code">{{ $tc('cart.title.sku') }}</div>
                            <div class="table-header__dscr">{{ $tc('cart.title.name') }}</div>
                            <div class="table-header__qnty">{{ $tc('cart.title.qty') }}</div>
                            <div class="table-header__price">{{ $tc('cart.title.price') }}</div>
                            <div class="table-header__old-price">{{ $tc('cart.title.all_price') }}</div>
                            <div class="table-header__discount">{{ $tc('cart.title.discount') }}</div>
                            <div class="table-header__new-price">{{ $tc('cart.title.total_price') }}</div>
                        </div>
                        <div class="cart__in-stock">
                            <cart-card
                                v-for="product in products"
                                v-if="product.available"
                                :product="product"
                                :view="changedView"
                            ></cart-card>
                        </div>
                        <div class="cart__purchases-out-of-stock" v-if="notAvailable.length > 0">
                            <div class="cart__title cart__title--out-of-stock">{{ $tc('cart.title.out_of_stock') }}</div>
                            <div class="table-header" v-if="changedView === 'table_cards'">
                                <div class="table-header__code">{{ $tc('cart.title.sku') }}</div>
                                <div class="table-header__dscr">{{ $tc('cart.title.name') }}</div>
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
import SelectedItems from './selected-items.vue'
import store from "../../store";
    export default {
        name: "cart",
        components: {
            CartOrder,
            CartOrderHead,
            CartCard,
            SelectedItems 
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
                notAvailable: []
            }
        },
        computed: {
            products() {
                this.notAvailable = [];
                return this.$store.state.basket.products.filter((product) => {
                    if (!product.available && product.basket_quantity) {
                        this.notAvailable.push(product.basket_quantity)
                    }
                    return product.basket_quantity > 0;
                });
            },
            oldProducts() {
                return this.$store.state.basket.old_products.filter((product) => {
                    if (!product.available && product.basket_quantity) {
                        this.notAvailable.push(product.basket_quantity)
                    }
                    return product.basket_quantity > 0;
                });
            },
            productsPrice() {
                const basketData = this.$store.getters.basketProductsSummary;
                return parseFloat((basketData.price).toFixed(3));
            },
        },
        methods: {
            tableMode() {
                if (window.innerWidth < 988) {
                    this.table = false;
                    this.changedView = 'horiz_cards';
                    this.$store.dispatch('cartSetViewMode', this.changedView);
                }
            },
            clearCart() { 
                // через массив передаем оглавление и сообщение модального окна очистки корзины - 2 элемента
                this.$eventBus.$emit("openModal", 'dialogue', [this.$tc('modal.title.clear_cart'),this.$tc('modal.text.clear_cart')], false, false)
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
            this.$store.dispatch('getOldBasket');
        },
    }
</script>