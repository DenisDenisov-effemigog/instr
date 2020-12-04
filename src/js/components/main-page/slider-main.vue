<template>
    <div class="slider-main">
        <agile :options="options" @after-change="showCurrentSlide($event)">
            
            <div class="slider-main__slide" v-for="slide in mainSlides">
                <img class="slider-main__slide_img" :src="slide.img">
                <a :href="slide.link" class="slider-main__slide_link" >Подробнее</a> 
            </div>
            
            <template slot="prevButton">
                <svg viewBox="0 0 10 12">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
                </svg>
            </template>
            <template slot="nextButton">
                <svg viewBox="0 0 6 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
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
        props: {
            mainSlides: {
                required: true,
                type: Array,
            }
        },
        data() {
            return {
                slideCurrent: 0,
                options: {
                    navButtons: false,
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
                            }
                        },
                    ]
                }
            }
        },
        methods: {
            showCurrentSlide(event) {
                let arrLeft = document.querySelector('.slider-main .agile__nav-button--prev')
                this.slideCurrent = event.currentSlide;
                if (arrLeft !== null) {
                    if (this.slideCurrent !== 0) {
                        arrLeft.style.display = 'block'
                    } else {
                        arrLeft.style.display = 'none'
                    }
                }
            },
        }
    }
</script>