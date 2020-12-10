<template>
    <div class="profile">
        <!-- <div class="profile__company-wrapper">
            <div class="profile__company-logo">
                <svg viewBox="0 0 72 72">
                    <use :xlink:href="templatePath + 'images/sprite.svg#company-logo'"></use>
                </svg>
            </div>
            <div class="profile__company">
                <h3 class="profile__company-name">{{profile.company.name}}</h3>
                <p class="profile__company-type">Юридическое лицо</p>
            </div>
        </div> -->
        <ul class="profile__menu">
            <li class="profile__menu-link"
                :class="{'profile__menu-link_active': currentPage == 'my-profile'}" 
                @click.prevent="openPage('my-profile')">
                <span>Мой профиль</span>
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </li>
            <li class="profile__menu-link" 
                :class="{'profile__menu-link_active': currentPage == 'order-list'}" 
                @click.prevent="openPage('order-list')">
                <span>Список заказов</span>
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </li>
            <li class="profile__menu-link" 
                :class="{'profile__menu-link_active': currentPage == 'my-check'}" 
                @click.prevent="openPage('my-check')">
                <span>Мой счет</span>
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </li>
            <li class="profile__menu-link" 
                :class="{'profile__menu-link_active': currentPage == 'address-list'}" 
                @click.prevent="openPage('address-list')">
                <span>Адреса доставки</span>
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </li>
            <li class="profile__menu-link" 
                :class="{'profile__menu-link_active': currentPage == 'my-favorite'}" 
                @click.prevent="openPage('my-favorite')">
                <span>Избранное</span>
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </li>
            <li class="profile__menu-link" 
                :class="{'profile__menu-link_active': currentPage == 'actions'}" 
                @click.prevent="openPage('actions')">
                <span>Акции</span>
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </li>
        </ul>
        <div class="profile__divide"></div>
        <ul class="profile__bottom">
            <li class="profile__bottom-item">
                <svg class="" viewBox="0 0 20 20">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__call-menu'"></use>
                </svg>
                <span>+4 0371 166 478</span>
            </li>
            <li class="profile__bottom-item">
                <svg class="" viewBox="0 0 20 20">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__location-menu'"></use>
                </svg>
                <span>Москва</span>
            </li>
            <li class="profile__bottom-item">
                <svg class="" viewBox="0 0 20 20">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__exit-menu'"></use>
                </svg>
                <span>Выйти</span>
            </li>
        </ul>
        <div class="profile__content">
            <div v-show="currentPage === 'my-profile'" class="profile__page">
                <slot name="my-profile"></slot>
            </div>
            <div v-show="currentPage === 'order-list'" class="profile__page">
                <slot name="order-list"></slot>
            </div>
            <div v-show="currentPage === 'my-check'" class="profile__page">
                <slot name="my-check"></slot>
            </div>
            <div v-show="currentPage === 'address-list'" class="profile__page">
                <slot name="address-list"></slot>
            </div>
            <div v-show="currentPage === 'my-favorite'" class="profile__page">
                <slot name="my-favorite"></slot>
            </div>
            <div v-show="currentPage === 'actions'" class="profile__page">
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "profile",
    props: {
    },
    data() {
        return {
            currentPage: 'my-profile',
        };
    },
    computed: {
        // profile() {
        //     return this.profile
        // }
    },
    watch: {
    },
    mounted() {
    },
    created() {
    },
    methods: {
        openPage(code) {
            if (this.currentPage !== code) {
                this.currentPage = code;
            }
        },
    }
}
</script>