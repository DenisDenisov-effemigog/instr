<template>
    <div v-if="openModal" class="mobile-menu">
        <div 
            class="mobile-menu__content"
            :class="{'mobile-menu__content--short': menuLink === 'home'}"
        >
            <component :countries="countries" is="home-menu" v-if="menuLink === 'home'"></component>
            <catalogue :categories="categories" v-else-if="menuLink === 'catalog'" class="catalogue_active"></catalogue>
            <div></div>
        </div>
        <div class="mobile-menu__buttons">
            <ul class="header__menu header__menu_mobile">
                <li class="header__menu-item">
                    <a 
                        class="header__menu-link" 
                        :class="{'header__menu-link--active': menuLink === 'home'}"
                        @click.prevent="clickMenu('home')"
                    >
                        <svg class="header__menu-icon">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__home'"></use>
                        </svg>
                        <p class="header__menu-text">Главная</p>
                    </a>
                </li>
                <li class="header__menu-item">
                    <a 
                        class="header__menu-link"
                        :class="{'header__menu-link--active': menuLink === 'catalog' || menuLink === 'search'}"
                        @click.prevent="clickMenu('catalog')"
                    >
                        <svg class="header__menu-icon">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__catalog'"></use>
                        </svg>
                        <p class="header__menu-text">Каталог</p>
                    </a>
                </li>
                <li class="header__menu-item">
                    <a href="#" class="header__menu-link">
                        <svg class="header__menu-icon">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__heart'"></use>
                        </svg>
                        <p class="header__menu-text">Избранное</p>
                    </a>
                </li>
                <li class="header__menu-item">
                    <a href="#" class="header__menu-link">
                        <svg class="header__menu-icon">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__user'"></use>
                        </svg>
                        <p class="header__menu-text">Войти</p>
                    </a>
                </li>
                <li class="header__menu-item">
                    <a href="#" class="header__menu-link">
                        <svg class="header__menu-icon">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__cart'"></use>
                        </svg>
                        <p class="header__menu-text">Корзина</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import homeMenu from './header/mobile/home-menu.vue'
import catalogue from './catalogue/catalogue.vue'

export default {
    name: "mobile-menu",
    components: {
        homeMenu, catalogue,
    },
    props: {
        categories: {required: true},
        countries: {required: true}
    },
    data(){
        return{
            openModal: false,
            menuLink: 'home'
        }
    },
    created() {
        this.$eventBus.$on("open-menu", this.openMenuModal)
        this.$eventBus.$on("close-menu", this.closeMenuModal)
        // this.$eventBus.$on("openMenuLink", this.openMenuModal)
    },
    methods:{
        openMenuModal(link){
            document.querySelector('html').style.overflow = 'hidden';
            this.openModal = true;
            this.menuLink = link;
        },
        closeMenuModal(){
            document.querySelector('html').style.overflow = 'auto';
            this.openModal = false;
        },
        clickMenu(menu) {
            this.menuLink = menu
            this.$eventBus.$emit("closeSearch");
        },
    },
}
</script>