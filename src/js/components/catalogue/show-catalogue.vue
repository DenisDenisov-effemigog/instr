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
            this.$eventBus.$on("exitSearch", this.closeMenu);
            this.$eventBus.$on("close-catalogue", this.close);
        },
        methods: {
            open() {
                this.active = !this.active;
                this.$eventBus.$emit('open-catalogue', this.active);
                if (!this.active) {
                    this.toggleHtmlOverflow('auto')
                }
            },
            close(state) {
                this.active = state;
                this.$eventBus.$emit('open-catalogue', this.active)
            },
            // openMenu() {
            //     this.openedMenu = true;
            //     this.$eventBus.$emit('open-catalogue', this.active)
            //     this.$eventBus.$emit('open-menu', 'home');
            //     this.$eventBus.$emit("hide-button");
            // },
            openMenu() {
                this.openedMenu = !this.openedMenu;
                this.$eventBus.$emit('open-catalogue', this.active)
                this.$eventBus.$emit('open-menu', 'home');
                this.$eventBus.$emit("hide-button");
                if (this.openedMenu == false) {
                    this.$eventBus.$emit('close-menu')
                }
            },
            closeMenu(action) {
                this.openedMenu = false;
                if (action) {
                    this.$eventBus.$emit('close-menu');
                }
            },
            
        },
    }
</script>
