<template>
    <div>
        <div class="sticky-card" :class="{'sticky-card--fixed': showStickyCard}">
            <div class="container">
                <div class="sticky-card__img">
                    <img :src="product.images[0].img" alt="">
                </div>
                <div class="sticky-card__desc">
                    <div class="sticky-card__stickers">
                        <div class="product-card__stickers_sticker-wrap"
                             v-for="sticer in product.tooltips">
                            <div class="product-card__stickers_sticker"
                                 :class="'product-card__stickers_sticker product-card__stickers_sticker--' + sticer.status">
                                <span>{{ sticer.title }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="sticky-card__text">{{ product.name }}</div>
                </div>
                <div class="sticky-card__price">
                    <div v-for="price in product.prices"
                         v-if="price.base === 1"
                         class="sticky-card__price--old"
                    >{{ price.price }} &#8381;</div>
                    <div v-for="price in product.prices"
                         v-if="price.base === 3"
                         class="sticky-card__price--total"
                    >{{ price.price }} &#8381;</div>
                </div>
                <component is="add-to-cart"
                           :product-id="product.id"
                           :max-amount="product.stock"
                ></component>
            </div>
        </div>
        <div class="sticky-mobile-button" v-if="showButton">
            <div class="sticky-mobile-button__bg"></div>
            <component is="add-to-cart"
                       :text="'В корзине'"
                       :button-title="'Добавить в корзину'"
                       :size="'big'"
                       :productId="product.id"
                       :maxAmount="product.stock"
                       :productOrderPosition="productOrderPosition"
            ></component>
        </div>
    </div>
</template>

<script>
import addToCart from "../card/add-to-cart.vue"

export default {
    name:"sticky-card",
    props: {
        product: {
            type: Object,
            required: true,
        }
    },
    components:{
        addToCart,
    },
    data(){
        return{
            showStickyCard: false,
            showButton: false,
            productOrderPosition: 0,
        }
    },
    methods:{
        mouseWheel(){
             if(window.innerWidth > 768) {
                let windowPosition = window.pageYOffset

                if(windowPosition > this.productOrderPosition){
                    this.showStickyCard = true

                    this.$eventBus.$emit('openStickyCard')
                } else{
                    this.showStickyCard = false
                    this.$eventBus.$emit('closeStickyCard')
                }
             }
        },
        productOrderBlockPosition(productOrderBlockPosition) {
            this.productOrderPosition = productOrderBlockPosition
        },
        sowButton() {
            this.showButton = true
        },
        hideButton() {
            this.showButton = false
        },
    },
    created () {
        window.addEventListener('scroll', this.mouseWheel);
        this.$eventBus.$on("openStickyButton", this.sowButton);
        this.$eventBus.$on("closeStickyButton", this.hideButton);
        this.$eventBus.$on("productOrderBlockPosition", this.productOrderBlockPosition);
    },
}
</script>