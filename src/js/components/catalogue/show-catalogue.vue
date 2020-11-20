<template>
    <div class="header__catalog-btn" @click.prevent="open">
        <svg class="header__catalog-btn-icon" viewBox="0 0 18 14" v-if="active">
            <use :xlink:href="'./images/sprite.svg#close'"></use>
        </svg>
        <svg class="header__catalog-btn-icon" viewBox="0 0 18 14" v-else>
            <use :xlink:href="'./images/sprite.svg#icons__ham'"></use>
        </svg>
        Каталог
    </div>
</template>

<script>
    // import ClickOutside from "vue-click-outside";

    export default {

        name: "show-catalogue",
        // directives: {
        //     ClickOutside 
        // },
        data() {
            return {
                active: false,
            }
        },
        methods: {
            open() {
                this.active = !this.active
                const catalogue = document.querySelector('.catalogue')
                if (this.active) {
                    catalogue.style.display = 'block'
                } else {
                    catalogue.style.display = 'none'
                }
            }
        }
    }
</script>

<style>

</style>