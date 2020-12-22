<template>
    <div class="slider-main">
        <agile :options="options" 
               @after-change="showCurrentSlide($event)" 
               ref="mainSlider"
        >
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
        name: 'slider-main',
        components: {
            agile: VueAgile
        },
        props: {
            mainSlides: {
                required: true,
                type: Array,
            }
        },
        data() {
            return {
                slideCurrent: 0,
                options: {
                    navButtons: false,
                    fade: false,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                navButtons: true,
                                fade: false,
                                pauseOnDotsHover: true,
                                slidesToShow: 1,
                                dots: true,
                            }
                        },
                    ]
                }
            }
        },
        methods: {
            showCurrentSlide(event) {
                let arrLeft = this.$refs.mainSlider.$refs.prevButton
                this.slideCurrent = event.currentSlide;
                if (arrLeft !== undefined) {
                    if (this.slideCurrent !== 0) {
                        arrLeft.style.display = 'flex'
                    } else {
                        arrLeft.style.display = 'none'
                    }
                }
            },
        }
    }
</script>