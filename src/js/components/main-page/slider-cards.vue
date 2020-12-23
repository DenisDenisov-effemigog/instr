<template>
    <agile :options="options">
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
                                unagile: false,
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