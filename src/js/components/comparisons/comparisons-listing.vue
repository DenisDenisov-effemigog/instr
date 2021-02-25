<template>
    <section class="comparisons" v-if="loaded">
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
        <comparisons-top>
            <div class="comparisons__category-selection">
                <select-list
                    :points="categories"
                    :selectopenSelect="defaultCategory"
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
                <div class="comparisons__slider-actions">
                    <div class="comparisons__slider-text">
                        1-{{shownItemsQnty}} {{ $tc('text.of') }} {{ qnty }} {{ $tc('comparisons.text.products') }}
                    </div>
                    <div class="comparisons__slider-btns">
                        <a class="comparisons__slider-btn">
                            <svg>
                                <use xlink:href="/images/sprite.svg#arrows__arr-long-left"></use>
                            </svg>
                        </a>
                        <a class="comparisons__slider-btn">
                            <svg>
                                <use xlink:href="/images/sprite.svg#arrows__arr-long-right"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="comparisons__cards">
                <div class="comparisons__card" v-for="product in comparisons">
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
            </div>
        </comparisons-top>
        <div class="container">
            <div class="comparisons__comparing">
                <ul class="comparisons__sidebar">
                    <li class="comparisons__sidebar-item" v-for="item in Object.values(featuresTitle)">{{ item }}</li>
                </ul>
                <div class="comparisons__descriptions">
                    <ul class="comparisons__description" v-for="product in comparisons">
                        <li>
                            <div></div>
                            {{ product.newPrice }}
                        </li>
                        <li v-for="item in Object.entries(featuresTitle)" v-if="item[0] !== 'price'">
                            {{ item[1] }}
                        </li>
                    </ul>
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
    </section>
    <div v-else class="preloader">
        <svg viewBox="0 0 145 145">
            <use :xlink:href="templatePath + 'images/sprite.svg#preloader'"></use>
        </svg>
        <div class="preloader__loading preloader__loading--first"></div>
        <div class="preloader__loading preloader__loading--second"></div>
    </div>
</template>

<script>
    import comparisonsTop from './sticky-comparisons-top.vue';
    import selectList from '../partials/select-list.vue';

    export default {
        name: 'comparisons-listing',
        components: { comparisonsTop, selectList },
        props: {
            comparingItems: {
                type: Array
            }
        },
        data() {
            return {
                loaded: false,
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
                }
                
            }
        },
        methods: {
            loading(){
                let vm = this
                setTimeout(function () {
                    vm.loaded = true
                }, 500)
            },
            changeShownQnty() {
                if (window.innerWidth < 768) {
                    this.shownItemsQnty = 2
                } else if (this.qnty > 2) {
                    this.shownItemsQnty = 3
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
            this.loading();
            window.addEventListener('resize', this.changeShownQnty);
        },

    }
</script>

<style>

</style>