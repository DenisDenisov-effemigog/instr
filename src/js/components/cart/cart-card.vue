<template>
    <div class="cart-card"
         :class="{'cart-card--out-of-stock': !product.available,
                   'cart-card--deleted': deleteItem,
                   'cart-card--table': table}"
    >
        <div class="cart-card__header" v-if="!table && !deleteItem">
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
        </div>

        <div class="cart-card__species" v-if="!table && !deleteItem">
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
                        {{ currency(number(product.newPrice) * amount) }}&nbsp;&#8381;
                    </div>
                    <div class="cart-card__old-price-element">
                        <div class="cart-card__old-price">
                            {{ currency(number(product.oldPrice) * amount) }}&nbsp;&#8381;
                        </div>
                        <div class="cart-card__discount">{{ Math.round(number(product.newPrice) / number(product.oldPrice) * 100) - 100 }}%</div>
                    </div>
                </div>
                <div class="cart-card__button-block" v-if="product.available">
                    <component is="add-to-cart"
                                :productId="product.id"
                                :max-amount="product.stock">
                    </component>
                    <div class="cart-card__price-per-one">{{ product.newPrice }}&nbsp;&#8381;&nbsp;/&nbsp;шт.</div>
                </div>
                <div class="cart-card__delete" @click="removeItem">
                    <svg viewBox="1 1 16 18">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                    </svg>
                </div>
            </div>
        </div>

        <div class="cart-card__block" v-else-if="!table && deleteItem">
            <div class="table-header__dscr">
                <a :href="product.link" class="cart-card__name"
                    :class="{'cart-card__name--prompt': prompt}"
                    ref="textBlock"
                >
                    <span class="cart-card__name-title" ref="textSpan">{{ product.title }}</span>
                    <span class="cart-card__name-dots">...</span>
                </a>
            </div>
            <div class="cart-card__in-favorite" @click="toFav">Добавить&nbsp;в&nbsp;избранное</div>
            <div class="cart-card__cancel-delete" @click="deleteItem = false">
                <span v-if="product.available">Отменить</span>
            </div>
            <div class="cart-card__delete" @click="clearItem(product.id)">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
            </div>
        </div>

        <div class="cart-card__block" v-else-if="table">
            <div class="table-header__code">{{ product.code }}</div>
            <div class="table-header__dscr">
                <a :href="product.link" class="cart-card__name">
                    {{ product.title }}<span class="cart-card__name-dots">...</span>
                </a>
            </div>
            <div class="table-header__qnty" v-if="product.available">
                <span v-if="!deleteItem">{{ amount }}</span>
            </div>
            <div class="table-header__price" v-if="product.available">
                <span v-if="!deleteItem">{{ product.newPrice }}&nbsp;&#8381;&nbsp;/&nbsp;шт.</span>
            </div>
            <div class="table-header__old-price" v-if="product.available">
                <span v-if="!deleteItem">{{ currency(number(product.oldPrice) * amount) }}&nbsp;&#8381;</span>
            </div>
            <div class="table-header__discount" v-if="product.available || deleteItem">
                <span v-if="!deleteItem">
                    {{ 100 - Math.round(number(product.newPrice) / number(product.oldPrice) * 100) }}%
                </span>
                <span class="cart-card__in-favorite"
                    @click="toFav"
                    v-else
                >Добавить&nbsp;в&nbsp;избранное</span>
            </div>
            <div class="table-header__new-price" v-if="product.available || deleteItem">
                <span v-if="!deleteItem">{{ currency(number(product.newPrice) * amount) }}&nbsp;&#8381;</span>
                <span class="cart-card__cancel-delete"
                    @click="deleteItem = false"
                    v-else-if="product.available"
                >Отменить</span>
            </div>
            <div class="cart-card__delete">
                <svg v-if="deleteItem" @click="clearItem(product.id)">
                    <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
                <svg viewBox="1 1 16 18" v-else @click="removeItem">
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
                required: true,
            }
        },
        data() {
            return {
                amount: 0,
                deleteItem: false,
                prompt: false,
            }
        },
        computed: {
            storeAmount() {
                return this.$store.getters.basketProductQuantity(this.product.id);
            },
            thisAmount() {
                this.amount = this.storeAmount
            },
        },
        methods: {
            removeItem() {
                this.deleteItem = true;
                // TODO не получилось добавить многотичие в тексте описания товара, если текст длиннее/шире блока 
                // if (this.deleteItem) {
                //     if (this.$refs.textSpan.offsetWidth > this.$refs.offsetWidth - 9) {
                //         this.prompt = true;
                //     } else {
                //         this.prompt = false;
                //     }
                // }
            },
            clearItem(productId) {
                // TODO не получилось создать удаление товара
                this.$store.dispatch('basketSetQuantity', {
                    productId: productId,
                    quantity: 0
                }).finally(() => {
                    
                });
            },
            toFav() {

            }
        },
        watch: {
            storeAmount(newValue) {
                this.amount = newValue;
            },
        },
        created() {
            this.storeAmount;
        }
    }
</script>
