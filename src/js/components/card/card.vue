<template>
    <div class="card" 
        :class="{'card--grid': cardGrid === 'grid',}"
        ref="card" 
    >
        <div class="card__top">
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
                <component class="card__header_in-favorite" is="in-favorite" :id="product.id" :favorite="product.is_favorite"></component>
            </div>
            <div class="card__image-block" 
                :class="{'card__image-block--short-card': cardSize === 'short'}"
            >
                <component is="slider-photo-card" 
                        :cardSize="cardSize"
                        :images="product.images"
                ></component>
    <!-- фото для горизонтальной карточки в десктопе -->
                <img class="card__image-block--horiz" :src="this.product.images[0].img" alt="фото товара">
    <!--  -->
            </div>
            <slot name="code"></slot>
        </div>

        <div class="card__bottom">
    <!-- описание горизонтальной карточки -->
            <div class="card__description-horiz">
                <slot name="code"></slot>
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
                </div>
                <slot name="description"></slot>
            </div>
    <!-- конец описания горизонтальной карточки -->

            <div class="card__price-horiz">
                <div class="card__price">
                    <slot name="price"></slot>
    <!-- кнопка добавления в избранные для горизонтальной карточки -->
                    <component class="card__header_in-favorite" is="in-favorite" :id="product.id" :favorite="product.is_favorite"></component>
    <!--  -->
                </div>
                <div class="card__button-block">
                    <component is="add-to-cart" @cloneCard="cloneCard" :productId="product.id" :max-amount="product.stock" :changeIcon="changeIcon" ></component>
                    <component is="to-compare" 
                               class="card__button-block_to-compare" 
                               :id="product.id" 
                               :compare="product.is_compare"
                    ></component>
                    <div @click="menuTooltip = !menuTooltip" class="card__menu-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div v-show="menuTooltip" class="card-menu-tooltip">
                        <div class="card-menu-tooltip__block">
                            <component is="in-favorite"
                                       :text="true"
                                       :mobile="true"
                                       :id="product.id"
                                       :favorite="product.is_favorite"
                            ></component>
                            <component is="to-compare"
                                       :text="true"
                                       :mobile="true"
                                       :id="product.id"
                                       :compare="product.is_compare"
                            ></component>
                        </div>
                        <svg class="card-menu-tooltip__close" @click="menuTooltip = false" viewBox="0 0 12 12">
                            <use @click.stop :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                        </svg>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import sliderPhotoCard from './slider-photo-card.vue';
import CardStikers from './card-stikers.vue';

export default {
    name: 'card',
    components: {
        sliderPhotoCard,
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
        cardGrid: {
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
            cardPosition: 0,
            cartTopPosition: 0,
            cartLeftPosition: 0
        }
    },
    methods: {
        menuBtnClick(e){
            console.log(e.target)
        },
        cloneCard(btn){
            if(window.innerWidth > 987){
                this.$eventBus.$emit("clickedToBtn")
                if(this.cartLeftPosition > 0){
                    let card = btn.closest('.card')
                    let clone = card.cloneNode(true)
                    let cardTop = card.getBoundingClientRect().top + document.documentElement.scrollTop
                    let cardLeft = card.getBoundingClientRect().left
                    let cardHeight = card.clientHeight
                    let cardWidth = card.offsetWidth
                    if(card.closest('.listing__grid--horiz')){
                    clone.classList.add('card-clone--horiz')
                    }
                    clone.style.width = cardWidth + 'px'
                    clone.style.height = cardHeight + 'px'
                    clone.style.top = cardTop + 'px'
                    clone.style.left = cardLeft + 'px'
                    clone.classList.add('card-clone')
                    document.querySelector('body').appendChild(clone)
                    setTimeout(() => {
                        clone.style.top = (this.cartTopPosition - (cardHeight / 2)) + 'px'
                        clone.style.left = (this.cartLeftPosition - (cardWidth / 2)) + 'px'
                        clone.style.transition = 1 + 's'
                        setTimeout(() => {
                            clone.parentNode.removeChild(clone)
                        }, 500);
                    }, 50);
                };
            }
        },
        cartPosition(obj){
            this.cartTopPosition = obj.top
            this.cartLeftPosition = obj.left
        }
    },
    mounted() {
        let card = this.$refs.card
        let c = card.getBoundingClientRect()
        this.cardPosition = c.left + c.width
    },
    created() {
        this.$eventBus.$on("cloneCard", this.cloneCard)
        this.$eventBus.$on("cartPosition", this.cartPosition)
    },
}
</script>