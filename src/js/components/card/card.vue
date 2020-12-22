<template>
    <div class="card" ref="card">
        <div 
            class="card__header" 
            :class="{'card__header--short-card': cardSize === 'short'}"
        >
            <div class="card__stickers">
                <card-stikers v-for="tooltip in product.tooltips"
                              :tooltip="tooltip"
                              :cardPosition="cardPosition"
                ></card-stikers>
            </div>
            <component class="card__header_in-favorite" is="in-favorite"></component>
        </div>
        <div class="card__image-block" 
             :class="{'card__image-block--short-card': cardSize === 'short'}"
        >
            <component is="slider-photo-card" 
                       :cardSize="cardSize"
                       :images="product.images"
            ></component>
        </div>
        <slot></slot>
        <div class="card__button-block">
            <component is="add-to-cart" :productId="product.id" :max-amount="product.stock" :changeIcon="changeIcon" ></component>
            <component class="card__button-block_to-compare" is="to-compare"></component>
            <div @click="menuTooltip = !menuTooltip" class="card__menu-btn">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div v-show="menuTooltip" class="card__menu-tooltip">
                <div>
                    <component is="in-favorite"
                               :text="true"
                               :mobile="true"
                    ></component>
                    <component is="to-compare"
                               :text="true"
                               :mobile="true"
                    ></component>
                </div>
                <svg class="card__menu-tooltip-close" @click="menuTooltip = false" viewBox="0 0 12 12">
                    <use @click.stop :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import sliderPhotoCard from './slider-photo-card.vue';
import addToCart from './add-to-cart.vue';
import inFavorite from '../in-favorite.vue';
import toCompare from '../to-compare.vue';
import CardStikers from './card-stikers.vue';

export default {
    name: 'card',
    components: {
        sliderPhotoCard,
        addToCart,
        inFavorite,
        toCompare,
        CardStikers,
    },
    props: {
        changeIcon: {
            type: Boolean,
            default: false,
        },
        cardSize: {
            type: String,
            default: '',
        },
        product: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            menuTooltip: false,
            productId: 0,
            tooltipId: 0,
            cardPosition: 0
        }
    },
    methods: {
        menuBtnClick(e){
            console.log(e.target)
        }
    },
    mounted() {
        let card = this.$refs.card
        let c = card.getBoundingClientRect()
        this.cardPosition = c.left + c.width
    }
}
</script>