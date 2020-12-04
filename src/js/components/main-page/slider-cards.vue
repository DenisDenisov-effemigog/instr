<template>
    <div class="slider-cards"
         :class="{'slider-cards--short-card': cardSize === 'short'}">
        <div class="slider-cards__title">{{ title }}</div>
        <agile :options="options">
            <div class="slider-cards__slide" v-for="product in products">
                <card 
                    :changeIcon="changeIcon" 
                    @touchstart.prevent
                    :cardSize="cardSize"
                    :product="product"
                ></card>
            </div>
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
            },
            title: {
                type: String,
                required: true,
            },
            dots: {
                type: Boolean,
                default: true,
            },
            cardSize: {
                type: String,
                default: '',
            },
            products: {
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
                                slidesToShow: 5,
                                dots: this.dots,
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