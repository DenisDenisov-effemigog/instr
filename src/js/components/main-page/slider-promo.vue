<template>
    <div class="slider-promo">
        <div class="slider-promo__title">Промо моменты</div>
        <agile :options="options">
            
            <div class="slider-promo__slide" v-for="slide in slides">
                <a :href="slide.link" class="">
                    <img :src="slide.img" alt="">
                </a>
            </div>
            
            <template slot="prevButton">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
                </svg>
            </template>
            <template slot="nextButton">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-right'"></use>
                </svg>
            </template>
        </agile>
    </div>
</template>

<script>
    import {VueAgile} from 'vue-agile';

    export default {
        name: 'slider-promo',
        components: {
            agile: VueAgile
        },
        data() {
            return {
                slides: [
                    {id: 1, img: './demo_images/banners/promo1.png', link: ''},
                    {id: 2, img: './demo_images/banners/promo3.png', link: ''},
                    {id: 3, img: './demo_images/banners/promo4.png', link: ''},
                    {id: 4, img: './demo_images/banners/promo5.png', link: ''},
                    {id: 5, img: './demo_images/banners/promo6.png', link: ''},
                    {id: 6, img: './demo_images/banners/promo3.png', link: ''},
                    {id: 7, img: './demo_images/banners/promo4.png', link: ''},
                    {id: 8, img: './demo_images/banners/promo5.png', link: ''},
                ],
                options: {
                    slidesToShow: 2.5,
                    dots: false,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                navButtons: true,
                                slidesToShow: 6,
                                dots: false,
                            }
                        },
                    ]
                }
            }
        },
        methods: {
        }
    }
</script>