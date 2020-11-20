<template>
    <header class="header">
        <div class="container">
            <div v-show="!flag" class="header__logo">
                <a href="#" class="header__logo-link">
                    <img src="./images/header/logo.png" alt="Логотип" class="header__logo-pic">
                </a>
            </div>
            <div v-show="!flag" class="header__catalog">
                <div  class="header__catalog-mobile">
                    <img src="./images/header/icons/mobile-ham.svg" alt="открыть"
                        class="header__catalog-mobile-icon">
                </div>
                <button class="header__catalog-btn">
                    <img src="./images/header/icons/ham.svg" alt="открыть" class="header__catalog-btn-icon">
                    Каталог
                </button>
            </div>
            <header-search
                @searchClick=searchClick
                @clickClose=clickClose
            ></header-search>
            <ul class="header__menu">
                <li class="header__menu-item">
                    <a href="#" class="header__menu-link">
                        <img src="./images/header/icons/user.svg" alt="личный кабинет" class="header__menu-icon">
                        <p class="header__menu-text">Войти</p>
                        <div class="header__menu-tooltip">
                            <div class="header__menu-tooltip-layout">
                                <div><img src="./images/header/icons/entrance.svg" alt="вход"></div>
                                Вход
                            </div>
                            <div class="header__menu-tooltip-layout">
                                <div><img src="./images/header/icons/plus.svg" alt="регистрация"></div>
                                Регистрация
                            </div>
                        </div>
                    </a>
                </li>
                <li class="header__menu-item">
                    <a href="#" class="header__menu-link">
                        <img src="./images/header/icons/graf.svg" alt="иконка сравнения" class="header__menu-icon">
                        <p class="header__menu-text">Сравнить</p>
                    </a>
                </li>
                <li class="header__menu-item">
                    <a href="#" class="header__menu-link">
                        <img src="./images/header/icons/heart.svg" alt="иконка избранного"
                            class="header__menu-icon">
                        <p class="header__menu-text">Избранное</p>
                    </a>
                </li>
                <li class="header__menu-item">
                    <a href="#" class="header__menu-link header__menu-link_cart_active">
                        <img src="./images/header/icons/cart.svg" alt="иконка корзины" class="header__menu-icon">
                        <p class="header__menu-text">Корзина</p>
                    </a>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
    import headerSearch from './header-search.vue';

export default {
    name: "header-block",
    components:{
        headerSearch
    },
    data(){
        return{
            flag: false
        }
    },
    methods:{
        searchClick(data){
            this.flag = data
        },
        clickClose(data){
            this.flag = data
        }
    }
    
}
</script>