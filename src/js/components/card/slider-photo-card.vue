<template>
    <div class="slider-photo-card">
        <agile :options="options">

            <div class="slider-photo-card__slide" v-for="slide in slides">
                <img class="slider-photo-card__slide_image" :src="slide.img">
                <div class="slider-photo-card__slide_image--hover">
                    <svg>
                        <use xlink:href="./images/sprite.svg#icons__mag"></use>
                    </svg>
                </div>
            </div>
            
        </agile>
    </div>
</template>

<script>
import {VueAgile} from 'vue-agile';

export default {
    name: 'slider-photo-card',
    components: {
        agile: VueAgile
    },
    data() {
        return {
            slideCurrent: 0,
            slides: [
                {id: 1, img: './images/product/image_50.png', link: ''},
                {id: 2, img: './images/product/image_51.png', link: ''},
                {id: 3, img: './images/product/image_52.png', link: ''},
                {id: 4, img: './images/product/image_53.png', link: ''},
            ],
            options: {
                navButtons: false,
                fade: false,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            navButtons: false,
                            fade: false,
                            pauseOnDotsHover: true,
                            slidesToShow: 1,
                            dots: true,
                            // autoplay: true,
                        }
                    },
                ]
            }
        }
    },
    methods: {
    },
}
</script>