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
            <li class="header__menu-item" v-if="!user.authorized">
                <a href="#" class="header__menu-link" @click.prevent="clickMenu('profile')">
                    <svg class="header__menu-icon">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__user'"></use>
                    </svg>
                    <p class="header__menu-text">Войти</p>
                </a>
            </li>
            <li class="header__menu-item" v-if="user.authorized">
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
                <a href="#" class="header__menu-link header__menu-link_cart_active">
                    <svg class="header__menu-icon">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__cart'"></use>
                    </svg>
                    <p class="header__menu-text">Корзина</p>
                    <span class="header__mini-cart" v-if="productsQuantity > 0">
                        {{productsQuantity}}
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: "sticky-menu",
    props: {
        user: {required: true},
    },
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
                if (this.user.authorized) {
                    window.location.replace('/account')
                } else {
                    this.$eventBus.$emit("openModal", 'user', 'login', false, true)
                }
            } else {
                this.$eventBus.$emit("close-catalogue", false);
                this.toggleHtmlOverflow('auto')
            }
        },
        notActiveButton() {
            this.menuLink = ''
        },
    },
    computed: {
        productsQuantity() {
            const basketData = this.$store.getters.basketProductsSummary;
            return basketData.quantity;
        },
    }
}
</script>