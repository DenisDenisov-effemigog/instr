<template>
    <div class="slider-photo-card">
            <div class="slider-photo-card__slide">
                <img class="slider-photo-card__slide_image" :src="a">
            </div>
            <div class="slider-photo-card__markers" @mouseleave="outSlide">
                <div @mouseenter="hoverSlide(marker.id)" class="slider-photo-card__marker" v-for="marker in slides" ></div>
            </div>
            <ul class="slider-photo-card__dots">
                <li class="slider-photo-card__dot" v-for="dot in slides">
                    
                </li>
            </ul>
    </div>
</template>

<script>

export default {
    name: 'slider-photo-card',
    components: {
    },
    data() {
        return {
            slides: [
                {id: 1, img: './demo_images/product/image_50.png', link: ''},
                {id: 2, img: './demo_images/product/image_51.png', link: ''},
                {id: 3, img: './demo_images/product/image_52.png', link: ''},
                {id: 4, img: './demo_images/product/image_53.png', link: ''},
            ],
            a:'./demo_images/product/image_50.png'
        }
    },
    methods: {
        hoverSlide(id){
            this.slides.forEach(item => {
                if(id == item.id){
                    this.a = item.img
                }
            })
            return this.a
            
        },
        outSlide(){
            return this.a = './demo_images/product/image_50.png'
        }
    },
}
</script>