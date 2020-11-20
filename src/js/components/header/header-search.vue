<template>
    <div class="header__search">
        <div class="header__search-mobile">
            <img v-show="!flag" @click="searchClick" src="./images/header/icons/mag.svg" alt="" class="header__search-mobile-icon">
            <div class="mobile-search" v-show="flag">
                <div class="mobile-search__pic">
                    <img @click='clickClose' class="mobile-search__pic-icon" src="./images/header/icons/left-arrow.svg" alt="">
                </div>
                <form action="" class="mobile-search__form">
                    <input type="text" class="mobile-search__input" :class="{'header__search-input_focused': focused}" placeholder="Поиск">
                    <button class="mobile-search__btn">Найти</button>
                     <search
                        :focused=focused
                    ></search> 
                </form>
            </div>
        </div>
        <form action="" class="header__search-form">
            <input @focus="focus" type="text" class="header__search-input" :class="{'header__search-input_focused': focused}" placeholder="Поиск по сайту">
            <div v-show="focused" @click="closeSearch" class="header__search-form-close__btn">
                <img src="./images/header/icons/close.svg" alt="" class="header__search-form-close__btn-icon">
            </div>
            <search
                :focused=focused
            ></search>
        </form>
    </div>
</template>

<script>
    import search from './search.vue';

export default {
    name: "header-search",
    components:{
        search
    },
    data(){
        return{
            focused:false,
            flag: false
        }
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
            this.$emit("searchClick", this.flag)
        },
        clickClose(){
            this.flag = false
            this.focused = false
            this.$emit("clickClose", this.flag)
        }
    }
    
}
</script>