<template>
    <div class="cart-card"
         :class="{'cart-card--out-of-stock': !product.available,
                   'cart-card--deleted': deleteItem,
                   'cart-card--table': view === 'table_cards'}"
    >
        <div class="cart-card__header" v-if="view === 'horiz_cards' && !deleteItem">
            <div class="cart-card__stickers cart-card__stickers--mobile" v-if="product.available">
                <card-stickers
                    v-for="tooltip in product.tooltips"
                    :key="tooltip.id"
                    :tooltip="tooltip"
                >
                </card-stickers>
            </div>
            <div class="cart-card__image-block">
                <img class="cart-card__image" :src="product.images[0].img" alt="фото товара">
            </div>
            <div class="cart-card__counter" v-if="product.available && product.basket_extra_quantity">
                +{{ product.basket_extra_quantity }}
            </div>
        </div>

        <div class="cart-card__species" v-if="view === 'horiz_cards'">
            <div class="cart-card__code" v-if="!deleteItem">{{ $tc('cart.item.sku_text') }}{{ product.sku }}</div>
            <!-- горизонтальная карточка -->
            <div class="cart-card__block">
                <div class="cart-card__content" v-if="!deleteItem">
                    <div class="cart-card__description">
                        <a :href="product.url" class="cart-card__name">
                            {{ product.name }}
                        </a>
                        <div class="cart-card__stickers" v-if="product.available">
                            <card-stickers
                                v-for="tooltip in product.tooltips"
                                :key="tooltip.id"
                                :tooltip="tooltip"
                            >
                            </card-stickers>
                        </div>
                    </div>
                    <div class="cart-card__price-block" v-if="product.available">
                        <div class="cart-card__current-price">
                            {{ currency(+product.price * amount) }}&nbsp;{{ $tc('text.currency') }}
                        </div>
                        <div class="cart-card__old-price-element">
                            <div class="cart-card__old-price">
                                {{ currency(+product.price*amount/(100-product.discount)*100) }}&nbsp;{{ $tc('text.currency') }}
                            </div>
                            <div class="cart-card__discount">{{ product.discount }}%</div>
                        </div>
                    </div>
                    <div class="cart-card__button-block" v-if="product.available">
                        <component is="add-to-cart"
                                    :productId="product.id"
                                    :max-amount="product.stock"
                                    :isCart="true"
                                    :currentAmount="amount">
                        </component>
                        <div class="cart-card__price-per-one">{{ currency(+product.price) }}&nbsp;{{ $tc('text.currency') }}&nbsp;/&nbsp;{{ $tc('text.count') }}</div>
                    </div>

                </div>
                <!-- удаляемый товар горизонтальной карточки -->
                <div class="cart-card__content" v-else>
                    <a :href="product.link" class="table-header__dscr">
                        <span class="cart-card__name-message">{{ $tc('cart.item.is_deleted') }}</span>
                        <span class="cart-card__name-title">{{ product.name }}</span>
                    </a>
                    <component is="in-favorite" class="cart-card__in-favorite"
                        :id="product.id"
                        :favorite="product.is_favorite"
                        :only-text="true"
                    >
                    </component>
                    <div class="cart-card__cancel-delete"
                        :class="{'cart-card__cancel-delete--out-of-stock': !product.available}"
                        @click="deleteItem = false">
                        {{ $tc('button.cancel') }}
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
            <!-- табличная карточка только десктоп -->
            <div class="table-header__code">{{ product.sku }}</div>
            <div class="table-header__dscr">
                <a :href="product.url" class="cart-card__name">
                    {{ product.name }}
                </a>
                <span class="cart-card__name-tooltip">
                    {{product.name}}
                </span>
            </div>
            <div class="table-header__qnty" v-if="product.available">
                <span v-if="!deleteItem">{{ amount }}</span>
            </div>
            <div class="table-header__price" v-if="product.available">
                <span v-if="!deleteItem">{{ currency(+product.price) }}&nbsp;{{ $tc('text.currency') }}&nbsp;/&nbsp;{{ $tc('text.count') }}</span>
            </div>
            <div class="table-header__old-price" v-if="product.available">
                <span v-if="!deleteItem">{{ currency(+product.price*amount/(100-product.discount)*100) }}&nbsp;{{ $tc('text.currency') }}</span>
            </div>
            <div class="table-header__discount" v-if="product.available || deleteItem">
                <span v-if="!deleteItem">
                    {{ product.discount }}%
                </span>
                <component is="in-favorite" class="cart-card__in-favorite"
                    :id="product.id"
                    :favorite="product.is_favorite"
                    :only-text="true"
                    v-else
                >
                </component>
            </div>
            <div class="table-header__new-price" v-if="product.available || deleteItem">
                <span v-if="!deleteItem">{{ currency(+product.price * amount) }}&nbsp;{{ $tc('text.currency') }}</span>
                <span class="cart-card__cancel-delete"
                    @click="deleteItem = false"
                    v-else
                >{{ $tc('button.cancel') }}</span>
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
    import cardStickers from '../card/card-stikers.vue'

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
        components: {cardStickers},
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
                this.$store.dispatch('basketSendQuantity', {
                    productId: productId,
                    quantity: 0
                })
                this.$store.dispatch('basketOrderCalc')
            },
        },
    }
</script>
