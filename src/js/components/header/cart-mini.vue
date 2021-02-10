<template>
    <a ref="cart" href="#" class="header__menu-link header__menu-link--cart-active">
        <svg class="header__menu-icon">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__cart'"></use>
        </svg>
        <p class="header__menu-text">{{ $tc('header.menu.cart') }}</p>
        <span class="header__mini-cart" v-if="productsQuantity > 0">
            {{productsQuantity}}
        </span>
    </a>
</template>

<script>
    export default {
        name: "cart-mini",
        props: {
            mobile: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            productsQuantity() {
                const basketData = this.$store.getters.basketProductsSummary;
                return basketData.quantity;
            },
            productsPrice() {
                const basketData = this.$store.getters.basketProductsSummary;
                return basketData.price;
            },
            
        },
        methods:{
            clickedToBtn(){
                let cart = this.$refs.cart
                let cartPositionObj= {}
                cartPositionObj.top = cart.offsetTop + document.documentElement.scrollTop
                cartPositionObj.left = cart.offsetLeft
                this.$eventBus.$emit("cartPosition", cartPositionObj)
            }
        },
        created() {
            this.$eventBus.$on("clickedToBtn", this.clickedToBtn)
        },
    }
</script>

<style scoped>

</style>