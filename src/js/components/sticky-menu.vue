<template>
    <div class="mobile-menu__buttons">
        <ul class="header__menu header__menu_mobile">
            <li class="header__menu-item">
                <a
                    class="header__menu-link"
                    :class="{'header__menu-link_active': menuLink === 'catalog' || menuLink === 'search'}"
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
            <!--<li class="header__menu-item">
                <a href="#" class="header__menu-link">
                    <svg class="header__menu-icon">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__user'"></use>
                    </svg>
                    <p class="header__menu-text">Войти</p>
                </a>
            </li>-->
            <li class="header__menu-item">
                <a 
                    class="header__menu-link"
                    :class="{'header__menu-link_active': menuLink === 'profile' || menuLink === 'search'}"
                    @click.prevent="clickMenu('profile')"
                >
                    <svg class="header__menu-icon">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__user'"></use>
                    </svg>
                    <p class="header__menu-text">Профиль</p>
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
</template>

<script>

export default {
    name: "sticky-menu",
    data(){
        return{
            menuLink: ''
        }
    },
    created() {
        this.$eventBus.$on("notActiveButton", this.notActiveButton)
    },
    methods:{
        clickMenu(menu) {
            this.menuLink = menu
            this.$eventBus.$emit("closeSearch");
            if (this.menuLink === 'catalog') {
                this.$eventBus.$emit("open-catalogue", true);
                this.$eventBus.$emit('exitSearch', true);
            } else if (this.menuLink === 'profile') {
                // this.$eventBus.$emit('open-menu', menu);
                // this.$eventBus.$emit('exitSearch', false);
            } else {
                this.$eventBus.$emit("close-catalogue", false);
                document.querySelector('html').style.overflow = 'auto';
            }
        },
        notActiveButton() {
            this.menuLink = ''
        },
    },
}
</script>