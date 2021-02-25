<template>
    <div class="profile">
        <div class="profile__menu" v-if="showMenu">
            <div class="profile__company profile__company--mobile">
                <h3 class="profile__company-name profile__company-name--mobile">{{ profile.company }}</h3>
                <p class="profile__company-type profile__company-type--mobile">
                    <span>{{profile.personTypePrint}}</span>
                </p>
            </div>
            <ul class="profile__menu-list"  @click="clickTab">
                <template v-for="item in computedLinks">
                    <router-link tag="li" 
                                 class="profile__menu-link" 
                                 :exact="!!item.exact" 
                                 active-class="profile__menu-link--active" 
                                 :to="item.url"
                    >
                        <span>{{ $tc(item.title) }}</span>
                        <svg class="" viewBox="0 0 6 10">
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                        </svg>
                    </router-link>
                </template>  
                <div ref="bg" class="profile__menu-bg"></div>  
            </ul>
            <div class="profile__menu-mobile">
                <div class="profile__menu-mobile_link" v-for="link in menuMobile">
                    <svg viewBox="0 0 15 15">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__' + link.icon"></use>
                    </svg>
                    <span>{{ $tc(link.title) }}</span>
                </div>
            </div>
        </div>
        
        <div class="profile__content" v-show="!showMenu && mobile || !mobile">
            <div class="breadcrumbs" @click="goBack" v-if="!showMenu && mobile && !listOpened">
                <svg class="breadcrumbs__back" viewBox="0 0 18 15">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
                </svg>
                <span>{{ $tc('link.back') }}</span>
            </div>

            <transition name="fade" mode="out-in">
                <router-view
                    :points="points"
                    :selectopenSelect="selectopenSelect"
                ></router-view>
            </transition>
        </div>
    </div>
</template>

<script>

export default {
    name: "profile",
    props: {
        points:{
            type: Array,
            required: true,
        },
        selectopenSelect:{
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            links: [
                {
                    title: 'link.dashboard',
                    url: '/my/dashboard',
                    exact: true,
                    personType: [1,2],
                },
                {
                    title: 'link.my_profile',
                    url: '/my/profile',
                    exact: true,
                    personType: [1,2],
                },
                {
                    title: 'link.discounts',
                    url: '/my/discounts',
                    exact: true,
                    personType: [1,2],
                },
                {
                    title: 'link.orders_list',
                    url: '/my/orders/', 
                    personType: [1,2],
                    //external: true
                },
                {
                    title: 'link.finance',
                    url: '/my/finances/', 
                    personType: [2],
                    //external: true
                },
                {
                    title: 'link.my_addresses',
                    url: '/my/address/',
                    personType: [2],
                    //external: true
                },
                // #TODO блоки выгрузки и обращения
                // {
                //     title: 'link.feeds',
                //     url: '/my/feeds/',
                //     personType: [2],
                //     //external: true
                // },
                // {
                //     title: 'link.appeals',
                //     url: '/my/appeals/',
                //     personType: [2],
                //     //external: true
                // },
            ],
            currentPage: 'my-profile',
            mobile: false,
            showMenu: true,
            details: false,
            menuMobile: [
                {'title': 'nav.tel', 'icon': 'phone'},
                {'title': 'nav.city', 'icon': 'pin'},
                {'title': 'profile.link.exit', 'icon': 'exit'},
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
                type = item.personType.filter(type => this.profile.personType === type)
                // console.log(type)
                result.push(item);
            });
            return result;
        },
        profile() {
            return this.cloneOverJson(this.$store.state.personal);
        },
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
        if(window.innerWidth < 1024) {
            this.$eventBus.$on("hideMenu", this.openPage)
            this.$eventBus.$on("hideBreadcrumbs", this.openList)
        }
    },
    beforeDestroy(){
        this.$eventBus.$off('hideMenu');
    },
    methods: {
        clickTab(e){
            if(window.innerWidth > 768){
                let profileLink = e.target.closest('.profile__menu-link')
                this.$refs.bg.style.top = profileLink.offsetTop + 'px'
                this.$refs.bg.style.height = profileLink.clientHeight + 'px'
            }
        },
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