<template>
    <div class="cart-card"
         :class="{'cart-card--out-of-stock': !product.available,
                   'cart-card--table': table}"
    >
        <div class="cart-card__image-block" v-if="!table">
            <img class="cart-card__image" :src="this.product.images[0].img" alt="фото товара">
        </div>

        <div class="cart-card__species" v-if="!table">
            <div class="cart-card__code">Артикул: {{ product.code }}</div>

            <div class="cart-card__block">
                <div class="cart-card__description">
                    <a :href="product.link" class="cart-card__name">
                        {{ product.title }}
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
                        {{ product.newPrice * amount }} &#8381;
                    </div>
                    <div class="cart-card__old-price-element">
                        <div class="cart-card__old-price">
                            {{ product.oldPrice * amount }} &#8381;
                        </div>
                        <div class="cart-card__discount">{{ Math.round(product.newPrice / product.oldPrice * 100) - 100 }}%</div>
                    </div>
                </div>
                <div class="cart-card__button-block" v-if="product.available">
                    <component is="add-to-cart"
                                :productId="product.id"
                                :max-amount="product.stock">
                    </component>
                    <div class="cart-card__price-per-one">{{ product.newPrice }} &#8381; / шт.</div>
                </div>
                <div class="cart-card__delete">
                    <svg viewBox="1 1 16 18">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                    </svg>
                </div>
            </div>
        </div>

        <div class="cart-card__block" v-else>
            <div class="table-header__code">{{ product.code }}</div>
            <div class="table-header__dscr">
                <a :href="product.link" class="cart-card__name">
                    {{ product.title }}<span class="cart-card__name-dots">...</span>
                </a>
            </div>
            <div class="table-header__qnty" v-if="product.available">{{ amount }}</div>
            <div class="table-header__price" v-if="product.available">
                {{ product.newPrice }} &#8381; / шт.
            </div>
            <div class="table-header__old-price" v-if="product.available">
                {{ product.oldPrice * amount }} &#8381;
            </div>
            <div class="table-header__discount" v-if="product.available">
                {{ 100 - Math.round(product.newPrice / product.oldPrice * 100) }}%
            </div>
            <div class="table-header__new-price" v-if="product.available">
                {{ product.newPrice * amount }} &#8381;
            </div>
            <div class="cart-card__delete">
                <svg viewBox="1 1 16 18">
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
            table: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                amount: 0,
            }
        },
        computed: {
            storeAmount() {
                console.log('store', this.$store.getters.basketProductQuantity(this.product.id))
                return this.$store.getters.basketProductQuantity(this.product.id);
            },
            thisAmount() {
                this.amount = this.storeAmount
                console.log('amount', this.amount)
            }
        },
        watch: {
            storeAmount(newValue) {
                this.amount = newValue;
            }
        },
        created() {
            this.thisAmount
        }
    }
</script>
