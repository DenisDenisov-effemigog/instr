<template>
    <agile :options="options" @click="doStopScroll" ref="sliderCard">
        <slot></slot>
        <template slot="nextButton">
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
            </svg>
        </template>
    </agile>
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
            dots: {
                type: Boolean,
                default: true,
            },
            quantity: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                options: {
                    slidesToShow: 2.5,
                    dots: false,
                    navButtons: false,
                    infinite: true,
                    responsive: [
                        {
                            breakpoint: 1320,
                            settings: {
                                slidesToShow: 5,
                                dots: this.dots,
                                infinite: true,
                            }
                        },
                        {
                            breakpoint: 650,
                            settings: {
                                navButtons: true,
                                slidesToShow: 4,
                                infinite: true,
                            }
                        },
                    ]
                }
            }
        },
        methods: {
            doStopScroll(event) {
                console.log('event.type')
            },
            oneSlide() {
                if (this.quantity < 5) {
                    this.options.responsive[1].settings.infinite = false;
                    this.options.responsive[1].settings.navButtons = false
                } else if (this.quantity < 6) {
                    this.options.responsive[0].settings.infinite = false;
                    this.options.responsive[0].settings.navButtons = false
                }
            }
        },
        mounted() {
            // this.$refs.sliderCard.removeEventListener('touchmove', this.handleMouseMove)
        },
        created() {
            this.oneSlide();
        }
    }
</script>