<template>
    <div class="header__catalog">
        <div  class="header__catalog-mobile" @click.prevent="openMenu" v-if="!openedMenu">
            <svg class="header__catalog-mobile-icon">
                <use :xlink:href="'./images/sprite.svg#icons__ham'"></use>
            </svg>
        </div>
        <div  class="header__catalog-mobile" @click.prevent="closeMenu" v-else>
            <svg class="header__catalog-mobile-icon">
                <use :xlink:href="'./images/sprite.svg#close'"></use>
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
    </div>
</template>

<script>
    import catalogue from "./catalogue.vue";

    export default {

        name: "show-catalogue",
        components: {
            catalogue
        },
        props: {
            categories: {required: true}
        },
        data() {
            return {
                active: false,
                openedMenu: false,
            }
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
        },
        created() {
            this.$eventBus.$on("exitSearch", this.closeMenu);
            this.$eventBus.$on("close-catalogue", this.close);
        },
        methods: {
            open() {
                this.active = !this.active;
                this.isActive
                this.$eventBus.$emit('open-catalogue', this.active);
            },
            close(state) {
                this.active = state;
                this.isActive
            },
            openMenu() {
                this.openedMenu = true;
                this.$eventBus.$emit('open-menu', 'home');
            },
            closeMenu() {
                this.openedMenu = false;
                this.$eventBus.$emit('close-menu');
            },
            
        },
    }
</script>
