<template>
    <div class="cart-card"
         :class="{'cart-card--out-of-stock': !product.available,
                   'cart-card--deleted': deleteItem,
                   'cart-card--table': view === 'table_cards'}"
    >
        <div class="cart-card__header" v-if="view === 'horiz_cards' && !deleteItem">
            <div class="cart-card__stickers cart-card__stickers--mobile" v-if="product.available">
                <div class="cart-card__stickers-wrap">
                    <div
                        class="cart-card__stickers-sticker"
                        v-for="tooltip in product.tooltips"
                        :class="'cart-card__stickers-sticker--' + tooltip.status"
                    >
                        <span>{{ tooltip.title }}</span>
                    </div>
                </div>
            </div>
            <div class="cart-card__image-block">
                <img class="cart-card__image" :src="this.product.images[0].img" alt="фото товара">
            </div>
            <div class="cart-card__counter">
                +1
            </div>
        </div>

        <div class="cart-card__species" v-if="view === 'horiz_cards'">
            <div class="cart-card__code" v-if="!deleteItem">{{ $tc('cart.item.sku_text') }}{{ product.sku }}</div>

            <div class="cart-card__block">
                <div class="cart-card__content" v-if="!deleteItem">
                    <div class="cart-card__description">
                        <a :href="product.url" class="cart-card__name">
                            {{ product.name }}
                        </a>
                        <div class="cart-card__stickers" v-if="product.available">
                            <div class="cart-card__stickers-wrap">
                                <div
                                    class="cart-card__stickers-sticker"
                                    v-for="tooltip in product.tooltips"
                                    :class="'cart-card__stickers-sticker--' + tooltip.status"
                                >
                                    <span>{{ tooltip.title }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-card__price-block" v-if="product.available">
                        <div class="cart-card__current-price">
                            {{ currency(product.price * amount) }}&nbsp;{{ $tc('text.currency') }}
                        </div>
                        <div class="cart-card__old-price-element">
                            <div class="cart-card__old-price">
                                {{ currency(product.price*amount/(100-product.discount)*100) }}&nbsp;{{ $tc('text.currency') }}
                            </div>
                            <div class="cart-card__discount">{{ product.discount }}%</div>
                        </div>
                    </div>
                    <div class="cart-card__button-block" v-if="product.available">
                        <component is="add-to-cart"
                                    :productId="product.id"
                                    :max-amount="product.stock"
                                    :isCart="true">
                        </component>
                        <div class="cart-card__price-per-one">{{ product.price }}&nbsp;{{ $tc('text.currency') }}&nbsp;/&nbsp;{{ $tc('text.count') }}</div>
                    </div>

                </div>

                <div class="cart-card__content" v-else>
                    <a :href="product.link" class="table-header__dscr">
                        <span class="cart-card__name-message">{{ $tc('cart.item.is_deleted') }}</span>
                        <span class="cart-card__name-title">{{ product.name }}</span>
                    </a>
                    <div class="cart-card__in-favorite" @click="toFav">{{ $tc('cart.item.add_to_favorite') }}</div>
                    <div class="cart-card__cancel-delete"
                        :class="{'cart-card__cancel-delete--out-of-stock': !product.available}"
                        @click="deleteItem = false">
                        {{ $tc('cart.item.cancel_deletion') }}
                    </div>
                </div>

                <div class="cart-card__delete"  v-if="product.available">
                    <svg v-if="deleteItem" @click="clearItem(product.id)">
                        <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                    </svg>
                    <svg viewBox="2 2 16 18" v-else @click="removeItem">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                    </svg>
                </div>
                <div class="cart-card__delete" v-else>
                    <svg viewBox="2 2 16 18" @click="clearItem(product.id)">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                    </svg>
                </div>
            </div>
        </div>

        <div class="cart-card__block" v-else-if="view === 'table_cards'">
            <div class="table-header__code">{{ product.sku }}</div>
            <a class="table-header__dscr">
                <span :href="product.url" class="cart-card__name">
                    {{ product.name }}
                </span>
                <span class="cart-card__name-tooltip">
                    {{product.name}}
                </span>
            </a>
            <div class="table-header__qnty" v-if="product.available">
                <span v-if="!deleteItem">{{ amount }}</span>
            </div>
            <div class="table-header__price" v-if="product.available">
                <span v-if="!deleteItem">{{ product.price }}&nbsp;{{ $tc('text.currency') }}&nbsp;/&nbsp;{{ $tc('text.count') }}</span>
            </div>
            <div class="table-header__old-price" v-if="product.available">
                <span v-if="!deleteItem">{{ currency(product.price*amount/(100-product.discount)*100) }}&nbsp;{{ $tc('text.currency') }}</span>
            </div>
            <div class="table-header__discount" v-if="product.available || deleteItem">
                <span v-if="!deleteItem">
                    {{ product.discount }}%
                </span>
                <span class="cart-card__in-favorite"
                    @click="toFav"
                    v-else
                >{{ $tc('cart.item.add_to_favorite') }}</span>
            </div>
            <div class="table-header__new-price" v-if="product.available || deleteItem">
                <span v-if="!deleteItem">{{ currency(product.price * amount) }}&nbsp;{{ $tc('text.currency') }}</span>
                <span class="cart-card__cancel-delete"
                    @click="deleteItem = false"
                    v-else
                >{{ $tc('cart.item.cancel_deletion') }}</span>
            </div>
            <div class="cart-card__delete" v-if="product.available">
                <svg v-if="deleteItem" @click="clearItem(product.id)">
                    <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
                <svg viewBox="2 2 16 18" v-else @click="removeItem">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                </svg>
            </div>
            <div class="cart-card__delete" v-else>
                <svg viewBox="2 2 16 18" @click="clearItem(product.id)">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'cart-card',
        props: {
            product: {
                type: Object,
                required: true,
            },
            view: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                deleteItem: false,
            }
        },
        computed: {
            storeAmount() {
                return this.$store.getters.basketProductQuantity(this.product.id);
            },
            amount() {
                return this.storeAmount
            },
        },
        methods: {
            removeItem() {
                this.deleteItem = true;
            },
            clearItem(productId) { 
                this.deleteItem = false;
                this.$store.dispatch('basketSetQuantity', {
                    productId: productId,
                    quantity: 0
                }).finally(() => {
                    
                });
            },
            toFav() {

            }
        },
    }
</script>
