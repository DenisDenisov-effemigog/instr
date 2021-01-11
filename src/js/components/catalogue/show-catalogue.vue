<template>
    <div class="header__catalog">
        <!-- <div  class="header__catalog-mobile" @click.prevent="openMenu" v-if="!openedMenu">
            <svg class="header__catalog-mobile-icon" viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__ham'"></use>
            </svg>
        </div>
        <div  class="header__catalog-mobile" @click.prevent="closeMenu" v-else>
            <svg class="header__catalog-mobile-icon header__catalog-mobile-icon--close">
                <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
            </svg>
        </div> -->
        <div  class="header__catalog-mobile" @click.prevent="openMenu">
            <span class="header__catalog-btn-lines" :class="{'header__catalog-btn-lines_active': openedMenu}">
                <span class="header__catalog-btn-line"></span>
                <span class="header__catalog-btn-line"></span>
                <span class="header__catalog-btn-line"></span>
            </span>
        </div>
        <div class="header__catalog-btn" @click.prevent="open">
            <span class="header__catalog-btn-lines" :class="{'header__catalog-btn-lines_active': active}">
                <span class="header__catalog-btn-line"></span>
                <span class="header__catalog-btn-line"></span>
                <span class="header__catalog-btn-line"></span>
            </span>
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
        created() {
            this.$eventBus.$on("change-menu-icon", this.closeMenu);
            this.$eventBus.$on("close-catalog", this.close);
        },
        methods: {
            open() {
                this.active = !this.active;
                this.$eventBus.$emit('toggle-catalog', this.active); //открываем/закрываем деск.каталог
            },
            close() {
                this.active = false;
                this.$eventBus.$emit('toggle-catalog', false) //закрываем каталог
            },
            openMenu() {
                this.openedMenu = !this.openedMenu;
                this.$eventBus.$emit("close-catalog"); //закрываем моб.каталог при открывании меню
                this.$eventBus.$emit('open-menu', 'home');
                this.$eventBus.$emit("hide-button");
                if (this.openedMenu === false) {
                    this.$eventBus.$emit('close-menu') //закрываем моб.меню
                }
                this.$eventBus.$emit('closeStickyButton')
            },
            closeMenu() {
                this.openedMenu = false;
            },
            
        },
    }
</script>
