<template>
    <div class="home-menu">
        <ul class="home-menu__links">
            <li>
                <a href="" class="home-menu__link">
                    <span>О компании</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="'./images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="home-menu__link">
                    <span>Филиалы</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="'./images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="home-menu__link">
                    <span>Где купить</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="'./images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="home-menu__link">
                    <span>Условия сотрудничества</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="'./images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="home-menu__link">
                    <span>Бренды</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="'./images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="home-menu__link">
                    <span>Акции</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="'./images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <div class="home-menu__link">
                    <span>Румыния</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="'./images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </div>
            </li>
        </ul>
        <div class="home-menu__info">
            <div class="home-menu__info_link">
                <svg viewBox="0 0 15 15">
                    <use xlink:href="./images/sprite.svg#icons__phone"></use>
                </svg>
                <span>+4 0371 166 478</span>
            </div>
            <div class="home-menu__info_link">
                <svg>
                    <use xlink:href="./images/sprite.svg#icons__pin"></use>
                </svg>
                <span>Москва</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home-menu',
    }
</script>
