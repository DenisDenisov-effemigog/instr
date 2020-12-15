<template>
    <div class="slider-promo">
        <div class="slider-promo__title">Промо моменты</div>
        <agile :options="options">
            
            <div @click="openModal" class="slider-promo__slide" v-for="slide in promoBanners">
                <div class="">
                    <img :src="slide.img" alt="">
                </div>
                <!-- <div class="slider-promo__modal">
                    <svg class="slider-promo__modal-icon">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__link'"></use>
                    </svg>
                    <p @click="openModal" class="slider-promo__modal-text">Подробнее об акции</p>
                </div> -->
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
        props: {
            promoBanners: {
                required: true,
                type: Array,
            }  
        },
        data() {
            return {
                options: {
                    slidesToShow: 2.5,
                    dots: false,
                    navButtons: false,
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
            openModal(){
                this.$eventBus.$emit("openModal", 'promo', false)
            }
        }
    }
</script>