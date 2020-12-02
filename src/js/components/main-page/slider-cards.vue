<template>
    <div class="slider-cards">
        <div class="slider-cards__title">Еще одна интересная подборка со скроллом</div>
        <agile :options="options">
            <div class="slider-cards__slide"><card :changeIcon="changeIcon" @touchstart.prevent></card></div>
            <div class="slider-cards__slide"><card :changeIcon="changeIcon" @touchstart.prevent></card></div>
            <div class="slider-cards__slide"><card :changeIcon="changeIcon" @touchstart.prevent></card></div>
            <div class="slider-cards__slide"><card :changeIcon="changeIcon" @touchstart.prevent></card></div>
            <div class="slider-cards__slide"><card :changeIcon="changeIcon" @touchstart.prevent></card></div>
            <div class="slider-cards__slide"><card :changeIcon="changeIcon" @touchstart.prevent></card></div>
            <template slot="nextButton">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </template>
        </agile>
    </div>
</template>

<script>
    import {VueAgile} from 'vue-agile';
    import card from '../card/card.vue';

    export default {
        name: 'slider-cards',
        components: {
            agile: VueAgile,
            card
        },
        props: {
            changeIcon: {
                type: Boolean,
                default: false,
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
                                slidesToShow: 5,
                                dots: true,
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