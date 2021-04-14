<template>
    <div class="search" :class="{'search--opened': focused}">
        <div class="search__result" v-if="searchHistory.length">
            <ul class="search__result-list">
                <li v-for="item in searchHistory" class="search__result-item">
                    <a :href="item.link" class="search__result-link">{{item.title}}</a>
                    <div class="search__result-pic">
                        <svg class="search__result-pic-icon">
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__mob-arrow'"></use>
                        </svg>
                    </div>
                </li>
            </ul>
            <div @click="clearHistory" class="search__clear">
                <p class="search__clear-text">{{ $tc('header.search.clear_history') }}</p>
                <div class="search__clear-pic">
                    <svg class="search__clear-icon">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__del'"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="search__category" v-if="searchShields.length">
            <h2 class="search__category-title">{{ $tc('header.search.categories') }}</h2>
            <ul class="search__category-list">
                <li v-for="item in searchShields" class="search__category-item">
                    <a :href="item.link" class="search__category-link">{{item.title}}</a>
                </li>
            </ul>
        </div>
        <div class="search__items" v-if="searchProducts.length">
            <h2 class="search__items-title">{{ $tc('header.search.products') }}</h2>
            <ul class="search__items-list">
                <li v-for="(item, index) in searchProducts" :key="index" class="search__item">
                    <a :href="item.link" class="search__item-info">
                        <div class="search__item-img">
                            <img :src="item.img" alt="" class="search-items__pic">
                        </div>
                        <div class="search__item-desc">
                            <p class="search__item-desc-text">{{item.title}}</p>
                            <p class="search__item-price">{{item.price}} {{ $tc('text.currency') }}</p>
                        </div>
                        <div class="search__item-icon">
                            <svg class="">
                                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                            </svg>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="search__download" v-if="searchLink.length">
                <!-- Переход к результатам -->
                <a :href="searchLink" class="search__download-text">
                    {{ $tc('header.search.show_all') }}
                    <svg class="search__download-icon" viewBox="-3 0 12 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:"search",
    props:{
        focused:{
            type:Boolean,
            default: false
        },
        searchShields:{
            type:Array,
            required: true
        },
        searchProducts:{
            type:Array,
            required: true
        },
        searchLink:{
            type:String,
            required: true
        },
    },
    data(){
        return {
        }
    },
    computed: {
        searchHistory() {
            return this.$store.state.search.history;
        },
    },
    methods:{
        clearHistory(){
            this.$store.dispatch('searchClearHistory');
        },
    },
}
</script>