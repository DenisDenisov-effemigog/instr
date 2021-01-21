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
            <div class="cart-card__code">Артикул: {{ product.sku }}</div>

            <div class="cart-card__block">
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
                        {{ currency(product.price * amount) }}&nbsp;&#8381;
                    </div>
                    <div class="cart-card__old-price-element">
                        <div class="cart-card__old-price">
                            {{ currency(product.price*amount/(100-product.discount)*100) }}&nbsp;&#8381;
                        </div>
                        <div class="cart-card__discount">{{ product.discount }}%</div>
                    </div>
                </div>
                <div class="cart-card__button-block" v-if="product.available">
                    <component is="add-to-cart"
                                :productId="product.id"
                                :max-amount="product.stock"
                                :isCart="true">
                    </component> <!--TODO передать параметр чтобы сделать кнопку не активной + сделать кнопку не активной в компоненте по условию-->
                    <div class="cart-card__price-per-one">{{ product.price }}&nbsp;&#8381;&nbsp;/&nbsp;шт.</div>
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
                    <span class="cart-card__name-message">Удален: </span>
                    <span class="cart-card__name-title" ref="textSpan">{{ product.name }}</span>
                    <span class="cart-card__name-dots">...</span>
                </a>
            </div>
            <div class="cart-card__in-favorite" @click="toFav">Добавить&nbsp;в&nbsp;избранное</div>
            <div class="cart-card__cancel-delete"
                :class="{'cart-card__cancel-delete--out-of-stock': !product.available}"
                @click="deleteItem = false">
                Отменить
            </div>
            <div class="cart-card__delete" @click="clearItem(product.id)">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
            </div>
        </div>

        <div class="cart-card__block" v-else-if="table">
            <div class="table-header__code">{{ product.sku }}</div>
            <div class="table-header__dscr">
                <a :href="product.url" class="cart-card__name">
                    {{ product.name }}<span class="cart-card__name-dots">...</span>
                </a>
            </div>
            <div class="table-header__qnty" v-if="product.available">
                <span v-if="!deleteItem">{{ amount }}</span><!--TODO творится что-то странное-->
            </div>
            <div class="table-header__price" v-if="product.available">
                <span v-if="!deleteItem">{{ product.price }}&nbsp;&#8381;&nbsp;/&nbsp;шт.</span>
            </div>
            <div class="table-header__old-price" v-if="product.available">
                <span v-if="!deleteItem">{{ currency(product.price*amount/(100-product.discount)*100) }}&nbsp;&#8381;</span>
            </div>
            <div class="table-header__discount" v-if="product.available || deleteItem">
                <span v-if="!deleteItem">
                    {{ product.discount }}%
                </span>
                <span class="cart-card__in-favorite"
                    @click="toFav"
                    v-else
                >Добавить&nbsp;в&nbsp;избранное</span>
            </div>
            <div class="table-header__new-price" v-if="product.available || deleteItem">
                <span v-if="!deleteItem">{{ currency(product.price * amount) }}&nbsp;&#8381;</span>
                <span class="cart-card__cancel-delete"
                    @click="deleteItem = false"
                    v-else
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
                deleteItem: false,
                prompt: false,
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
    }
</script>
