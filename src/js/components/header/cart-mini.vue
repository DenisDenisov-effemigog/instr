<template>
    <a ref="cart" :href="cartLink" class="header__menu-link"
        :class="{'header__menu-link--active': productsQuantity > 0}">
        <svg class="header__menu-icon">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__cart'"></use>
        </svg>
        <p class="header__menu-text">{{ $tc('header.menu.cart') }}</p>
        <span class="header__mini-cloud" v-if="productsQuantity > 0">
            {{productsQuantity}}
        </span>
    </a>
</template>

<script>
    import config from "../../config";
    
    export default {
        name: "cart-mini",
        props: {
            mobile: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                cartLink: config.links.cart
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