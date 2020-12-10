<template>
    <div class="profile">
        <div class="profile__menu" v-if="showMenu">
            <ul class="profile__menu-list">
                <li class="profile__menu-link"
                    :class="{'profile__menu-link_active': currentPage === 'my-profile'}"
                    @click.prevent="openPage('my-profile')">
                    <span>Мой профиль</span>
                    <svg class="" viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </li>
                <li class="profile__menu-link"
                    :class="{'profile__menu-link_active': currentPage === 'order-list'}"
                    @click.prevent="openPage('order-list')">
                    <span>Список заказов</span>
                    <svg class="" viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </li>
                <li class="profile__menu-link"
                    :class="{'profile__menu-link_active': currentPage === 'my-check'}"
                    @click.prevent="openPage('my-check')">
                    <span>Мой счет</span>
                    <svg class="" viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </li>
                <li class="profile__menu-link"
                    :class="{'profile__menu-link_active': currentPage === 'address-list'}"
                    @click.prevent="openPage('address-list')">
                    <span>Адреса доставки</span>
                    <svg class="" viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </li>
                <li class="profile__menu-link"
                    :class="{'profile__menu-link_active': currentPage === 'my-favorite'}"
                    @click.prevent="openPage('my-favorite')">
                    <span>Избранное</span>
                    <svg class="" viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </li>
                <li class="profile__menu-link"
                    :class="{'profile__menu-link_active': currentPage === 'actions'}"
                    @click.prevent="openPage('actions')">
                    <span>Акции</span>
                    <svg class="" viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </li>
            </ul>
            <div class="profile__menu-mobile">
                <div class="profile__menu-mobile_link">
                    <svg viewBox="0 0 15 15">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__phone'"></use>
                    </svg>
                    <span>+4 0371 166 478</span>
                </div>
                <div class="profile__menu-mobile_link">
                    <svg>
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__pin'"></use>
                    </svg>
                    <span>Москва</span>
                </div>
                <div class="profile__menu-mobile_link">
                    <svg>
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__exit'"></use>
                    </svg>
                    <span>Выйти</span>
                </div>
            </div>
        </div>
        
        <div class="profile__content">
            <div v-show="currentPage === 'my-profile' && !mobile" class="profile__page">
                <div v-if="!showMenu" @click="goBack">Кнопка назад</div>
                <slot name="my-profile"></slot>
            </div>
            <div v-show="currentPage === 'order-list' && !mobile" class="profile__page">
                <div v-if="!showMenu" @click="goBack">Кнопка назад</div>
                <slot name="order-list"></slot>
            </div>
            <div v-show="currentPage === 'my-check' && !mobile" class="profile__page">
                <div v-if="!showMenu" @click="goBack">Кнопка назад</div>
                <slot name="my-check"></slot>
            </div>
            <div v-show="currentPage === 'address-list' && !mobile" class="profile__page">
                <div v-if="!showMenu" @click="goBack">Кнопка назад</div>
                <slot name="address-list"></slot>
            </div>
            <div v-show="currentPage === 'my-favorite' && !mobile" class="profile__page">
                <div v-if="!showMenu" @click="goBack">Кнопка назад</div>
                <slot name="my-favorite"></slot>
            </div>
            <div v-show="currentPage === 'actions' && !mobile" class="profile__page">
                <div v-if="!showMenu" @click="goBack">Кнопка назад</div>
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
            mobile: false,
            showMenu: true,
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
        window.addEventListener('resize', this.updateWidth);
        this.updateWidth()
    },
    methods: {
        openPage(code) {
            if (this.currentPage !== code) {
                this.currentPage = code
                if(window.innerWidth < 760) {
                    this.mobile = false
                    this.showMenu = false
                }
            }
        },
        goBack() {
            this.mobile = true
            this.showMenu = true 
        },
        updateWidth() {
            this.mobile = window.innerWidth < 760
            if (this.mobile){
                this.currentPage = ''
            } else {
                this.currentPage = 'my-profile'
            }
        },
    }
}
</script>