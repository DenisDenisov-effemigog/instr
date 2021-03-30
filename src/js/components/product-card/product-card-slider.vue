<template>
    <div class="product-card-slider">
        <VueSlickCarousel
            class="product-card-slider__previous"
            v-bind="settingsForPrev"
            ref="previous"
            :asNavFor="$refs.main"
        >
            <template #prevArrow>
                <svg class="product-card-slider__previous-arrow" viewBox="0 0 10 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-top'"></use>
                </svg>
            </template>
            <div class="product-card-slider__previous-slide"
                 v-for="productImage in productImages"
                 :key="productImage.id"
            >
                <img :src="productImage.img" alt="">
            </div>
            <template #nextArrow>
                <svg class="product-card-slider__previous-arrow" viewBox="0 0 12 12">
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
            <div class="product-card-slider__main-slide"
                 v-for="(productImage, index) in productImages"
                 :key="index"
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
        productImages: {required: true, type: Array},
        videoLink: {required: true, type: String},
        theeDLink: {required: true, type: String},  
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
            let props = {images: this.productImages, video: this.videoLink, treeD: this.theeDLink}
            this.$eventBus.$emit("openModal", 'product-card', props, true, true, index)
        },
        hoverOn(){
            if(window.innerWidth > 1130) {
                this.openZoom = true
                this.$eventBus.$emit('showStickers')
            }
        },
        hoverOff(){
            if(window.innerWidth > 1130) {
                this.openZoom = false
                this.$eventBus.$emit('hideStickers')
            }
            this.x = 0
            this.y = 0
        },
        zoomImg(e){
            if(window.innerWidth > 1130) {
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
    computed: {
        navigationSlides() {
            if (this.productImages.length < 4) {
                this.settingsForPrev.slidesToShow = 2;
            } else if (this.productImages.length < 5) {
                this.settingsForPrev.slidesToShow = 3;
            }
        }
    },
    created() {
        this.$eventBus.$on('sliderHeader', this.sliderHeaderPosition);
        this.navigationSlides;
    },
    mounted() {
        this.$nextTick(this.$forceUpdate);
    },
}
</script>