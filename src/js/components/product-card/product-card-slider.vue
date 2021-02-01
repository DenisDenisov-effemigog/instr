<template>
    <div class="product-card-slider">
        <!-- <VueSlickCarousel
            class="product-card-slider__previous"
            v-bind="settingsForPrev"
            ref="previous"
            @beforeChange="current"
        >
            <template #prevArrow>
                <svg class="product-card-slider__previous_arrow" viewBox="0 0 10 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-top'"></use>
                </svg>
            </template>
            <div class="product-card-slider__previous_slide"
                 v-for="productImage in productImages">
                <img :src="productImage.img" alt="">
            </div>
            <template #nextArrow>
                <svg class="product-card-slider__previous_arrow" viewBox="0 0 12 12">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                </svg>
            </template>
        </VueSlickCarousel> -->
        <div class="product-card-slider__previous">
            <div>
                <svg ref="prev" class="product-card-slider__previous_arrow" viewBox="0 0 10 10" @click="prevSlide" :class="{'product-card-slider__previous_arrow--default': currentIndex == 0}">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-top'"></use>
                </svg>
            </div>
            <div class="product-card-slider__wrap">
                <ul class="product-card-slider__list" :style="`transform:translateY(${-transition}px)`">
                    <li @click=clickSlide(index) ref="slide" class="product-card-slider__item"
                        :class="{'product-card-slider__item--current': index === currentIndex}"
                        :data-index="index"
                        v-for="(productImage, index) in productImages"
                    >
                        <div class="product-card-slider__pic">
                            <img :src="productImage.img" alt="">
                        </div>
                    </li>
                </ul>
            </div>
            <div>
                <svg ref="next" class="product-card-slider__previous_arrow" viewBox="0 0 12 12" @click="nextSlide" :class="{'product-card-slider__previous_arrow--default': currentIndex == productImages.length - 1}">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                </svg>
            </div>
        </div>
        <VueSlickCarousel
            class="product-card-slider__main"
            v-bind="settings"
            ref="main"
        >
            <div class="product-card-slider__main_slide"
                 v-for="productImage in productImages"
                 @click="openModal" 
                 @mouseleave="hoverOff"
            >
                <img @mouseenter="hoverOn" :src="productImage.img" alt="">
                <div class="product-card-slider__zoom"
                    :class="{'product-card-slider__zoom--open': openZoom}"
                    ref="zoom"
                    @mousemove="zoomImg" 
                    :style="`background-image:url(${productImage.img}); background-position:${x}% ${y}%`"
                ></div>
            </div>
        </VueSlickCarousel>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'

export default {
    name: 'product-card-slider',
    components: {
        VueSlickCarousel
    },
    props: {
        productImages: {required: true, type: Array}  
    },
    data() {
        return {
            currentIndex: 0,
            transition: 0,
            x:0,
            y:0,
            openZoom: false,
            sliderHeader: 0,
            settings: {
                dots: false,
                arrows: false,
                focusOnSelect: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                draggable: false,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            dots: true
                        }
                    }
                ]
            },
        }
    },
    methods: {
        clickSlide(index){
            this.currentIndex = index
            this.$refs.main.goTo(this.currentIndex)
        },
        nextSlide(e){
            if(this.$refs.next.classList.contains('product-card-slider__previous_arrow--default')){
                e.preventDefault()
            }else{
                if(this.currentIndex < this.productImages.length - 1){
                    if(this.currentIndex <= this.productImages.length - 5){
                        this.transition = 73 * (this.currentIndex + 1)
                    }
                    this.currentIndex += 1
                    this.$refs.main.goTo(this.currentIndex)
                }else{
                    this.currentIndex = this.productImages.length - 1
                    this.$refs.main.goTo(this.currentIndex)
                }
            }
        },
        prevSlide(e){
            if(this.$refs.prev.classList.contains('product-card-slider__previous_arrow--default')){
                e.preventDefault()
            }else{
                if(this.currentIndex > 0){
                    if(this.currentIndex <= this.productImages.length - 4){
                        this.transition = 73 * (this.currentIndex - 1)
                    }
                    this.currentIndex -= 1
                    this.$refs.main.goTo(this.currentIndex)
                }else{
                    this.currentIndex = 0
                    this.$refs.main.goTo(this.currentIndex)
                }
            }
        },
        openModal(){
            this.$eventBus.$emit("openModal", 'product-card', this.productImages, true, true)
        },
        hoverOn(){
            if(window.innerWidth > 1024) {
                this.openZoom = true
                this.$eventBus.$emit('showStickers')
            }
        },
        hoverOff(){
            if(window.innerWidth > 1024) {
                this.openZoom = false
                this.$eventBus.$emit('hideStickers')
            }
            this.x = 0
            this.y = 0
        },
        zoomImg(e){
            if(window.innerWidth > 1024) {
                let zoomSlide = this.$refs.zoom
                let zoomSlideTop = zoomSlide.getBoundingClientRect().top + window.pageYOffset
                let zoomSlideWidth = zoomSlide.getBoundingClientRect().width
                let zoomSlideHeight = zoomSlide.getBoundingClientRect().height
                let mY = e.pageY - zoomSlideTop
                let mX = e.pageX - this.sliderHeader
                this.x = mX/zoomSlideWidth * 100
                this.y = mY/zoomSlideHeight * 100
            }
        },
        sliderHeaderPosition(sliderHeader){
            this.sliderHeader = sliderHeader
        }
    },
    created() {
        this.$eventBus.$on('sliderHeader', this.sliderHeaderPosition)
    },
    mounted() {
        this.$nextTick(this.$forceUpdate);
    },
}
</script>