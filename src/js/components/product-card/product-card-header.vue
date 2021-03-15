<template>
    <div class="product-card__slider_header" ref="sliderHeader">
        <div class="product-card__stickers" 
             :class="{'product-card__stickers--close': stickers}">
            <component is="card-stikers"
                       v-for="tooltip in tooltips"
                       :key="tooltip.id"
                       :tooltip="tooltip"
            ></component>
        </div>
        <div class="product-card__actions">
            <component is="to-compare" :id="id" :compare="compare"></component>
            <component is="in-favorite" :id="id" :favorite="favorite"></component>
        </div>
    </div>
</template>

<script>
import inFavorite from '../in-favorite.vue';
import toCompare from '../to-compare.vue';
import CardStikers from '../card/card-stikers.vue';

export default {
    name: 'product-card-header',
    components: {
        inFavorite,
        toCompare,
        CardStikers,
    },
    props: {
        tooltips: {
            type: Array,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
        favorite: {
            type: Boolean,
            required: true,
        },
        compare: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            stickers: false
        }
    },
    methods: {
        showStickers(){
            this.stickers = true
        },
        hideStickers(){
            this.stickers = false
        },
    },
    created() {
        this.$eventBus.$on('showStickers', this.showStickers)
        this.$eventBus.$on('hideStickers', this.hideStickers)
    },
    mounted() {
        let sliderHeader = this.$refs.sliderHeader.getBoundingClientRect().left
        this.$eventBus.$emit('sliderHeader', sliderHeader)
    }
}
</script>