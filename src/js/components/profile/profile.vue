<template>
    <div class="profile">
        <div class="profile__menu" v-if="showMenu">
            <div class="profile__company profile__company--mobile">
                <h3 class="profile__company-name profile__company-name--mobile">{{ profile.personal.company }}</h3>
                <p class="profile__company-type profile__company-type--mobile">
                    <span>{{profile.personal.personTypePrint}}</span>
                </p>
            </div>
            <ul class="profile__menu-list">
                <li v-for="link in menu"
                    class="profile__menu-link"
                    :class="{'profile__menu-link_active': currentPage === link.pageName}"
                    @click.prevent="openPage(link.pageName)"
                    v-show="profile.personal.personType === link.personType && profile.personal.personType !== 2 || profile.personal.personType === 2"
                >
                    <span>{{ link.title }}</span>
                    <svg class="" viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </li>
            </ul>
            <div class="profile__menu-mobile">
                <div class="profile__menu-mobile_link" v-for="link in menuMobile">
                    <svg viewBox="0 0 15 15">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__' + link.icon"></use>
                    </svg>
                    <span>{{link.title}}</span>
                </div>
            </div>
        </div>
        
        <div class="profile__content">
            <div v-for="content in profileContent" 
                 v-show="currentPage === content.name && !mobile" class="profile__page">
                <div class="breadcrumbs" v-if="!showMenu" @click="goBack">
                    <svg class="breadcrumbs__back" viewBox="0 0 18 15">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
                    </svg>
                    <span>Назад</span>
                </div>
                <component :is="content.component"
                           :profile="content.data"
                ></component>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "profile",
    props: {
        profile: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {
            currentPage: 'my-profile',
            mobile: false,
            showMenu: true,
            menu: [
                {'title': 'Мой профиль', 'pageName': 'my-profile', 'personType': 1},
                {'title': 'Список заказов', 'pageName': 'order-list', 'personType': 1},
                {'title': 'Мой счет', 'pageName': 'my-check', 'personType': 2},
                {'title': 'Адреса доставки', 'pageName': 'delivery-list', 'personType': 2},
            ],
            menuMobile: [
                {'title': '+4 0371 166 478', 'icon': 'phone'},
                {'title': 'Москва', 'icon': 'pin'},
                {'title': 'Выйти', 'icon': 'exit'},
            ],
            profileContent: [
                {'name': 'my-profile', 'component': 'page-personal', 'data': this.profile.personal},
                {'name': 'order-list', 'component': 'page-orders', 'data': this.profile.orders},
                {'name': 'my-check', 'component': 'page-check', 'data': this.profile.check},
                {'name': 'delivery-list', 'component': 'page-delivery', 'data': this.profile.addresses},
            ],
        };
    },
    computed: {
        personal() {
            return this.profile.personal
        }
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
            this.$eventBus.$emit("allOrders");
        },
        goBack() {
            this.mobile = true
            this.showMenu = true
            this.currentPage = ''
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