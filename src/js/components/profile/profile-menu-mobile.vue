<template>
    <div class="profile-menu-mobile">
        <!--тут добавить шапочку -->
        <ul class="profile-menu-mobile__links">
            <li>
                <a href="" class="profile-menu-mobile__link">
                    <span>Мой профиль</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="profile-menu-mobile__link">
                    <span>{{ $tc('profile.title.orders_list') }}</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="profile-menu-mobile__link">
                    <span>Мой счет</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="profile-menu-mobile__link">
                    <span>Адреса доставки</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="profile-menu-mobile__link">
                    <span>Избранное</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="profile-menu-mobile__link">
                    <span>Акции</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
        </ul>
        <div class="profile-menu-mobile__info">
            <div class="profile-menu-mobile__info_link">
                <svg viewBox="0 0 16 16">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__phone'"></use>
                </svg>
                <span>+4 0371 166 478</span>
            </div>
            <div class="profile-menu-mobile__info_link">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__pin'"></use>
                </svg>
                <span>Москва</span>
            </div>
            <div class="profile-menu-mobile__info_link">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__exit'"></use>
                </svg>
                <span>Выйти</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "profile-menu-mobile",
    components: {
    },
    props: {
    },
    data(){
        return{
        }
    },
    created() {
    },
    methods:{
    },
}
</script>