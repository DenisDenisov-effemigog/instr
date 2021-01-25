<template>
    <div class="container">
        <a href="#" class="header__logo header__logo_desktop" v-show="!activeSearch">
            <!-- <svg viewBox="0 0 650 150">
                <use :xlink:href="templatePath + 'images/sprite.svg#logo'"></use>
            </svg> -->
            <svg viewBox="0 0 148 48">
                <use :xlink:href="templatePath + 'images/sprite.svg#wt'"></use>
            </svg>
        </a>
        <a href="#" class="header__logo header__logo_mobile" v-show="!activeSearch">
            <!-- <svg viewBox="0 0 650 150">
                <use :xlink:href="templatePath + 'images/sprite.svg#logo'"></use>
            </svg> -->
            <svg viewBox="0 0 137 32">
                <use :xlink:href="templatePath + 'images/sprite.svg#tw'"></use>
            </svg>
        </a>
        <show-catalogue :categories="categories" v-show="!activeSearch"></show-catalogue>
        <header-search
            @searchClick=searchClick
        ></header-search>
        <ul class="header__menu">
            <li class="header__menu-item">
                <div class="header__menu-link">
                    <svg class="header__menu-icon" viewBox="-2 0 19 20">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__user'"></use>
                    </svg>
                    <p class="header__menu-text" v-if="!user.authorized">{{ $tc('header.menu.enter') }}</p>
                    <div class="header__menu-tooltip" v-if="!user.authorized">
                        <div @click.prevent="openModal('user', 'login')"  href="#" class="header__menu-tooltip-layout">
                            <svg class="" viewBox="0 0 16 16">
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__entrance'"></use>
                            </svg>
                            {{ $tc('header.tooltip.enter') }}
                        </div>
                        <div @click.prevent="openModal('user', 'reg')" href="#" class="header__menu-tooltip-layout">
                            <svg class="" viewBox="0 0 16 16">
                                <use :xlink:href="templatePath + 'images/sprite.svg#plus'"></use>
                            </svg>
                            {{ $tc('header.tooltip.register') }}
                        </div>
                    </div>
                    <p class="header__menu-text" v-if="user.authorized">{{ $tc('header.menu.profile') }}</p>
                    <component is="tooltip-profile" v-if="user.authorized"></component>
                </div>
            </li>
            <li class="header__menu-item">
                <a href="#" class="header__menu-link">
                    <svg class="header__menu-icon" viewBox="-2 0 19 20">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__graf'" ></use>
                    </svg>
                    <p class="header__menu-text">{{ $tc('header.menu.compare') }}</p>
                </a>
            </li>
            <li class="header__menu-item">
                <a href="#" class="header__menu-link">
                    <svg class="header__menu-icon">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__heart'"></use>
                    </svg>
                    <p class="header__menu-text">{{ $tc('header.menu.favorite') }}</p>
                </a>
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
            activeSearch: false
        }
    },
    methods:{
        searchClick(data){
            this.activeSearch = data
        },
        openModal(modal, props) {
            this.$eventBus.$emit("openModal", modal, props, false, true)
        },
    }
    
}
</script>