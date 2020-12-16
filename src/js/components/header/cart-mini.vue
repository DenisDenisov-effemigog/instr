<template>
    <a href="#" class="header__menu-link header__menu-link_cart_active">
        <svg class="header__menu-icon">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__cart'"></use>
        </svg>
        <p class="header__menu-text">Корзина</p>
        <span class="header__mini-cart">{{productsQuantity}}</span>
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
                //const basketData = this.$store.getters.basketProductsSummary;
                const basketData = {quantity: 3};
                return basketData.quantity;
            },
            productsPrice() {
                //const basketData = this.$store.getters.basketProductsSummary;
                const basketData = {price: 100};
                return basketData.price;
            },
            
        }
    }
</script>

<style scoped>

</style>