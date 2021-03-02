<template>
    <a :href="compareLink" class="header__menu-link"
        :class="{'header__menu-link--active': productsQuantity > 0}">
        <svg class="header__menu-icon" viewBox="-2 0 19 20">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__graf'" ></use>
        </svg>
        <p class="header__menu-text">{{ $tc('header.menu.compare') }}</p>
        <span class="header__mini-cloud" v-if="productsQuantity > 0">
            {{productsQuantity}}
        </span>
    </a>
</template>

<script>
    import config from "../../config";
    
    export default {
        name: "compare-mini",
        props: {
            // mobile: {
            //     type: Boolean,
            //     required: false,
            //     default: false
            // }
        },
        data() {
            return {
                compareLink: config.links.compare,
            }  
        },
        computed: {
            products() {
                return this.$store.state.listing.comparisons.filter(item => item.is_compare === true);
            },
            productsQuantity() {
                return this.products.length;
            }, 
        },
        mounted () {
            this.$store.dispatch('comparisonsUpdateProducts');
        }
    }
</script>

<style scoped>

</style>