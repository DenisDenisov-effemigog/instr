<template>
    <div class="search" :class="{'search--opened': focused}">
        <div class="search__result" :class="{'search__result--close': flag}">
            <ul class="search__result-list">
                <li v-for="item in resultArr" :key="item" class="search__result-item">
                    <a href="#" class="search__result-link">{{item}}</a>
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
        <div class="search__category">
            <h2 class="search__category-title">{{ $tc('header.search.categories') }}</h2>
            <ul class="search__category-list">
                <li @click="categoryClick" v-for="item in categoryArr" :key="item" class="search__category-item">
                    <a href="#" class="search__category-link">{{item}}</a>
                </li>
            </ul>
        </div>
        <div class="search__items">
            <h2 class="search__items-title">{{ $tc('header.search.products') }}</h2>
            <ul class="search__items-list">
                <li v-for="item in itemArr" :key="item" class="search__item">
                    <div class="search__item-info">
                        <div class="search__item-img">
                            <img :src="templatePath + 'images/search/item.png'" alt="" class="search-items__pic">
                        </div>
                        <div class="search__item-desc">
                            <p class="search__item-desc-text">Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel 52 сс</p>
                            <p class="search__item-price">2 819 {{ $tc('text.currency') }}</p>
                        </div>
                        <div class="search__item-icon">
                            <svg class="">
                                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                            </svg>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="search__download">
                <!-- Переход к результатам -->
                <a href="#" class="search__download-text">
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
    },
    data(){
        return{
            resultArr: ["Шуруп", "Шуруповерт", "Шуруповерт какой-нибудь"],
            categoryArr:["Лебедки автомобильные",'Масленки','Мебель гаражная','Гидравлические опоры','Моечные машины высокого давления','Домкраты','Аксессуары автомобильные'],
            itemArr:[1,2,3,4,5,6,7],
            flag: false,
        }
    },
    methods:{
        clearHistory(){
            this.flag = true
        },
        categoryClick(e){
            if(e.target.classList.contains('search__category-link')){
                let a = e.target
                a.classList.toggle('search__category-link--active')
            }
        }
    },
    created(){
        this.itemLength
    },
}
</script>