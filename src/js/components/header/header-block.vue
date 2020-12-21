<template>
    <div class="container">
        <a href="#" class="header__logo" v-show="!flag">
            <svg viewBox="0 0 650 150">
                <use :xlink:href="templatePath + 'images/sprite.svg#logo'"></use>
            </svg>
        </a>
        <show-catalogue :categories="categories" v-show="!flag"></show-catalogue>
        <header-search
            @searchClick=searchClick
            @clickClose=clickClose
        ></header-search>
        <ul class="header__menu">
            <li class="header__menu-item">
                <a href="#" class="header__menu-link">
                    <svg class="header__menu-icon" viewBox="-2 0 19 20">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__user'"></use>
                    </svg>
                    <p class="header__menu-text">Войти</p>
                    <div class="header__menu-tooltip">
                        <div @click.prevent="openModal('user', 'login')"  href="#" class="header__menu-tooltip-layout">
                            <svg class="" viewBox="0 0 16 16">
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__entrance'"></use>
                            </svg>
                            Вход
                        </div>
                        <div @click.prevent="openModal('user', 'reg')" href="#" class="header__menu-tooltip-layout">
                            <svg class="" viewBox="0 0 16 16">
                                <use :xlink:href="templatePath + 'images/sprite.svg#plus'"></use>
                            </svg>
                            Регистрация
                        </div>
                    </div>
                    <!-- Tooltip для залогиненных пользователей -->
                    <!-- <div class="header__menu-tooltip">
                        <div href="#" class="header__menu-tooltip-layout">
                            <svg>
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__home'"></use>
                            </svg>
                            Мой профиль
                        </div>
                        <div href="#" class="header__menu-tooltip-layout">
                            <svg>
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__order'"></use>
                            </svg>
                            Список заказов
                        </div>
                        <div href="#" class="header__menu-tooltip-layout">
                            <svg>
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__card'"></use>
                            </svg>
                            Мой счет
                        </div>
                        <div href="#" class="header__menu-tooltip-layout">
                            <svg>
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__delivery'"></use>
                            </svg>
                            Адреса доставки
                        </div>
                        <div href="#" class="header__menu-tooltip-layout">
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__sale'"></use>
                            </svg>
                            Акции
                        </div>
                        <div href="#" class="header__menu-tooltip-layout">
                            <svg>
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__exit'"></use>
                            </svg>
                            Выход
                        </div>
                    </div> -->
                </a>
            </li>
            <li class="header__menu-item">
                <a href="#" class="header__menu-link">
                    <svg class="header__menu-icon" viewBox="-2 0 19 20">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__graf'" ></use>
                    </svg>
                    <p class="header__menu-text">Сравнить</p>
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
                <component is="cart-mini"></component>
            </li>
        </ul>
    </div>
</template>

<script>
    import showCatalogue from '../catalogue/show-catalogue.vue';
    import headerSearch from './header-search.vue';

export default {
    name: "header-block",
    components:{
        headerSearch,
        showCatalogue
    },
    props: {
        categories: {required: true}
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
        },
        openModal(modal, props) {
            this.$eventBus.$emit("openModal", modal, props, false)
        },
    }
    
}
</script>