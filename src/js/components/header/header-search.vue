<template>
    <div class="header__search" v-click-outside="clickOutside">
        <div class="header__search-mobile">
            <img v-show="!flag" @click="searchClick" src="./images/header/icons/mag.svg" alt="" class="header__search-mobile-icon">
            <div class="mobile-search" v-show="flag">
                <div @click='clickClose' class="mobile-search__pic">
                    <svg class="mobile-search__pic-icon">
                        <use :xlink:href="'./images/sprite.svg#arrows__arrow-left'"></use>
                    </svg>
                </div>
                <form action="" class="mobile-search__form">
                    <input type="text" class="mobile-search__input" :class="{'header__search-input_focused': focused}" placeholder="Поиск">
                    <button class="mobile-search__btn">Найти</button>
                     <search :focused=focused></search> 
                </form>
            </div>
        </div>
        <form action="" class="header__search-form">
            <input @focus="focus" type="text" class="header__search-input" :class="{'header__search-input_focused': focused}" placeholder="Поиск по сайту">
            <div v-show="focused" @click="closeSearch" class="header__search-form-close__btn">
                 <svg class="header__search-form-close__btn-icon">
                    <use :xlink:href="'./images/sprite.svg#close'"></use>
                </svg>
            </div>
            <search
                :focused=focused
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
            flag: false
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
            this.flag = true
            this.focused = true
            this.$eventBus.$emit("open-menu", 'search')
            this.$emit("searchClick", this.flag)
        },
        clickClose(){
            this.flag = false
            this.focused = false
            this.$eventBus.$emit('exitSearch')
            this.$emit("clickClose", this.flag)
        },
        exitSearch() {
            this.flag = false
            this.focused = false
            this.$emit("clickClose", this.flag)
        },
        clickOutside() {
            let vm = this
            if(window.innerWidth > 760) {
                vm.clickClose()
            }
        },
    }
    
}
</script>