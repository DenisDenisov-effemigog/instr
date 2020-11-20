<template>
    <div class="slider-promo">
        <div class="slider-promo__title">Промо моменты</div>
        <agile :options="options">
            <div class="slider-promo__slide">
                <img src="./images/banners/promo1.png" alt="">
            </div>
            <div class="slider-promo__slide">
                <img src="./images/banners/promo2.png" alt="">
            </div>
            <div class="slider-promo__slide">
                <img src="./images/banners/promo3.png" alt="">
            </div>
            <div class="slider-promo__slide">
                <img src="./images/banners/promo4.png" alt="">
            </div>
            <div class="slider-promo__slide">
                <img src="./images/banners/promo5.png" alt="">
            </div>
            <div class="slider-promo__slide">
                <img src="./images/banners/promo6.png" alt="">
            </div>
            <template slot="prevButton">
                <svg>
                    <use :xlink:href="'./images/sprite.svg#arrows__arr-long-left'"></use>
                </svg>
            </template>
            <template slot="nextButton">
                <svg>
                    <use :xlink:href="'./images/sprite.svg#arrows__arr-long-right'"></use>
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
                options: {
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