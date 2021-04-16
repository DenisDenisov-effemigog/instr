<template> 
    <div>
        <!-- top part of comparison -->
        <comparisons-top>
            <div class="comparisons__category-selection">
                <div>
                    <select-list
                        v-if="!!categories"
                        :points="categories"
                        :selectopenSelect="categories[0]"
                        :sortingPage="'comparison'"
                        :placeholder="$tc('text.category')"
                        :selectName="'comparisons'"
                        @slider="reloadSlider"
                    >
                    </select-list>
                    <label @click.prevent="filterComparison">
                        <input
                            class="comparisons__checkbox"
                            type="checkbox"
                            v-model="onlyDiffer">
                        <span class="comparisons__checkbox-label">
                            <svg class="comparisons__checkbox-svg" viewBox="0 0 10 8">
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__checked'"></use>
                            </svg>
                        </span>
                        <span class="comparisons__checkbox-text">{{ $tc('comparisons.text.only_differences') }}</span>
                    </label>
                    <slot></slot>
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
                                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
                            </svg>
                        </a>
                        <a class="comparisons__slider-btn" @click="slideToNext">
                            <svg>
                                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-right'"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="comparisons__cards">
                <!-- top slider -->
                <agile ref="thumbnails" :options="options" @after-change="currentSlide($event)">
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
                                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
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
                    <li class="comparisons__item"  v-for="(item, itemIndex) in sliceList" :key="itemIndex">
                        <div class="comparisons__sidebar">
                            <div class="comparisons__sidebar-item">
                                {{ item }}
                            </div>
                        </div>
                        <div class="comparisons__descriptions">
                            <agile ref="main" :options="options" @after-change="currentSlide($event)">
                                <div class="comparisons__description" v-for="(product, index ) in comparisons" :key="index">
                                    <div class="comparisons__description-text" v-if="!!otherOptions[index][item]">{{otherOptions[index][item]}}</div>
                                    <div class="comparisons__description-text" v-else>—</div>
                                </div>
                                 <div class="comparisons__description comparisons__description--no-product" v-if="qnty == 1">

                                </div>
                            </agile> 
                        </div>
                    </li>
                </ul>
               
                <!-- below is an old bottom part. keep it in case -->

                <!-- <ul ref="sideList" class="comparisons__sidebar">
                    <li  class="comparisons__sidebar-item">Цена</li>
                    <li  class="comparisons__sidebar-item" v-for="item in Object.keys(comparisons[0].otherOptions)">{{ item }}</li>
                </ul>

                <div class="comparisons__descriptions"> -->
                    <!-- bottom slider -->
                    <!-- <agile ref="main" :as-nav-for="asNavFor1" :options="options">
                        <ul ref="descList" class="comparisons__description"
                            :class="{'comparisons__description--no-product': qnty === 1}"
                            v-for="product in comparisons" :key="product.id">
                            <li>
                                <div class="comparisons__sidebar-item">{{ $tc('text.price') }}</div>
                                <div class="comparisons__description-text">{{ product.newPrice }}</div>
                            </li>
                            <li v-for="(item, i) in sliceList(product.otherOptions)" :key="i">
                                <div class="comparisons__sidebar-item">{{ item[0] }}</div>
                                <div class="comparisons__description-text" v-if="!!item[1]">{{ item[1] }}</div>
                                <div class="comparisons__description-text" v-else>—</div>
                            </li>
                        </ul> -->
                        <!-- the second comparison is not chosen -->
                        <!-- <ul class="comparisons__description comparisons__description--no-product" v-if="comparisons.length === 1"></ul>
                    </agile>
                </div> -->
            </div>
            <a class="comparisons__deploy"
                :class="{'comparisons__deploy--expanded': expanded}"
                @click.prevent="expanded = true"
                v-if="!expanded && keysLength > 10"
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
            },
            categories:{
                type: Array
            },
        },
        data() {
            return {
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
                keysLength: 0,
                currentSlideNumber: 0,
                shownItemsQnty: 2,
                expanded: false,
                onlyDiffer: false,
                applyFilter: false,
                filteredProducts: []
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
            currentSlide(event){
                let vm = this
                if (window.innerWidth > 768 && this.qnty > 3) {
                    vm.currentSlideNumber = event.currentSlide;
                    if(vm.qnty <= vm.currentSlideNumber + vm.shownItemsQnty){
                        vm.$refs.thumbnails.goTo(vm.qnty - vm.shownItemsQnty)
                        vm.$refs.main.forEach(function(item){
                            item.goTo(vm.qnty - vm.shownItemsQnty)
                        })
                    }else{
                        this.$refs.main.forEach(function(item){
                            item.goTo(event.currentSlide)
                        })
                        vm.$refs.thumbnails.goTo(event.currentSlide)
                    }
                }else if (window.innerWidth < 768 && this.qnty > 2){
                    vm.currentSlideNumber = event.currentSlide;
                    if(vm.qnty <= vm.currentSlideNumber + vm.shownItemsQnty){
                        vm.$refs.thumbnails.goTo(vm.qnty - vm.shownItemsQnty)
                        vm.$refs.main.forEach(function(item){
                            item.goTo(vm.qnty - vm.shownItemsQnty)
                        })
                    }else{
                        this.$refs.main.forEach(function(item){
                            item.goTo(event.currentSlide)
                        })
                        vm.$refs.thumbnails.goTo(event.currentSlide)
                    }
                }else{
                    this.$refs.main.forEach(function(item){
                            item.goTo(0)
                        })
                        vm.$refs.thumbnails.goTo(0)
                }
                
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
            getKeysOtherOptions(list){
                let newArr = Object.keys(list[0])
                list.forEach(function(item){
                    Object.keys(item).forEach(function(item){
                        if(!newArr.includes(item)){
                            newArr.push(item)
                        }
                    })
                   
                })
                this.keysLength = newArr.length
                return newArr
            },
            applyListing(content) {
                this.$refs.thumbnails.goTo(0);
                this.applyFilter = true;
                this.onlyDiffer = false;
                this.expanded = false;
                this.filteredProducts = content.products
            },
            filterComparison() {
                if (this.comparisons.length !== 1) {
                    this.onlyDiffer = !this.onlyDiffer;
                }
                if (this.onlyDiffer) {
                    this.expanded = false
                }
            },
            reloadSlider(){
                let vm = this
                if(vm.otherOptions.length > 0){
                    vm.$refs.thumbnails.reload()
                    vm.$refs.main.forEach(function(item){
                        item.reload()
                    })
                }
            }
            // getSideItems(){
            //     if(window.innerWidth >= 1024){
            //         let sideItems = this.$refs.sideList.children
            //         let descList = this.$refs.descList
            //         descList.forEach(function(list){
            //             if(list.closest('.agile__slides--regular')){
            //                 for(let i = 1; i < list.children.length; i++){
            //                     let sideItemsH = sideItems[i].clientHeight
            //                     let itemsHeight = list.children[i].clientHeight
            //                     if(sideItemsH > itemsHeight){
            //                         list.children[i].style.height = sideItemsH + 'px'
            //                     }else{
            //                         sideItems[i].style.height = itemsHeight + 'px'
            //                     }
            //                 } 
            //             }
            //         })
            //     }
            // }
        },
        computed: {
            sliceList() {
                let keyArr = this.getKeysOtherOptions(this.otherOptions)
                if (this.expanded) {
                    return keyArr
                } else {
                    return keyArr.slice(0, 10)
                }
                
            },
            comparisons() {
                return this.applyFilter ? this.filteredProducts : this.comparingItems;
            },
            otherOptions() {
                return this.onlyDiffer ? this.filteredOptions : this.comparisons.map(item => item.otherOptions)
            },
            qnty() {
                return this.comparisons.length
            },
            deleteItemAtSliderEnd() {
                if ((this.currentSlideNumber + this.shownItemsQnty > this.qnty) && (this.qnty > 3)) {
                    this.$refs.thumbnails.goToPrev()
                }
            },
            filteredOptions() {
                const vm = this;
                const options = vm.comparisons.map(item => item.otherOptions);
                const otherOptionsKeys = this.getKeysOtherOptions(options);
                const uniqueKeysArr = [];
                const newArr = [];
                for(let i = 0; i < otherOptionsKeys.length; i++){
                    let dubl = options[0][otherOptionsKeys[i]]
                    options.forEach(function(item){
                        if(item[otherOptionsKeys[i]] !== dubl){
                            if(uniqueKeysArr.indexOf(otherOptionsKeys[i]) == -1){
                                uniqueKeysArr.push(otherOptionsKeys[i]);
                            }
                            return uniqueKeysArr
                        }
                    })
                }
                options.forEach(function(item){
                    let obj = {}
                    for(let i = 0; i <= uniqueKeysArr.length; i++){
                        for( let key in item){
                            if(key === uniqueKeysArr[i]){
                                obj[key] = item[key]
                            }
                        }; 
                    }
                    newArr.push(obj)
                })
                return newArr
            },
        },
        created() {
            this.comparisons;
            window.addEventListener('resize', this.changeShownQnty);
            this.$eventBus.$on('apply-comparison', this.applyListing);
        },
        beforeDestroy() {
            this.$eventBus.$off('apply-comparison');
        },
        mounted() {
            this.changeShownQnty();
            this.$refs.main.forEach(item => {
                this.asNavFor2.push(item);
            })
            this.asNavFor1.push(this.$refs.thumbnails);
            this.deleteItemAtSliderEnd;
        }
    }
</script>

<style>

</style>