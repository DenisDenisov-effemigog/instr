<template>
    <div class="product-card-slider">
        <VueSlickCarousel v-bind="settings" ref="main">
            <div style="width: 5px;">1</div>
            <div style="width: 5px;">2</div>
            <div style="width: 5px;">3</div>
            <div style="width: 5px;">4</div>
        </VueSlickCarousel>
        <VueSlickCarousel v-bind="settingsForPrev" ref="previous">
            <div style="width: 5px;">1</div>
            <div style="width: 5px;">2</div>
            <div style="width: 5px;">3</div>
            <div style="width: 5px;">4</div>
        </VueSlickCarousel>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'

export default {
    name: 'product-card-slider',
    components: {
        VueSlickCarousel
    },
    data() {
        return {
            settings: {
                dots: false,
                asNavFor: $refs.previous,
            },
            settingsForPrev: {
                dots: false,
                asNavFor: $refs.main,
                slidesToShow: 4,
                slidesToScroll: 1,
                vertical: true,
                verticalSwiping: true,
            }
        }
    },
    methods: {
    },
}
</script>