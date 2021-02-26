<template>
    <section class="comparisons">
        <div class="container">
            <div class="comparisons__header">
                <h2 class="comparisons__title">{{ $tc('comparisons.title') }}</h2>
                <a class="comparisons__delete-all">
                    <svg>
                        <use xlink:href="/images/sprite.svg#icons__delete"></use>
                    </svg>
                    {{ $tc('button.delete-all') }}
                </a>
            </div>
        </div>

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
                        1-{{shownItemsQnty}} {{ $tc('text.of') }} {{ qnty }} {{ $tc('comparisons.text.products') }}
                    </div>
                    <div class="comparisons__slider-btns">
                        <a class="comparisons__slider-btn" @click="$refs.thumbnails.goToPrev()">
                            <svg>
                                <use xlink:href="/images/sprite.svg#arrows__arr-long-left"></use>
                            </svg>
                        </a>
                        <a class="comparisons__slider-btn" @click="$refs.thumbnails.goToNext()">
                            <svg>
                                <use xlink:href="/images/sprite.svg#arrows__arr-long-right"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="comparisons__cards">
                <!-- top slider -->
                <agile ref="thumbnails" :as-nav-for="asNavFor2" :options="options">
                    <div class="comparisons__card" v-for="(product, index) in comparisons">
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
                                <svg class="comparisons__card-del-btn">
                                    <use xlink:href="/images/sprite.svg#icons__delete"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </agile>
            </div>
        </comparisons-top>

        <!-- bottom part of comparison -->

        <div class="comparisons__bottom">
            <div class="comparisons__comparing">
                <ul class="comparisons__sidebar">
                    <li class="comparisons__sidebar-item" v-for="item in Object.values(featuresTitle)">{{ item }}</li>
                </ul>

                <div class="comparisons__descriptions">
                    <!-- bottom slider -->
                    <agile ref="main" :as-nav-for="asNavFor1" :options="options">
                        <ul class="comparisons__description" v-for="product in comparisons">
                            <li>
                                <div></div>
                                {{ product.newPrice }}
                            </li>
                            <li v-for="item in Object.entries(featuresTitle)" v-if="item[0] !== 'price'">
                                {{ item[1] }}
                            </li>
                        </ul>
                    </agile>
                </div>
            </div>
            <a class="comparisons__deploy"
                :class="{'comparisons__deploy--extended': extended}"
                @click.prevent="deployList"
            >
                {{ $tc('comparisons.text.deploy') }}
                <svg viewBox="-2 -2 16 10">
                    <use xlink:href="/images/sprite.svg#arrows__arrow-down"></use>
                </svg>
            </a>
        </div>
        <!-- end of bottom part -->
    </section>
</template>

<script>
    import comparisonsTop from './sticky-comparisons-top.vue';
    import selectList from '../partials/select-list.vue';
    import { VueAgile } from 'vue-agile';

    export default {
        name: 'comparisons-listing',
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
                shownItemsQnty: 2,
                extended: false,
                featuresTitle: {
                    'price': 'Цена',
                    'weight': 'Вес',
                    'packagingLength': 'Длина в упаковке',
                    'torqueAdjustment': 'Число ступеней регулировки крутящего момента',
                    'reverse': 'Наличие реверса',
                    'discountType': 'Тип скидки',
                    'accumulatorCapacity': 'Емкость аккумулятора',
                    'batteryChargeIndicator': 'Индикатор заряда аккумуляторной батареи',
                    'barcode': 'Штрихкод',
                    'spindleRotationalSpeed': 'Частота вращения шпинделя',
                    'certificationLink': 'Ссылка на сертификат'
                },
                asNavFor1: [],
			    asNavFor2: [],
                options: {
                    infinite: false,
                    navButtons: false,
                    dots: false,
                    slidesToShow: 2,
                    unagile: false,
                    mobileFirst: true,

                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3
                            }
                        }
                    ]
                },
                
            }
        },
        methods: {
            changeShownQnty() {
                if (window.innerWidth < 768) {
                    this.shownItemsQnty = 2
                    this.qnty < 3 ? this.options.unagile = true : this.options.unagile = false
                } else if (window.innerWidth > 767 && this.qnty > 2) {
                    this.shownItemsQnty = 3
                    this.qnty == 3 ? this.options.unagile = true : this.options.unagile = false
                } else if (this.qnty < 3) {
                    this.options.responsive[0].settings.slidesToShow = 2;
                }
            },
            deployList() {
                this.extended = !this.extended
            }
        },
        computed: {
            comparisons() {
                return this.comparingItems
            },
            qnty() {
                return this.comparingItems.length
            },
            
        },
        created() {
            window.addEventListener('resize', this.changeShownQnty);
        },
        mounted () {
            this.changeShownQnty();
            this.asNavFor1.push(this.$refs.thumbnails)
		    this.asNavFor2.push(this.$refs.main)
        }

    }
</script>

<style>

</style>