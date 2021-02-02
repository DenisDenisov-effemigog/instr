<template>
    <div class="product-card-slider">
        <VueSlickCarousel
            class="product-card-slider__previous"
            v-bind="settingsForPrev"
            ref="previous"
            :asNavFor=this.$refs.main
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
            :asNavFor=this.$refs.previous

        >
            <div class="product-card-slider__main_slide"
                 v-for="(productImage, index) in productImages"
                 @click="openModal(index)" 
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
<<<<<<< HEAD
        productImages: {required: true, type: Array}
=======
        productImages: {required: true, type: Array},
        videoLink: {required: true, type: String},
        theeDLink: {required: true, type: String},  
>>>>>>> 187a4b1bfd38b2f35788cdc9d7065c46039d1894
    },
    data() {
        return {
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
        openModal(index){
            this.$eventBus.$emit("openModal", 'product-card', this.productImages, true, true, index)
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