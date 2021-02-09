<template>
    <agile :options="options" class="agile_centered">

        <div @click="openModal(slide)" class="slider-promo__slide" v-for="slide in promoBanners">
            <div class="slider-promo__slide_content" 
                 :class="'slider-promo__slide_content--' + slide.theme"
            >
                <img :src="slide.img" alt="">
                <span class="slider-promo__slide_title">{{ slide.title }}</span>
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
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 6,
                                navButtons: true,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                navButtons: true,
                                slidesToShow: 5,
                                dots: false,
                            }
                        },
                    ]
                }
            }
        },
        methods: {
            openModal(slide){
                // через массив передаем оглавление, сообщение и текст кнопки модального окна - 3 элемеента
                this.$eventBus.$emit("openModal", 'dialogue', [slide.modal.title, slide.modal.description, this.$tc('modal.link.action')], false, true)
            },
            oneSlide() {
                if (this.promoBanners.length < 6) {
                    this.options.infinite = false;
                    this.options.responsive[1].settings.navButtons = false
                } else if (this.promoBanners.length < 7) {
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