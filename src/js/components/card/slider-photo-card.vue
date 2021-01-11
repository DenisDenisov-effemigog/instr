<template>
    <div class="slider-photo-card"
         :class="{'slider-photo-card_short-card': cardSize === 'short'}">
            <!-- @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd" -->
            <div class="slider-photo-card__slide">
                <img class="slider-photo-card__slide_image" v-for="slide in showSlide" :src="slide.img">
            </div>
            <div class="slider-photo-card__markers" @mouseleave="outSlide">
                <div @mouseenter="hoverSlide(marker.id)" class="slider-photo-card__marker" v-for="marker in images" ></div>
            </div>
            <slider-photo-dots
                :images="images"
                :currentSlide="currentSlide"
            ></slider-photo-dots>
    </div>
</template>

<script>
import SliderPhotoDots from './slider-photo-dots.vue'

export default {
    name: 'slider-photo-card',
    components: {
        SliderPhotoDots
    },
    props: {
        cardSize: {
            type: String,
            default: '',
        },
        images: {
            required: true,
            type: Array,
        },
    },
    data() {
        return {
            currentSlide: 1,
            startTouch:0,
            moveTouch:0
        }
    },
    methods: {
        hoverSlide(id){
            if(window.innerWidth > 768) {
                this.images.forEach(item => {
                    if(id == item.id){
                        this.currentSlide = item.id
                    }
                })
                this.activeDot
                return this.currentSlide
            }
        },
        outSlide(){
            this.activeDot
            return this.currentSlide = 1
        },
        // touchStart(e){
        //     this.startTouch = e.changedTouches[0].pageX
        // },
        // touchMove(e){
        //     this.moveTouch = e.changedTouches[0].pageX
        // },
        // touchEnd(){
        //     if(this.startTouch > this.moveTouch){
        //         if(this.currentSlide >= this.images.length ){
        //             this.currentSlide = 1
        //         }else{
        //             this.currentSlide++
        //         }
        //     }else{
        //         if(this.currentSlide <= 1){
        //             this.currentSlide =  this.images.length
        //         }else{
        //             this.currentSlide--
        //         }
        //     }
        // }
    },
    computed:{
        showSlide: function(){
            return this.images.filter(item => item.id == this.currentSlide)
        }
    }
}
</script>