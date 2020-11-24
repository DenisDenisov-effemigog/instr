<template>
    <ul class="header__menu header__menu_mobile">
        <li class="header__menu-item">
            <a href="#" class="header__menu-link">
                <svg class="header__menu-icon">
                    <use :xlink:href="'./images/sprite.svg#icons__home'"></use>
                </svg>
                <p class="header__menu-text">Главная</p>
            </a>
        </li>
        <li class="header__menu-item">
            <a href="#" class="header__menu-link">
                <svg class="header__menu-icon">
                    <use :xlink:href="'./images/sprite.svg#icons__catalog'"></use>
                </svg>
                <p class="header__menu-text">Каталог</p>
            </a>
        </li>
        <li class="header__menu-item">
            <a href="#" class="header__menu-link">
                <svg class="header__menu-icon">
                    <use :xlink:href="'./images/sprite.svg#icons__heart'"></use>
                </svg>
                <p class="header__menu-text">Избранное</p>
            </a>
        </li>
        <li class="header__menu-item">
            <a href="#" class="header__menu-link">
                <svg class="header__menu-icon">
                    <use :xlink:href="'./images/sprite.svg#icons__user'"></use>
                </svg>
                <p class="header__menu-text">Войти</p>
            </a>
        </li>
        <li class="header__menu-item">
            <a href="#" class="header__menu-link">
                <svg class="header__menu-icon">
                    <use :xlink:href="'./images/sprite.svg#icons__cart'"></use>
                </svg>
                <p class="header__menu-text">Корзина</p>
            </a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'header-menu-mobile',
    }
</script>
