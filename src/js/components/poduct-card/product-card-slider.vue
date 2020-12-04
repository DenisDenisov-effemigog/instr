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
                 v-for="productImage in productImages">
                <img :src="productImage.img" alt="">
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
    data() {
        return {
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
            productImages: [
                {img: './demo_images/product-big/image-70.png'},
                {img: './demo_images/product-big/image-71.png'},
                {img: './demo_images/product-big/image-72.png'},
                {img: './demo_images/product-big/image-73.png'},
                {img: './demo_images/product-big/image-74.png'},
                {img: './demo_images/product-big/image-75.png'},
                {img: './demo_images/product-big/image-76.png'},
                {img: './demo_images/product-big/image-77.png'},
                {img: './demo_images/product-big/image-78.png'},
            ],
        }
    },
    methods: {
    },mounted() {
        this.$nextTick(this.$forceUpdate);
    },
}
</script>