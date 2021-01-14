<template>
    <div class="photo-modal">
        <div class="photo-modal__title">Просмотр фотографий</div>
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
        <div class="photo-modal__footer">
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
            <component is="media-button"
                       :svg="'play-btn'"
                       :action="'openVideo'"
                       :link="'http://www.youtube.com/embed/ODEsC4Ijc2o'"
            ></component>
            <component is="media-button"
                       :svg="'around-photo'"
                       :action="'openVideo'"
                       :link="'https://instrument.ru/info/3d_photo/14109/READY/3D.html'"
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