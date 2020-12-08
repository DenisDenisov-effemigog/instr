<template>
    <div class="photo-modal">
        <!--<agile 
            class="photo-modal__main"
            :options="optionsMain"
            ref="main"
            :as-nav-for="asNavForMain"
        >
            <div class="photo-modal__main_slide" 
                 v-for="(slide, index) in productImages"
                 :key="index"
                 :class="`slide&#45;&#45;${index}`"
            >
                <img :src="slide.img" alt="">
            </div>

            <template slot="prevButton">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
                </svg>
            </template>
            <template slot="nextButton">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </template>
        </agile>
        <agile 
            class="photo-modal__prev"
            :options="optionsPrev"
            ref="prev"
            :as-nav-for="asNavForPrevious"
        >

            <div class="photo-modal__prev_slide"
                 v-for="(slide, index) in productImages"
                 :key="index"
                 :class="`slide&#45;&#45;${index}`"
                 @click="$refs.prev.goTo(index)"
            >
                <img :src="slide.img" alt="">
            </div>

            <template slot="prevButton">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
                </svg>
            </template>
            <template slot="nextButton">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </template>
        </agile>-->

        <VueSlickCarousel
            class="photo-modal__main"
            v-bind="settings"
            ref="main"
            :asNavFor="$refs.previous"
        >
            <template #prevArrow>
                <svg class="photo-modal__main_arrow photo-modal__main_arrow--prev" viewBox="0 0 12 12">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
                </svg>
            </template>
            <div class="photo-modal__main_slide"
                 v-for="productImage in productImages">
                <img :src="productImage.img" alt="">
            </div>
            <template #nextArrow>
                <svg class="photo-modal__main_arrow photo-modal__main_arrow--next" viewBox="0 0 11 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </template>
        </VueSlickCarousel>
        <VueSlickCarousel
            class="photo-modal__previous"
            v-bind="settingsForPrev"
            ref="previous"
            :asNavFor="$refs.main"
        >
            <template #prevArrow>
                <svg class="photo-modal__previous_arrow photo-modal__previous_arrow--prev" viewBox="1 2 7 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
                </svg>
            </template>
            <div class="photo-modal__previous_slide"
                 v-for="productImage in productImages">
                <img :src="productImage.img" alt="">
            </div>
            <template #nextArrow>
                <svg class="photo-modal__previous_arrow photo-modal__previous_arrow--next" viewBox="0 1 6 11">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </template>
        </VueSlickCarousel>
    </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

export default {
    name: 'photo-modal',
    components: {
        VueSlickCarousel
    },
    props: {
        productImages: {
            required: true,
            type: Array,
        }
    },
    data() {
        return {
            settings: {
                dots: false,
                focusOnSelect: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                draggable: false,
            },
            settingsForPrev: {
                dots: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false
                        }
                    }
                ],
            },
        }
    },
    mounted() {
        this.$nextTick(this.$forceUpdate);
    },
    methods: {
    },
}
</script>