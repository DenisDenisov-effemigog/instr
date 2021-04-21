<template>
    <div class="header__search"
        :class="{'header__search--split': activeSearch}"
        v-click-outside="clickOutside"
    >
        <div class="header__search-mobile">
            <div class="mobile-search" v-if="activeSearch">
                <div @click.prevent='exitSearch' class="mobile-search__pic">
                    <svg class="mobile-search__pic-icon">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
                    </svg>
                </div>
                <form action="" class="mobile-search__form">
                    <input type="text" 
                           class="mobile-search__input" 
                           :class="{'header__search-input_focused': focused}" 
                           :placeholder="$tc('header.search.placeholder_mobile')"
                           v-model="value"
                           @keyup="startSearch"
                    >
                    <button class="mobile-search__btn">{{ $tc('header.search.btn_find') }}</button>
                     <search :focused=focused
                             :searchLink="searchLink"
                             :searchShields="searchShields"
                             :searchProducts="searchProducts"
                             v-if="!!searchLink && searchLink.length > 0"
                     ></search> 
                </form>
            </div>
            <div class="header__search-mobile-btn" v-else @click.prevent="searchClick">
                <img :src="templatePath + 'images/header/icons/mag.svg'" alt="" class="header__search-mobile-icon">
            </div>
        </div>
        <form action="" class="header__search-form">
            <input @focus="focus" type="text" 
                   class="header__search-input" 
                   :class="{'header__search-input_focused': focused}" 
                   :placeholder="$tc('header.search.placeholder')"
                   v-model="value"
                   @keyup="startSearch"
            >
                <svg v-show="focused" class="header__search-form-icon">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__mag'"></use>
                </svg>
            <search
                :focused="focused"
                :searchShields="searchShields"
                :searchProducts="searchProducts"
                :searchLink="searchLink"
                v-if="!!searchLink && searchLink.length > 0"
            ></search>
        </form>
    </div>
</template>

<script>
    import search from './search.vue';
    import ClickOutside from "vue-click-outside";
    import * as Api from '../../../api/index'

    let api = Api.getInstance();

export default {
    name: "header-search",
    components:{
        search
    },
    directives: {
        ClickOutside
    },
    data(){
        return{
            value: '',
            focused:false,
            activeSearch: false,
            searchShields: [],
            searchProducts: [],
            searchLink: '',
        }
    },
    mounted() {
        this.$store.dispatch('searchGetHistory');
    },
    created(){
        this.$eventBus.$on("closeSearch", this.exitSearch)
    },
    methods:{
        focus(){
            this.focused = true
        },
        closeSearch(){
            this.focused = false
        },
        startSearch() {
            let vm = this
            if(vm.value.length > 3){
                setTimeout(() => {
                    api.startSearch(vm.value).then(answer => {
                        vm.searchShields = answer.shields
                        vm.searchProducts = answer.products
                        vm.searchLink = answer.url
                    }).catch(errors => {
                        console.error(errors);
                    })
                }, 500);
            }
        },
        searchClick(){
            this.activeSearch = true;
            this.focused = true;
            this.$eventBus.$emit("open-menu", 'search');
            this.$eventBus.$emit("hide-button");
            // this.$emit("searchClick", this.activeSearch) //скрываем лого, разворачиваем поиск (передаём true в header-block.vue)
        },
        exitSearch() {
            this.activeSearch = false;
            this.focused = false;
            this.$eventBus.$emit('change-menu-icon'); // меняем иконку моб.меню на бкргер
            this.$eventBus.$emit('close-menu'); //закрываем моб.меню
            // this.$emit("searchClick", this.activeSearch) // возвращаем лого, закрываем поиск (передаём false в header-block.vue)
            this.$eventBus.$emit("close-catalog"); //закрываем моб.каталог при выходе из поиска
        },
        clickOutside(event) {
            let vm = this;
            if(window.innerWidth > 760 && vm.focused && event.target.className !== 'search__clear-text') {
                vm.exitSearch()
            }
        },
    }
    
}
</script>