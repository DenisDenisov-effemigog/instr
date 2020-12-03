<template>
    <ul v-show="slides.length > 1" class="slider-photo-card__dots">
        <li class="slider-photo-card__dot" :class="{'slider-photo-card__dot--active': dot.id == currentSlide}" v-for="dot in slides" :data-slide="dot.id">
        </li>
    </ul>
</template>

<script>
export default {
    name:"slider-photo-dots",
    props:{
        slides:{
            type: Array
        },
        currentSlide:{
            type: Number,
            default:1
        }
    }
}
</script>