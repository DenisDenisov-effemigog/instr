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
                <template v-for="item in computedLinks" v-show="profile.personal.personType === item.personType && profile.personal.personType !== 2 || profile.personal.personType === 2">
                    
                    <li v-if="item.external" @click.prevent="openPage(item.pageName)" class="profile__menu-link"
                        :class="{'profile__menu-link_active': currentPage === item.pageName}"
                        v-show="profile.personal.personType === item.personType && profile.personal.personType !== 2 || profile.personal.personType === 2"
                    >
                        <span>{{ item.title }}</span>
                        <svg class="" viewBox="0 0 6 10">
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                        </svg>
                    </li>
                    <router-link v-else tag="li" class="profile__menu-link" :exact="!!item.exact" active-class="profile__menu-link_active" :to="item.url">
                   
                    <span>{{ item.title }}</span>
                    <svg class="" viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                    </router-link>
                    
                </template>    
                
                 
<!--                <li v-for="link in menu"
                    class="profile__menu-link"
                    :class="{'profile__menu-link_active': currentPage === link.pageName}"
                    @click.prevent="openPage(link.pageName)"
                    v-show="profile.personal.personType === link.personType && profile.personal.personType !== 2 || profile.personal.personType === 2"
                >
                    <span>{{ link.title }}</span>
                    <svg class="" viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </li>-->
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
            <template v-if="currentPage == 'my-profile'">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </template>
            <template v-else>
                <div v-for="content in profileContent"
                     v-show="currentPage === content.name && !mobile" class="profile__page">
                    <div class="breadcrumbs" v-if="!showMenu  && details == false" @click="goBack">
                        <svg class="breadcrumbs__back" viewBox="0 0 18 15">
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
                        </svg>
                        <span>Назад</span>
                    </div>
                    <component :is="content.component"
                               :profile="content.data"
                    ></component>
                </div>
            </template>
           
<!--            <div v-for="content in profileContent" 
                 v-show="currentPage === content.name && !mobile" class="profile__page">
                <div class="breadcrumbs" v-if="!showMenu  && details == false" @click="goBack">
                    <svg class="breadcrumbs__back" viewBox="0 0 18 15">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
                    </svg>
                    <span>Назад</span>
                </div>
                <component :is="content.component"
                           :profile="content.data"
                ></component>
            </div>-->
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
            links: [
                {
                    title: 'Мой профиль',
                    url: '/account/',
                    exact: true,
                    personType: 1
                },
                
                {title: 'Список заказов', 'pageName': 'order-list', personType: 1, external: true},
                {title: 'Мой счет', 'pageName': 'my-check', personType: 2, external: true},
                {title: 'Адреса доставки', 'pageName': 'delivery-list', personType: 2, external: true},
                /*
                {
                    title: 'Список заказов',
                    url: '/account/orders/',
                    personType: 1
                },
                
                {
                    title: 'Details',
                    url: '/account/details/'
                },
                
                {
                    title: 'Recently viewed',
                    url: '/account/viewed/',
                },
                {
                    title: 'Shopping cart',
                    url: '/cart/',
                    external: true
                },*/
            ],
            currentPage: 'my-profile',
            mobile: false,
            showMenu: true,
            details: false,
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
        computedLinks() {
            let result = [];
            let vm = this;
            this.links.forEach(item => {
                if (item.url) {
                    item.active = vm.trimPath(vm.$route.path) === vm.trimPath(item.url);
                }
                result.push(item);
            });
            return result;
        },
        personal() {
            return this.profile.personal
        }
    },
    watch: {
    },
    mounted() {
        //this.$store.dispatch('personalUpdateShortProfile');
        this.$store.dispatch('personalUpdateProfile');
    },
    created() {
        window.addEventListener('resize', this.updateWidth);
        this.updateWidth()
        this.$eventBus.$on("closeDetails", this.closeOrders)
        this.$eventBus.$on("openDetails", this.openDetails)
    },
    methods: {
        trimPath(value) {
            return value.replace(/^\/+|\/+$/g, '');
        },
        openPage(code) {
            console.log('this.currentPage' , this.currentPage);
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
        closeOrders() {
            this.details = false
        },
        openDetails() {
            this.details = true
        },
    }
}
</script>