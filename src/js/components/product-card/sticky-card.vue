<template>
    <div>
        <div class="sticky-card" :class="{'sticky-card--fixed': showStickyCard}">
            <div class="container">
                <div class="sticky-card__img">
                    <img :src="product.images[0].img" alt="">
                </div>
                <div class="sticky-card__desc">
                    <div class="sticky-card__stickers">
                        <card-stikers v-for="tooltip in product.tooltips"
                                    :tooltip="tooltip"
                                    :cardPosition="cardPosition"
                        ></card-stikers>
                    </div>
                    <div class="sticky-card__text">{{ product.name }}</div>
                </div>
                <div class="sticky-card__price">
                    <div v-if="product.price.base"
                         class="sticky-card__price--old"
                    >{{ product.price.base }} {{ $tc('text.currency') }}</div>
                    <div v-if="product.price.sell"
                         class="sticky-card__price--total"
                    >{{ product.price.sell }} {{ $tc('text.currency') }}</div>
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
                       :text="'input.text.in_cart'"
                       :button-title="'button.add_to_cart.long'"
                       :size="'big'"
                       :productId="product.id"
                       :maxAmount="product.stock"
                       :productOrderPosition="productOrderPosition"
            ></component>
        </div>
    </div>
</template>

<script>

export default {
    name:"sticky-card",
    props: {
        product: {
            type: Object,
            required: true,
        }
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