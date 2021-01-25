<template>
    <div class="search" :class="{'search_opened': focused}">
        <div class="search-result" :class="{'search-result__close': flag}">
            <ul class="search-result__list">
                <li v-for="item in resultArr" :key="item" class="search-result__item">
                    <a href="#" class="search-result__link">{{item}}</a>
                    <div class="search-result__pic">
                        <svg class="search-result__pic-icon">
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__mob-arrow'"></use>
                        </svg>
                    </div>
                </li>
            </ul>
            <div @click="clearHistory" class="search-result__clear">
                <p class="search-result__clear-text">{{ $tc('header.search.clear_history') }}</p>
                <div class="search-result__clear-pic">
                    <svg class="search-result__clear-pic-icon">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__del'"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="search-category">
            <h2 class="search-category__title">{{ $tc('header.search.categories') }}</h2>
            <ul class="search-category__list">
                <li @click="categoryClick" v-for="item in categoryArr" :key="item" class="search-category__item">
                    <a href="#" class="search-category__link">{{item}}</a>
                </li>
            </ul>
        </div>
        <div class="search-items">
            <h2 class="search-items__title">{{ $tc('header.search.products') }}</h2>
            <ul class="search-items__list">
                <li v-for="item in itemArr" :key="item" class="search-items__item">
                    <div class="search-items__info">
                        <div class="search-items__img">
                            <img :src="templatePath + 'images/search/item.png'" alt="" class="search-items__pic">
                        </div>
                        <div class="search-items__desc">
                            <p class="search-items__desc-text">Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel 52 сс</p>
                            <p class="search-items__desc-price">2 819 &#8381;</p>
                        </div>
                        <div class="search-items__icon">
                            <svg class="">
                                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                            </svg>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="search-items__download">
                <!-- Переход к результатам -->
                <a href="#" class="search-items__download-text">{{ $tc('header.search.show_all') }}</a>
                <div class="search-items__download-pic">
                    <svg class="search-items__download-pic-icon" viewBox="0 0 12 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </div>
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
            if(e.target.classList.contains('search-category__link')){
                let a = e.target
                a.classList.toggle('search-category__link_active')
            }
        }
    },
    created(){
        this.itemLength
    },
}
</script>