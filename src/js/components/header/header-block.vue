<template>
    <div class="container">
        <a href="/" class="header__logo header__logo_desktop" v-show="!activeSearch">
            <!-- <svg viewBox="0 0 650 150">
                <use :xlink:href="templatePath + 'images/sprite.svg#logo'"></use>
            </svg> -->
            <svg viewBox="0 0 625 148">
                <use :xlink:href="templatePath + 'images/sprite.svg#wt'"></use>
            </svg>
        </a>
        <a href="/" class="header__logo header__logo_mobile" v-show="!activeSearch">
            <!-- <svg viewBox="0 0 650 150">
                <use :xlink:href="templatePath + 'images/sprite.svg#logo'"></use>
            </svg> -->
            <svg viewBox="0 0 625 148">
                <use :xlink:href="templatePath + 'images/sprite.svg#wt'"></use>
            </svg>
        </a>
        <show-catalogue :categories="categories" v-show="!activeSearch"></show-catalogue>
        <header-search
            @searchClick=searchClick
        ></header-search>
        <ul class="header__menu">
            <li class="header__menu-item"
                :class="{'header__menu-item--unauth': !user.authorized}"
                @click="openModal('user', 'login')"
            >
                <a :href="userLink" class="header__menu-link">
                    <div class="header__menu-icon-wrapper">
                        <svg class="header__menu-icon" viewBox="-4 -2 24 24">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__user'"></use>
                        </svg>
                    </div>
                    <p class="header__menu-text" v-if="!user.authorized">{{ $tc('title.enter') }}</p>
                    <p class="header__menu-text" v-if="user.authorized">{{ $tc('header.menu.profile') }}</p>
                    <component is="tooltip-profile" v-if="user.authorized"></component>
                </a>
                <div class="header__menu-tooltip" v-if="!user.authorized">
                    <div @click.prevent="openModal('user', 'login')" class="header__menu-tooltip-layout">
                        <svg class="" viewBox="0 0 16 16">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__entrance'"></use>
                        </svg>
                        {{ $tc('title.entrance') }}
                    </div>
                    <div @click.prevent="openModal('user', 'reg')" class="header__menu-tooltip-layout">
                        <svg class="" viewBox="0 0 16 16">
                            <use :xlink:href="templatePath + 'images/sprite.svg#plus'"></use>
                        </svg>
                        {{ $tc('title.registration') }}
                    </div>
                </div>
            </li>
            <li class="header__menu-item">
                <component is="compare-mini"></component>
            </li>
            <li class="header__menu-item">
                <component is="favorite-mini"></component>
            </li>
            <li class="header__menu-item">
                <component is="cart-mini"></component>
            </li>
        </ul>
    </div>
</template>

<script>
    import showCatalogue from '../catalogue/show-catalogue.vue';
    import headerSearch from './search/header-search.vue';
    import tooltipProfile from './tooltip-profile.vue';
    import config from "../../config";

export default {
    name: "header-block",
    components:{
        headerSearch,
        tooltipProfile,
        showCatalogue
    },
    props: {
        categories: {required: true},
        user: {required: true},
    },
    data(){
        return{
            activeSearch: false,
        }
    },
    methods:{
        searchClick(data){
            this.activeSearch = data
        },
        openModal(modal, props) {
            if (!this.user.authorized) {
                this.$eventBus.$emit("openModal", modal, props, false, true)
            }
        },
    },
    computed: {
        userLink() {
            return this.user.authorized ? config.links.personal_dashboard : ''
        }
    },
    created() {
        this.userLink
    }
}
</script>