<template>
    <div class="profile">
        <ul class="profile__menu">
            <li class="profile__menu_link" @click.prevent="openPage('my-profile')">
                <span>Мой профиль</span>
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </li>
            <li class="profile__menu_link" @click.prevent="openPage('order-list')">
                <span>Список заказов</span>
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </li>
            <li class="profile__menu_link" @click.prevent="openPage('my-check')">
                <span>Мой счет</span>
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </li>
            <li class="profile__menu_link" @click.prevent="openPage('address-list')">
                <span>Адреса доставки</span>
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </li>
            <li class="profile__menu_link" @click.prevent="openPage('my-favorite')">
                <span>Избранное</span>
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </li>
            <li class="profile__menu_link" @click.prevent="openPage('actions')">
                <span>Акции</span>
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
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