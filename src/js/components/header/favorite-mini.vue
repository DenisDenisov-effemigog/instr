<template>
    <a :href="favoritesLink" class="header__menu-link"
        :class="{'header__menu-link--active': active}">
        <div class="header__menu-icon-wrapper">
            <svg class="header__menu-icon" viewBox="-2 -4 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__heart'"></use>
            </svg>
            <span class="header__mini-cloud" v-if="productsQuantity > 0">
                {{productsQuantity}}
            </span>
        </div>
        <p class="header__menu-text">{{ $tc('header.menu.favorite') }}</p>
    </a>
</template>

<script>
    import config from "../../config";
    
    export default {
        name: "favorite-mini",
        props: {
            active: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                favoritesLink: config.links.favorites,
            }  
        },
        computed: {
            productsQuantity() {
                return this.$store.getters.favotitesSummary;
            }, 
        }
    }
</script>

<style scoped>

</style>