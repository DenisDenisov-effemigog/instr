<template>
    <div class="mobile-menu__buttons">
        <ul class="header__menu header__menu--mobile">
            <li class="header__menu-item">
                <a
                    class="header__menu-link"
                    :class="{'header__menu-link--active': menuLink === 'catalog' || menuLink === 'search'}"
                    @click.prevent="clickMenu('catalog')"
                >
                    <svg class="header__menu-icon">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__catalog'"></use>
                    </svg>
                    <p class="header__menu-text">{{ $tc('header.catalogue') }}</p>
                </a>
            </li>
            <li class="header__menu-item">
                <component is="compare-mini"></component>
            </li>
            <li class="header__menu-item">
                <component is="favorite-mini"></component>
            </li>
            <li class="header__menu-item" v-if="!user.authorized">
                <a :href="profileLink" class="header__menu-link" @click.prevent="clickMenu('profile')">
                    <div class="header__menu-icon-wrapper">
                        <svg class="header__menu-icon" viewBox="-4 -2 24 24">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__user'"></use>
                        </svg>
                    </div>
                    <p class="header__menu-text">{{ $tc('title.enter') }}</p>
                </a>
            </li>
            <li class="header__menu-item" v-if="user.authorized">
                <a 
                    class="header__menu-link"
                    :class="{'header__menu-link--active': menuLink === 'profile' || menuLink === 'search'}"
                    @click.prevent="clickMenu('profile')"
                >
                    <div class="header__menu-icon-wrapper">
                        <svg class="header__menu-icon" viewBox="-4 -2 24 24">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__user'"></use>
                        </svg>
                    </div>
                    <p class="header__menu-text">{{ $tc('header.menu.profile') }}</p>
                </a>
            </li>
            <li class="header__menu-item">
                <component is="cart-mini"></component>
            </li>
        </ul>
    </div>
</template>

<script>
    import config from "../config";

export default {
    name: "sticky-menu",
    props: {
        user: {required: true},
    },
    data(){
        return{
            menuLink: '',
            profileLink: config.links.personal,
        }
    },
    created() {
        this.$eventBus.$on("notActiveButton", this.notActiveButton)
    },
    methods:{
        clickMenu(menu) {
            this.menuLink = menu
            this.$eventBus.$emit("closeSearch"); // закрываем поиск
            
            if (this.menuLink === 'catalog') {
                this.$eventBus.$emit("toggle-catalog", true); //открываем мобильный каталог
            } else {
                this.$eventBus.$emit("close-catalog"); //закрываем моб.каталог по клику на любую другую кнопку
            }
            
            if (this.menuLink === 'profile') {
                if (this.user.authorized) {
                    window.location.replace(config.links.personal_dashboard)
                } else {
                    this.$eventBus.$emit("openModal", 'user', 'login', false, true)
                }
            }
        },
        notActiveButton() {
            this.menuLink = ''
        },
    },
}
</script>