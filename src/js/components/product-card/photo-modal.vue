<template>
    <div class="photo-modal">
        <div class="photo-modal__title">{{ $tc('product_card.photo_modal.title') }}</div>
        <VueSlickCarousel
            class="photo-modal__main"
            v-bind="settings"
            ref="main"
            :asNavFor="$refs.previous"
        >
            <template #prevArrow>
                <svg class="photo-modal__main-arrow photo-modal__main-arrow--prev" viewBox="0 0 12 12">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
                </svg>
            </template>
            <div class="photo-modal__main-slide"
                 v-for="productImage in props.images"
                 :key="productImage.id"
            >
                <img :src="productImage.img" alt="">
            </div>
            <template #nextArrow>
                <svg class="photo-modal__main-arrow photo-modal__main-arrow--next" viewBox="0 0 11 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </template>
        </VueSlickCarousel>
        <div class="photo-modal__footer">
            <VueSlickCarousel
                class="photo-modal__previous"
                v-bind="settingsForPrev"
                ref="previous"
                :asNavFor="$refs.main"
            >
                <template #prevArrow>
                    <svg class="photo-modal__previous-arrow photo-modal__previous-arrow--prev" viewBox="1 2 7 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
                    </svg>
                </template>
                <div class="photo-modal__previous-slide"
                     v-for="productImage in props.images"
                     :key="productImage.id"
                >
                    <img :src="productImage.img" alt="">
                </div>
                <template #nextArrow>
                    <svg class="photo-modal__previous-arrow photo-modal__previous-arrow--next" viewBox="0 1 6 11">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </template>
            </VueSlickCarousel>
            <component is="media-button"
                       v-if="props.video"
                       :svg="'play-btn'"
                       :action="'openVideo'"
                       :link="props.video"
            ></component>
            <component is="media-button"
                       v-if="props.treeD"
                       :svg="'around-photo'"
                       :action="'openVideo'"
                       :link="props.treeD"
            ></component>
        </div>
    </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import mediaButton from "../media-button.vue";

export default {
    name: 'photo-modal',
    components: {
        VueSlickCarousel, mediaButton
    },
    props: {
        props: {
            required: true,
            type: Object,
        },
        currentSlide: {
            required: true,
            type: Number,
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
                initialSlide: this.currentSlide,
            },
            settingsForPrev: {
                dots: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                focusOnSelect: true,
                initialSlide: this.currentSlide,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            infinite: true,
                            slidesToShow: 2,
                            slidesToScroll: 4,
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