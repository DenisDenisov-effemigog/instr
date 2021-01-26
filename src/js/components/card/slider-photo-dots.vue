<template>
    <ul v-show="images.length > 1" class="slider-photo-card__dots">
        <li class="slider-photo-card__dot" :class="{'slider-photo-card__dot--active': dot.id == currentSlide}" v-for="dot in images" :data-slide="dot.id">
        </li>
    </ul>
</template>

<script>
export default {
    name:"slider-photo-dots",
    props:{
        images:{
            type: Array
        },
        currentSlide:{
            type: Number,
            default:1
        }
    }
}
</script>