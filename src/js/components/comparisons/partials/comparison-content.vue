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
                <div class="comparisons__cards-wrap" ref="top">
                    <!-- top slider -->
                    <div class="comparisons__card" 
                        @touchstart="touchstart"
                        @touchmove="touchmove"
                        @touchend="touchend"
                        :class="{'comparisons__card--width-50': qnty <= 2}"
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
                                        :comparisonPage="true"
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
                </div>
            </div>
        </comparisons-top>

        <!-- the bottom part of comparison -->

        <div class="comparisons__bottom">
            <div class="comparisons__comparing">
                <ul class="comparisons__list"
                    @touchstart="touchstart"
                    @touchmove="touchmove"
                    @touchend="touchend"
                >
                    <li class="comparisons__item"  >
                        <div class="comparisons__sidebar">
                            <div class="comparisons__sidebar-item">
                                {{ $tc('text.price') }}
                            </div>
                        </div>
                        <div class="comparisons__descriptions">
                            <div class="comparisons__descriptions-wrap" ref="price">
                                <div class="comparisons__description" v-for="(item, itemIndex) in comparisons" :key="itemIndex" :class="{'comparisons__description--mod': qnty <= 2}" >
                                    <div class="comparisons__description-text" >{{item.newPrice}}&nbsp;{{ $tc('text.currency') }}</div>
                                </div>
                                <div class="comparisons__description comparisons__description--no-product" v-if="qnty == 1">

                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="comparisons__item"  v-for="(item, itemIndex) in sliceList" :key="itemIndex">
                        <div class="comparisons__sidebar">
                            <div class="comparisons__sidebar-item">
                                {{ item }}
                            </div>
                        </div>
                        <div class="comparisons__descriptions">
                            <div class="comparisons__descriptions-wrap" ref="main">
                                <div class="comparisons__description" :class="{'comparisons__description--mod': qnty <= 2}" v-for="(product, index ) in comparisons" :key="index">
                                    <div class="comparisons__description-text" v-if="!!otherOptions[index][item]">{{otherOptions[index][item]}}</div>
                                    <div class="comparisons__description-text" v-else>—</div>
                                </div>
                                 <div class="comparisons__description comparisons__description--no-product" v-if="qnty == 1">

                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <a class="comparisons__deploy"
                :class="{'comparisons__deploy--expanded': expanded}"
                @click.prevent="expandedClick()"
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
                keysLength: 0,
                currentSlideNumber: 0,
                shownItemsQnty: 2,
                expanded: false,
                onlyDiffer: false,
                applyFilter: false,
                filteredProducts: [],
                slideWidth:0,
                startMoveX: 0,
                startMoveY: 0,
                directionFlag: '',
                startTime: 0,
                endTime: 0,
                swipe: true
            }
        },
        methods: {
            touchstart(event){
                this.startMoveX = event.changedTouches[0].pageX
                this.startTime = new Date().getTime()
                this.startMoveY = event.changedTouches[0].pageY
            },
            touchmove(event){
                if(this.startMoveX < event.changedTouches[0].pageX){
                    this.directionFlag = true
                }else{
                    this.directionFlag = false
                }
            },
            touchend(event){
                let pointX = Math.abs(this.startMoveX - event.changedTouches[0].pageX)
                let pointY = Math.abs(this.startMoveY - event.changedTouches[0].pageY)
                // console.log("pointX " + pointX);
                // console.log("pointY " + pointY);
                 if(pointX < pointY && pointY > 6){
                    this.swipe = false
                }else{
                    this.swipe = true
                }
                this.endTime = new Date().getTime()
                if(this.directionFlag){
                    if(this.endTime - this.startTime > 80 && this.swipe)
                        this.slideToPrev()
                }else{
                    if(this.endTime - this.startTime > 80 && this.swipe)
                        this.slideToNext()
                }
            },
            slideToPrev() {
                let vm = this
                if (vm.currentSlideNumber > 0 && window.innerWidth > 767 && this.qnty > 3) {
                    vm.currentSlideNumber--
                    vm.$refs.top.style.transform = `translateX(-${vm.currentSlideNumber * vm.slideWidth}px)`
                    vm.$refs.price.style.transform = `translateX(-${vm.currentSlideNumber * vm.slideWidth}px)`
                    vm.$refs.main.forEach(function(item){
                        item.style.transform = `translateX(-${vm.currentSlideNumber * vm.slideWidth}px)`
                    })
                }else if(vm.currentSlideNumber > 0 && window.innerWidth < 767 && this.qnty > 2){
                    vm.currentSlideNumber--
                    vm.$refs.top.style.transform = `translateX(-${vm.currentSlideNumber * vm.slideWidth}px)`
                    vm.$refs.price.style.transform = `translateX(-${vm.currentSlideNumber * vm.slideWidth}px)`
                    vm.$refs.main.forEach(function(item){
                        item.style.transform = `translateX(-${vm.currentSlideNumber * vm.slideWidth}px)`
                    })
                }
            },
            slideToNext() {
                let vm = this
                if (window.innerWidth > 767 && this.qnty > 3 && vm.currentSlideNumber !== (vm.qnty - vm.shownItemsQnty)) {
                    vm.currentSlideNumber++
                    vm.$refs.top.style.transform = `translateX(-${vm.currentSlideNumber * vm.slideWidth}px)`
                    vm.$refs.price.style.transform = `translateX(-${vm.currentSlideNumber * vm.slideWidth}px)`
                    vm.$refs.main.forEach(function(item){
                        item.style.transform = `translateX(-${vm.currentSlideNumber * vm.slideWidth}px)`
                    })
                }else if(window.innerWidth < 767 && this.qnty > 2 && vm.currentSlideNumber !== (vm.qnty - vm.shownItemsQnty)){
                    vm.currentSlideNumber++
                    vm.$refs.top.style.transform = `translateX(-${vm.currentSlideNumber * vm.slideWidth}px)`
                    vm.$refs.price.style.transform = `translateX(-${vm.currentSlideNumber * vm.slideWidth}px)`
                    vm.$refs.main.forEach(function(item){
                        item.style.transform = `translateX(-${vm.currentSlideNumber * vm.slideWidth}px)`
                    })
                }
            },
            changeShownQnty() {
                if (window.innerWidth < 768) {
                    this.shownItemsQnty = 2
                } else if (window.innerWidth > 767 && this.qnty > 2) {
                    this.shownItemsQnty = 3
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
                let vm = this
                this.currentSlideNumber = 0;
                vm.$refs.top.style.transform = 'translateX(0)'
                vm.$refs.price.style.transform = 'translateX(0)'
                vm.$refs.main.forEach(function(item){
                    item.style.transform = 'translateX(0)'
                })
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
            setSlideWidth(){
                    let vm = this
                    vm.$refs.main.forEach(function(item){
                        item.children.forEach(function(elem){
                            elem.style.minWidth = vm.slideWidth + 'px'
                        })
                    })
                    vm.$refs.price.children.forEach(function(elem){
                        elem.style.minWidth = vm.slideWidth + 'px'
                    })
            },
            getSlideWidht(){
                this.slideWidth = this.$refs.top.children[0].offsetWidth
                return this.slideWidth
            },
            expandedClick(){
                let vm = this
                vm.expanded = true;
                setTimeout(() => {
                    vm.setSlideWidth()
                }, 0);
            },
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
            // deleteItemAtSliderEnd() {
            //     if ((this.currentSlideNumber + this.shownItemsQnty > this.qnty) && (this.qnty > 3)) {
            //         this.$refs.thumbnails.goToPrev()
            //     }
            // },
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
            window.addEventListener('resize', this.getSlideWidht);
            window.addEventListener('resize', this.setSlideWidth);
            this.$eventBus.$on('apply-comparison', this.applyListing);
        },
        beforeDestroy() {
            this.$eventBus.$off('apply-comparison');
        },
        mounted() {
            this.getSlideWidht();
            this.setSlideWidth()
            this.changeShownQnty();
            this.deleteItemAtSliderEnd;
        }
    }
</script>

<style>

</style>