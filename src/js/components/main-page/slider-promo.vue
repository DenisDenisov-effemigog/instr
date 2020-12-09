<template>
    <div class="slider-promo">
        <div class="slider-promo__title">Промо моменты</div>
        <agile :options="options">
            
            <div @mousemove="openTooltip" @mouseleave="closeTooltip" class="slider-promo__slide" v-for="slide in promoBanners">
                <a :href="slide.link" class="">
                    <img :src="slide.img" alt="">
                </a>
                <div class="slider-promo__modal">
                    <svg class="slider-promo__modal-icon">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__link'"></use>
                    </svg>
                    <p @click="openModal" class="slider-promo__modal-text">Подробнее об акции</p>
                </div>
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
                this.$eventBus.$emit("openModal", 'promo')
            },
            openTooltip(e){
                let elemPositionTop = e.target.getBoundingClientRect().top.toFixed(0)
                let elemPositionLeft = e.target.getBoundingClientRect().left.toFixed(0)
                var x = (e.pageX - elemPositionLeft).toFixed(0);
                var y = (Number(e.pageY) - (Number(elemPositionTop) + Number(window.pageYOffset))).toFixed(0)
                console.log(y)
                console.log(x)
            },
            closeTooltip(){

            }
        }
    }
</script>