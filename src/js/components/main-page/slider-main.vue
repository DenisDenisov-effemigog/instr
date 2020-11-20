<template>
    <div class="slider-main">
        <agile :options="options" @after-change="showCurrentSlide($event)">
            <div class="slider-main__slide">
                <img class="slider-main__slide_img" src="./images/banners/main-banner.png" alt="">
                <a href="" class="slider-main__slide_link">Подробнее</a> 
            </div>
            <div class="slider-main__slide">
                <img class="slider-main__slide_img" src="./images/banners/main-banner.png" alt="">
                <a href="" class="slider-main__slide_link">Подробнее</a> 
            </div>
            <div class="slider-main__slide">
                <img class="slider-main__slide_img" src="./images/banners/main-banner.png" alt="">
                <a href="" class="slider-main__slide_link">Подробнее</a> 
            </div>
            <template slot="prevButton" v-if="slideCurrent !== 0">
                <svg viewBox="0 0 10 12">
                    <use :xlink:href="'./images/sprite.svg#arrows__arrow-left'"></use>
                </svg>
            </template>
            <template slot="nextButton">
                <svg viewBox="0 0 6 10">
                    <use :xlink:href="'./images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </template>
        </agile>
    </div>
</template>

<script>
    import {VueAgile} from 'vue-agile';

    export default {
        name: 'slider-main',
        components: {
            agile: VueAgile
        },
        data() {
            return {
                slideCurrent: 0,
                options: {
                    navButtons: false,
                    // autoplay: true,
                    fade: false,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                navButtons: true,
                                fade: false,
                                pauseOnDotsHover: true,
                                slidesToShow: 1,
                                dots: true,
                                // autoplaySpeed: 9000,
                            }
                        },
                    ]
                }
            }
        },
        methods: {
            showCurrentSlide(event) {
                this.slideCurrent = event;
            },
        }
    }
</script>