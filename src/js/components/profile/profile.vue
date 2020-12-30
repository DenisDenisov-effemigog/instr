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
                <template v-for="item in computedLinks">
                    <router-link tag="li" 
                                 class="profile__menu-link" 
                                 :exact="!!item.exact" 
                                 active-class="profile__menu-link_active" 
                                 :to="item.url"
                    >
                        <span>{{ item.title }}</span>
                        <svg class="" viewBox="0 0 6 10">
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                        </svg>
                    </router-link>
                </template>    
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
        
        <div class="profile__content" v-show="!showMenu && mobile || !mobile">
            <div class="breadcrumbs" @click="goBack" v-if="!showMenu && mobile && !listOpened">
                <svg class="breadcrumbs__back" viewBox="0 0 18 15">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
                </svg>
                <span>Назад</span>
            </div>

            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
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
                    personType: [1,2],
                },
                {
                    title: 'Список заказов',
                    url: '/account/orders/', 
                    personType: [1,2],
                    //external: true
                },
                {
                    title: 'Мой счет',
                    url: '/account/check/', 
                    personType: [2],
                    //external: true
                },
                {
                    title: 'Адреса доставки',
                    url: '/account/adresses/',
                    personType: [2],
                    //external: true
                },
            ],
            currentPage: 'my-profile',
            mobile: false,
            showMenu: true,
            details: false,
            menuMobile: [
                {'title': '+4 0371 166 478', 'icon': 'phone'},
                {'title': 'Москва', 'icon': 'pin'},
                {'title': 'Выйти', 'icon': 'exit'},
            ],
            listOpened: false
        };
    },
    computed: {
        computedLinks() {
            let result = [];
            let type = 0;
            let vm = this;
            this.links.forEach(item => {
                if (item.url) {
                    item.active = vm.trimPath(vm.$route.path) === vm.trimPath(item.url);
                }
                type = item.personType.filter(type => this.profile.personal.personType === type)
                // console.log(type)
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
        if(window.innerWidth < 760) {
            this.$eventBus.$on("hideMenu", this.openPage)
            this.$eventBus.$on("hideBreadcrumbs", this.openList)
        }
    },
    beforeDestroy(){
        this.$eventBus.$off('hideMenu');
    },
    methods: {
        trimPath(value) {
            return value.replace(/^\/+|\/+$/g, '');
        },
        openPage() {
            this.showMenu = false
        },
        goBack() {
            this.showMenu = true
        },
        updateWidth() {
            this.mobile = window.innerWidth < 1024
        },
        closeOrders() {
            this.details = false
        },
        openDetails() {
            this.details = true
        },
        openList(value) {
            this.listOpened = value
        }
    }
}
</script>