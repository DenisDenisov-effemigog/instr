<template>
    <agile :options="options" class="agile--centered">

        <slot></slot>

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
</template>

<script>
    import {VueAgile} from 'vue-agile';

    export default {
        name: 'slider-action',
        components: {
            agile: VueAgile
        },
        props: {
            quantity: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                options: {
                    slidesToShow: 1.5,
                    dots: false,
                    navButtons: false,
                    infinite: true,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                navButtons: true,
                                slidesToShow: 3,
                                dots: false,
                                infinite: true,
                            }
                        },
                    ]
                }
            }
        },
        methods: {
            oneSlide() {
                if (this.quantity < 4) {
                    this.options.responsive[0].settings.infinite = false;
                    this.options.responsive[0].settings.navButtons = false
                }
            }
        },
        created() {
            this.oneSlide();
        }
    }
</script>