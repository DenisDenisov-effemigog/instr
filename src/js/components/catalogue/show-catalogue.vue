<template>
    <div class="header__catalog-btn" @click.prevent="open">
        <img src="./images/header/icons/arrow-line-right.svg" alt="закрыть"
            class="header__catalog-btn-icon"
            v-if="active">
        <img src="./images/header/icons/ham.svg" alt="открыть"
            class="header__catalog-btn-icon"
            v-else>
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