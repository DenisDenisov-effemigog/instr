<template>
    <section class="profile">
        <div class="profile__menu" v-if="showMenu">
            <div class="profile__company profile__company--mobile">
                <h3 class="profile__company-name profile__company-name--mobile">{{ profile.company }}</h3>
                <p class="profile__company-type profile__company-type--mobile">
                    <span>{{profile.personTypePrint}}</span>
                </p>
            </div>
            <ul class="profile__menu-list"  >
                <li v-for="(item, index) in computedLinks"  @click="clickTab(index)" :key="index">
                    <router-link tag="div" 
                        class="profile__menu-link"
                        active-class="profile__menu-link--active"
                        :exact="!!item.exact"  
                        :to="item.url"
                    >
                        <span>{{ $tc(item.title) }}</span>
                        <svg class="" viewBox="0 0 6 10">
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                        </svg>
                    </router-link>
                </li>  
                <div ref="bg" class="profile__menu-bg"></div>  
            </ul>
            <div class="profile__menu-mobile">
                <div class="profile__menu-mobile_link" v-for="(link, item) in menuMobile" :key="item">
                    <svg viewBox="0 0 15 15">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__' + link.icon"></use>
                    </svg>
                    <span>{{ $tc(link.title) }}</span>
                </div>
                <div v-show="user.authorized" class="profile__menu-mobile_link" @click=exit>
                    <svg viewBox="0 0 15 15">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__exit'"></use>
                    </svg>
                    <span>{{ $tc('profile.link.exit') }}</span>
                </div>
            </div>
        </div>
        
        <div class="profile__content" v-show="!showMenu && mobile || !mobile">
            <router-link
                :to="'/my'"
            >
                <div class="breadcrumbs" @click="goBack" v-if="!showMenu && mobile && !listOpened">
                    <svg class="breadcrumbs__back" viewBox="0 0 18 15">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
                    </svg>
                    <span>{{ $tc('link.back') }}</span>
                </div>
            </router-link>

            <transition name="fade" mode="out-in">
                <router-view
                    :selectopenSelect="selectopenSelect"
                    :contract="profile.contract"
                    :preLink="preLink"
                    :reasons="reasons"
                ></router-view>
            </transition>
        </div>
    </section>
</template>

<script>
    import * as Api from '../../api/index'
    let api = Api.getInstance()
export default {
    name: "profile",
    props: {
        selectopenSelect:{
            type: Object,
            required: true,
        },
        preLink:{
            type:String
        },
        user: {required: true},
        reasons: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            currentIndex: 0,
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
                // {
                //     title: 'link.finance',
                //     url: '/my/finances/', 
                //     personType: [2],
                //     //external: true
                // },
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
        this.$eventBus.$on("passIndex", this.clickTab)
        if(window.innerWidth < 1024) {
            this.$eventBus.$on("hideMenu", this.openPage)
            this.$eventBus.$on("hideBreadcrumbs", this.openList)
        }
    },
    beforeDestroy(){
        this.$eventBus.$off('hideMenu');
    },
    methods: {
        exit(){
            api.authOut().then(() => {
                    console.log('user out')
                    // let ref = document.referrer;
                    // window.location.replace(ref.length > 0 ? ref : '/');
                }).catch((error) => {
                    console.log(error)
                });
        },
        clickTab(index){
            if(window.innerWidth > 1022){
                this.currentIndex = index
                this.$refs.bg.style.top = this.currentIndex * 56 + 'px'
                this.$refs.bg.style.height = 56 + 'px'
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