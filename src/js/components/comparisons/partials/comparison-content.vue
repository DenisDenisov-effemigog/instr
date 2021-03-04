<template> 
    <div>
        <!-- top part of comparison -->
        <comparisons-top>
            <div class="comparisons__category-selection">
                <div>
                    <select-list
                        :points="categories"
                        :selectopenSelect="defaultCategory"
                        :placeholder="$tc('text.category')"
                    >
                    </select-list>
                    <label>
                        <input
                            class="comparisons__checkbox"
                            type="checkbox">
                        <span class="comparisons__checkbox-label">
                            <svg class="comparisons__checkbox-svg" viewBox="0 0 10 8">
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__checked'"></use>
                            </svg>
                        </span>
                        <span class="comparisons__checkbox-text">{{ $tc('comparisons.text.only_differences') }}</span>
                    </label>
                </div>
                <div class="comparisons__slider-actions">
                    <div class="comparisons__slider-text">
                        <span v-if="qnty == 1">1 </span>
                        <span v-else>{{currentSlideNumber + 1}}-{{currentSlideNumber + shownItemsQnty}} </span>
                        {{ $tc('text.of') }} {{ qnty }} {{ $tc('comparisons.text.products') }}
                    </div>
                    <div class="comparisons__slider-btns">
                        <a class="comparisons__slider-btn" @click="slideToPrev">
                            <svg>
                                <use xlink:href="/images/sprite.svg#arrows__arr-long-left"></use>
                            </svg>
                        </a>
                        <a class="comparisons__slider-btn" @click="slideToNext">
                            <svg>
                                <use xlink:href="/images/sprite.svg#arrows__arr-long-right"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="comparisons__cards">
                <!-- top slider -->
                <agile ref="thumbnails" :as-nav-for="asNavFor2" :options="options" @after-change="currentSlide($event)">
                    <div class="comparisons__card" 
                        :class="{'comparisons__card--width-50': comparisons.length == 1}"
                        v-for="(product, index) in comparisons" :key="index"
                    >
                        <component is="slider-photo-card" 
                                :cardSize="'short'"
                                :images="product.images"
                        ></component>
                        <div class="comparisons__card-description">
                            <div class="card__code">{{ product.code }}</div>
                            <a :href="product.link" class="card__name">{{ product.title }}</a>
                            <div class="comparisons__card-btns">
                                <component is="add-to-cart" 
                                    :productId="product.id"
                                    :max-amount="product.stock"
                                >
                                </component>
                                <component is="to-compare" 
                                        class="card__button-block_to-compare" 
                                        :id="product.id" 
                                        :compare="product.is_compare"
                                >
                                    <svg class="comparisons__card-del-btn">
                                        <use xlink:href="/images/sprite.svg#icons__delete"></use>
                                    </svg>
                                </component>
                            </div>
                        </div>
                    </div>
                    <!-- the second comparison is not chosen -->
                    <div class="comparisons__card comparisons__card--no-product" v-if="comparisons.length == 1">
                        <div>{{ $tc('comparisons.text.no_products_chosen') }}</div>
                    </div>
                </agile>
            </div>
        </comparisons-top>

        <!-- the bottom part of comparison -->

        <div class="comparisons__bottom">
            <div class="comparisons__comparing">
                <ul class="comparisons__sidebar">
                    <li class="comparisons__sidebar-item">Цена</li>
                    <li ref="sideItems" class="comparisons__sidebar-item" v-for="item in Object.keys(comparisons[0].otherOptions)">{{ item }}</li>
                </ul>

                <div class="comparisons__descriptions">
                    <!-- bottom slider -->
                    <agile ref="main" :as-nav-for="asNavFor1" :options="options">
                        <ul ref="descList" class="comparisons__description"
                            :class="{'comparisons__description--no-product': comparisons.length === 1}"
                            v-for="product in comparisons">
                            <li>
                                <div class="comparisons__sidebar-item">{{ $tc('text.price') }}</div>
                                <div class="comparisons__description-text">{{ product.newPrice }}</div>
                            </li>
                            <li v-for="item in sliceList(product.otherOptions)">
                                <div class="comparisons__sidebar-item">{{ item[0] }}</div>
                                <div class="comparisons__description-text" v-if="!!item[1]">{{ item[1] }}</div>
                                <div class="comparisons__description-text" v-else>—</div>
                            </li>
                        </ul>
                        <!-- the second comparison is not chosen -->
                        <ul class="comparisons__description comparisons__description--no-product" v-if="comparisons.length === 1"></ul>
                    </agile>
                </div>
            </div>
            <a class="comparisons__deploy"
                :class="{'comparisons__deploy--expanded': expanded}"
                @click.prevent="expanded = !expanded"
            >
                {{ $tc('comparisons.text.deploy') }}
                <svg viewBox="-2 -2 16 10">
                    <use xlink:href="/images/sprite.svg#arrows__arrow-down"></use>
                </svg>
            </a>
        </div>
        <!-- the end of bottom part -->
    </div>
</template>

<script>
    import comparisonsTop from './sticky-comparisons-top.vue';
    import selectList from '../../partials/select-list.vue';
    import { VueAgile } from 'vue-agile';

    export default {
        name: 'comparison-content',
        components: { comparisonsTop, selectList, agile: VueAgile },
        props: {
            comparingItems: {
                type: Array
            }
        },
        data() {
            return {
                categories: [
                    { 'label': 'Дрель-шуруповерт', 'value': 1 },
                    { 'label': 'Шуруповерт', 'value': 2 },
                    { 'label': 'Гвоздодер', 'value': 3 },
                ],
                defaultCategory: { 'label': 'Дрель-шуруповерт', 'value': 1 },
                asNavFor1: [],
			    asNavFor2: [],
                options: {
                    infinite: false,
                    navButtons: false,
                    dots: false,
                    slidesToShow: 2,

                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3
                            }
                        }
                    ]
                },
                currentSlideNumber: 0,
                shownItemsQnty: 2,
                expanded: false,
            }
        },
        methods: {
            slideToPrev() {
                if (window.innerWidth > 767 && this.qnty > 3) {
                    this.$refs.thumbnails.goToPrev()
                } else if (window.innerWidth < 768) {
                    this.$refs.thumbnails.goToPrev()
                }
            },
            slideToNext() {
                if (window.innerWidth > 767 && this.qnty > 3 && this.currentSlideNumber !== (this.qnty - this.shownItemsQnty)) {
                    this.$refs.thumbnails.goToNext()
                } else if (window.innerWidth < 768 && this.qnty > 2 && this.currentSlideNumber !== (this.qnty - this.shownItemsQnty)) {
                    this.$refs.thumbnails.goToNext()
                }
            },
            currentSlide(event) {
                this.currentSlideNumber = event.currentSlide;
            },
            changeShownQnty() {
                if (window.innerWidth < 768) {
                    this.shownItemsQnty = 2
                } else if (window.innerWidth > 767 && this.qnty > 2) {
                    this.shownItemsQnty = 3
                    if (this.currentSlideNumber >= this.qnty - this.shownItemsQnty) this.$refs.thumbnails.goTo(this.qnty - this.shownItemsQnty)
                } else if (this.qnty < 3) {
                    this.options.responsive[0].settings.slidesToShow = 2;
                }
            },
            changeComparisons() {
                console.log('changing comparison')
            },
            sliceList(list) {
                const array = Object.entries(list);
                if (this.expanded) {
                    return array
                } else {
                    return array.slice(0, 10)
                }
            },
            getSideItems(){
                if(window.innerWidth > 1024){
                    let sideItems = this.$refs.sideItems
                    let descList = this.$refs.descList
                    descList.forEach(function(list){
                        for(let i = 1; i < list.children.length; i++){
                            let sideItemsH = sideItems[i - 1].clientHeight
                            let itemsHeight = list.children[i].clientHeight
                            if(sideItemsH > itemsHeight){
                                list.children[i].style.height = sideItemsH + 'px'
                            }else{
                                sideItems[i - 1].style.height = itemsHeight + 'px'
                            }
                        }
                    })
                }
            }
        },
        computed: {
            comparisons() {
                return this.comparingItems;
            },
            qnty() {
                return this.comparingItems.length
            }
        },
        created() {
            window.addEventListener('resize', this.changeShownQnty);
            // this.$eventBus.$on('change-to-compare', this.changeComparisons);
        },
        mounted() {
            this.changeShownQnty();
            this.asNavFor1.push(this.$refs.thumbnails);
            this.asNavFor2.push(this.$refs.main);
            this.getSideItems()

        }
    }
</script>

<style>

</style>