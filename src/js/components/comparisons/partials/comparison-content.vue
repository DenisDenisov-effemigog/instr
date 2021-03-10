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
                    <label @click="filterComparison">
                        <input
                            class="comparisons__checkbox"
                            type="checkbox"
                            v-model="checked">
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
                        :class="{'comparisons__card--width-50': qnty == 1}"
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
                    <div class="comparisons__card comparisons__card--no-product" v-if="qnty == 1">
                        <div>{{ $tc('comparisons.text.no_products_chosen') }}</div>
                    </div>
                </agile>
            </div>
        </comparisons-top>

        <!-- the bottom part of comparison -->

        <div class="comparisons__bottom">
            <div class="comparisons__comparing">
                <ul class="comparisons__list">
                    <li v-show="!expanded" class="comparisons__item" v-for="(item, itemIndex) in sliceList(comparisons[0].otherOptions)">
                        <div class="comparisons__sidebar">
                            <div class="comparisons__sidebar-item">
                                {{ item[0] }}
                            </div>
                        </div>
                        <div class="comparisons__descriptions">
                            <agile ref="main" :options="options" :as-nav-for="asNavFor1">
                                <div class="comparisons__description" v-for="(product, index ) in comparisons" :key="index">
                                    <div class="comparisons__description-text" v-if="!!product.otherOptions[item[0]]">{{product.otherOptions[item[0]]}}</div>
                                    <div class="comparisons__description-text" v-else>—</div>
                                </div>
                            </agile> 
                        </div>
                    </li>
                    <li v-show="expanded" class="comparisons__item"  v-for="(item, itemIndex) in Object.keys(comparisons[0].otherOptions)">
                        <div class="comparisons__sidebar">
                            <div class="comparisons__sidebar-item">
                                {{ item }}
                            </div>
                        </div>
                        <div class="comparisons__descriptions">
                            <agile ref="main" :options="options" :as-nav-for="asNavFor1">
                                <div class="comparisons__description" v-for="(product, index ) in comparisons" :key="index">
                                    <div class="comparisons__description-text" v-if="!!product.otherOptions[item]">{{product.otherOptions[item]}}</div>
                                    <div class="comparisons__description-text" v-else>—</div>
                                </div>
                            </agile> 
                        </div>
                    </li>
                </ul>
            </div>
            <a class="comparisons__deploy"
                :class="{'comparisons__deploy--expanded': expanded}"
                @click.prevent="expanded = true"
                v-if="!expanded"
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
                onlyDiffer: false
            }
        },
        methods: {
            filterComparison(){
                this.$store.dispatch('comparisonsFilter');
            },
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
                    return array.slice(0, 5)
                }
            },
        },
        computed: {
            showItem(){

            },
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
            this.$refs.main.forEach(item => {
                this.asNavFor2.push(item);
            })
            this.asNavFor1.push(this.$refs.thumbnails);
        }
    }
</script>

<style>

</style>