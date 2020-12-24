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
        }
    }
</script>