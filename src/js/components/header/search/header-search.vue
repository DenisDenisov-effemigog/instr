<template>
    <div class="header__search"
        :class="{'header__search_split': activeSearch}"
        v-click-outside="clickOutside"
    >
        <div class="header__search-mobile">
            <div class="mobile-search" v-if="activeSearch">
                <div @click='exitSearch' class="mobile-search__pic">
                    <svg class="mobile-search__pic-icon">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
                    </svg>
                </div>
                <form action="" class="mobile-search__form">
                    <input type="text" class="mobile-search__input" :class="{'header__search-input_focused': focused}" :placeholder="$tc('header.search.placeholder_mobile')">
                    <button class="mobile-search__btn">{{ $tc('header.search.btn_find') }}</button>
                     <search :focused=focused></search> 
                </form>
            </div>
            <div class="header__search-mobile-btn" v-else @click="searchClick">
                <img :src="templatePath + 'images/header/icons/mag.svg'" alt="" class="header__search-mobile-icon">
            </div>
        </div>
        <form action="" class="header__search-form">
            <input @focus="focus" type="text" class="header__search-input" :class="{'header__search-input_focused': focused}" :placeholder="$tc('header.search.placeholder')">
                <svg v-show="focused" class="header__search-form-icon">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__mag'"></use>
                </svg>
            <search
                :focused="focused"
            ></search>
        </form>
    </div>
</template>

<script>
    import search from './search.vue';
    import ClickOutside from "vue-click-outside";

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
            focused:false,
            activeSearch: false
        }
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
        searchClick(){
            this.activeSearch = true;
            this.focused = true;
            this.$eventBus.$emit("open-menu", 'search');
            this.$eventBus.$emit("hide-button");
            this.$emit("searchClick", this.activeSearch) //скрываем лого, разворачиваем поиск (передаём true)
        },
        exitSearch() {
            this.activeSearch = false;
            this.focused = false;
            this.$eventBus.$emit('change-menu-icon'); // меняем иконку моб.меню на бкргер
            this.$eventBus.$emit('close-menu'); //закрываем моб.меню
            this.$emit("searchClick", this.activeSearch) // возвращаем лого, закрываем поиск (передаём false)
            this.$eventBus.$emit("close-catalog"); //закрываем моб.каталог при выходе из поиска
        },
        clickOutside() {
            let vm = this;
            if(window.innerWidth > 760 && vm.focused) {
                vm.exitSearch()
            }
        },
    }
    
}
</script>