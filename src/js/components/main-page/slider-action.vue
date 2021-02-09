<template>
    <div class="slider-action">
        <agile :options="options" class="agile_centered">

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
    </div>
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
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                navButtons: true,
                                slidesToShow: 3,
                                dots: false,
                            }
                        },
                    ]
                }
            }
        },
        methods: {
            oneSlide() {
                if (this.quantity < 3) {
                    this.options.infinite = false;
                    this.options.responsive[0].settings.navButtons = false
                }
            }
        },
        created() {
            this.oneSlide();
        }
    }
</script>