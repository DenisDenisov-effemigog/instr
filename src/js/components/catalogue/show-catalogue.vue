<template>
    <div class="header__catalog" v-click-outside="close" >
        <div  class="header__catalog-mobile" @click.prevent="open">
            <svg class="header__catalog-mobile-icon">
                <use :xlink:href="'./images/sprite.svg#icons__ham'"></use>
            </svg>
        </div>
        <div class="header__catalog-btn" @click.prevent="open">
            <svg class="header__catalog-btn-icon" viewBox="0 0 18 14" v-if="active">
                <use :xlink:href="'./images/sprite.svg#close'"></use>
            </svg>
            <svg class="header__catalog-btn-icon" viewBox="0 0 18 14" v-else>
                <use :xlink:href="'./images/sprite.svg#icons__ham'"></use>
            </svg>
            Каталог
        </div>
        <catalogue :class="{'catalogue_active': active}"></catalogue>
    </div>
</template>

<script>
    import ClickOutside from "vue-click-outside";
    import catalogue from "./catalogue.vue";

    export default {

        name: "show-catalogue",
        directives: {
            ClickOutside 
        },
        components: {
            catalogue
        },
        data() {
            return {
                active: false
            }
        },
        methods: {
            open() {
                this.active = !this.active;
                this.isActive
            },
            close() {
                this.active = false
                this.isActive
            },
            
        },
        computed: {
            isActive() {
                const page = document.querySelector('.page');
                if (this.active) {
                    page.classList.add('page_hide-main');
                    page.classList.add('page_hide-footer');
                } else {
                    page.classList.remove('page_hide-main');
                    page.classList.remove('page_hide-footer');
                }
            }
        }
    }
</script>
