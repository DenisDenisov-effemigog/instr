<template>
    <div class="product-card-slider">
        <VueSlickCarousel
            class="product-card-slider__previous"
            v-bind="settingsForPrev"
            ref="previous"
            :asNavFor="$refs.main"
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
        </VueSlickCarousel>
        <VueSlickCarousel
            class="product-card-slider__main"
            v-bind="settings"
            ref="main"
            :asNavFor="$refs.previous"
        >
            <div class="product-card-slider__main_slide"
                 v-for="productImage in productImages"
                 @click="openModal" 
                 @mouseleave="hoverOff"
            >
                <img @mouseenter="hoverOn" :src="productImage.img" alt="">
                <div @mousemove="zoomImg" class="product-card-slider__zoom" :class="{'product-card-slider__zoom--open': flag}" :style="`background-image:url(${productImage.img}); background-position:${x}% ${y}%`"></div>
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
            x:0,
            y:0,
            flag: false,
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
            settingsForPrev: {
                dots: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                vertical: true,
                verticalSwiping: true,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            
                        }
                    }
                ]
            },
        }
    },
    methods: {
        openModal(){
            this.$eventBus.$emit("openModal", 'product-card', this.productImages, true)
        },
        hoverOn(){
            if(window.innerWidth > 768) {
                this.flag = true
                let productStickers = document.querySelector('.product-card__stickers')
                productStickers.classList.add('product-card__stickers--close')
            }
            
        },
        hoverOff(){
            if(window.innerWidth > 768) {
                this.flag = false
                let productStickers = document.querySelector('.product-card__stickers')
                productStickers.classList.remove('product-card__stickers--close')
            }
            this.x = 0
            this.y = 0
        },
        zoomImg(e){
            if(window.innerWidth > 768) {
                let zoomSlide = document.querySelector('.product-card-slider__zoom')
                let zoomSlideTop = zoomSlide.getBoundingClientRect().top + window.pageYOffset
                let slideHeader = document.querySelector('.product-card__slider_header').getBoundingClientRect().left
                let zoomSlideWidth = zoomSlide.getBoundingClientRect().width
                let zoomSlideHeight = zoomSlide.getBoundingClientRect().height
                let mY = e.pageY - zoomSlideTop
                let mX = e.pageX - slideHeader
                this.x = mX/zoomSlideWidth * 100
                this.y = mY/zoomSlideHeight * 100
            }
        }
    },
    mounted() {
        this.$nextTick(this.$forceUpdate);
    },
}
</script>