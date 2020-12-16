<template>
    <div class="card">
        <div 
            class="card__header" 
            :class="{'card__header--short-card': cardSize === 'short'}"
        >
            <div class="card__stickers">
                <div 
                    class="card__stickers_sticker-wrap" 
                    v-for="tooltip in product.tooltips"
                    @mouseenter="openTooltip(product.id, tooltip.id)"
                    @mouseleave="closeTooltip"
                    @click="openTooltip(product.id, tooltip.id)"
                    
                >   
                    <div 
                        class="card__stickers_sticker card__stickers_sticker--new"
                        :class="'card__stickers_sticker--' + tooltip.status"
                    >
                        <span>{{ tooltip.title }}</span>
                    </div>
                    <div class="card__stickers_sticker-tooltip"
                        :class="{'card__stickers_sticker-tooltip-open': productId == product.id && tooltipId == tooltip.id}">
                        <div>
                            <div>{{ tooltip.text }}</div>
                            <a :href="tooltip.link">Подробнее</a>
                        </div>
                        <svg @click.stop="clickCloseTooltip" viewBox="0 0 12 12">
                            <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                        </svg>
                    </div>
                </div>
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

export default {
    name: 'card',
    components: {
        sliderPhotoCard,
        addToCart,
        inFavorite,
        toCompare,
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
            tooltipId: 0
        }
    },
    methods: {
        openTooltip(id, id2){
            this.productId = id
            this.tooltipId = id2
            let tooltip = document.querySelector('.card__stickers_sticker-tooltip-open')
            let c = tooltip.getBoundingClientRect()
            let tooltipX = c.left + c.width
            let windowWidth = window.screen.availWidth
            if(windowWidth < tooltipX){
                tooltip.classList.add('card__stickers_sticker-tooltip--rigth')
            }
        },
        closeTooltip(){
            this.productId = 0
            this.tooltipId = 0
            // let $this = e.target
            // let tooltip = $this.querySelector('.card__stickers_sticker-tooltip')
            // tooltip.classList.remove('card__stickers_sticker-tooltip-open')
            // if( tooltip.classList.contains('card__stickers_sticker-tooltip--rigth')) {
            //     tooltip.classList.remove('card__stickers_sticker-tooltip--rigth')
            // }
                
            // setTimeout(function (){
            // }, 4000)
        },
        clickCloseTooltip(){
            this.productId = 0
            this.tooltipId = 0
            // let $this = e.target
            // $this.parentElement.classList.remove('card__stickers_sticker-tooltip-open')
            // if( $this.parentElement.classList.contains('card__stickers_sticker-tooltip--rigth'))
            //     $this.parentElement.classList.remove('card__stickers_sticker-tooltip--rigth')
        },
        menuBtnClick(e){
            console.log(e.target)
        }
    },
}
</script>