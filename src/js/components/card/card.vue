<template>
    <div class="card">
        <div class="card__header">
            <div class="card__stickers">
                <div 
                    class="card__stickers_sticker-wrap" 
                    v-for="tooltip in product.tooltips"
                    @mouseenter="openTooltip"
                    @mouseleave="closeTooltip"
                    @click="openTooltip"
                >   
                    <div 
                        class="card__stickers_sticker card__stickers_sticker--new"
                        :class="'card__stickers_sticker--' + tooltip.status"
                    >
                        <span>{{ tooltip.title }}</span>
                    </div>
                    <div class="card__stickers_sticker-tooltip">
                        <div>
                            <div>{{ tooltip.text }}</div>
                            <a :href="tooltip.link">Подробнее</a>
                        </div>
                        <svg @click="clickCloseTooltip" viewBox="0 0 12 12">
                            <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div 
                class="card__favorite-btn" 
                :class="{'card__favorite-btn--active': inFavorite}" 
                @click="inFavorite = !inFavorite"
            >
                <svg v-if="!inFavorite">
                    <use :xlink:href="templatePath + './images/sprite.svg#icons__heart'"></use>
                </svg>
                <svg v-else>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__heart-full'"></use>
                </svg>
            </div>
        </div>
        <div class="card__image-block">
            <component is="slider-photo-card"></component>
        </div>
        <div class="card__code">{{ product.code}}</div>
        <a :href="product.link" class="card__name">
            {{ product.title }}
        </a>
        <div class="card__price-block">
            <div class="card__price-block_old-price">{{ product.oldPrice}} RON</div>
            <div class="card__price-block_current-price">{{ product.newPrice }} RON</div>
        </div>
        <div class="card__button-block">
            <addToCart :changeIcon="changeIcon"></addToCart>
            <div 
                class="card__compare-btn"
                :class="{'card__compare-btn--active': inCompare}"
                @click="inCompare = !inCompare"
            >
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__graf'"></use>
                </svg>
            </div>
            <div @click="menuTooltip = !menuTooltip" class="card__menu-btn">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div v-show="menuTooltip" class="card__menu-tooltip">
                <div>
                    <div 
                        class="card__favorite-btn card__favorite-btn__mobile" 
                        :class="{'card__favorite-btn--active': inFavorite}" 
                        @click="inFavorite = !inFavorite"
                    >
                        <svg v-if="!inFavorite" viewBox="0 0 18 15">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__heart'"></use>
                        </svg>
                        <svg v-else viewBox="0 0 18 15">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__heart-full'"></use>
                        </svg>
                        <span>В избранное</span>
                    </div>
                    <div 
                        class="card__compare-btn card__compare-btn__mobile"
                        :class="{'card__compare-btn--active': inCompare}"
                        @click="inCompare = !inCompare"
                    >
                        <svg viewBox="0 0 18 15">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__graf'"></use>
                        </svg>
                        <span>Сравнить</span>
                    </div>
                </div>
                <svg @click="menuTooltip = false" viewBox="0 0 12 12">
                    <use @click.stop :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import sliderPhotoCard from './slider-photo-card.vue';
import addToCart from './add-to-cart.vue';

export default {
    name: 'card',
    components: {
        sliderPhotoCard,
        addToCart
    },
    props: {
        changeIcon: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            menuTooltip: false,
            inFavorite: false,
            inCompare: false,
            product: 
                {
                    id: 1, 
                    title: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel', 
                    link: '',
                    code: 717950,
                    oldPrice: '3 819.27',
                    newPrice: '2 819.27',
                    tooltips: [
                        {
                            id: 1, 
                            title: 'Новинка', 
                            text: 'Товар находится в акционной категории товаров “Новинка”', 
                            link: '',
                            status: 'new',
                        },
                        {
                            id: 2, 
                            title: 'Акция', 
                            text: 'Товар участвует в акции “Акция”', 
                            link: '',
                            status: 'promo',
                        },
                    ]
                },
        }
    },
    methods: {
        openTooltip(e){
            let $this = e.target
            if($this.classList.contains('card__stickers_sticker-wrap')){
                let tooltip = $this.querySelector('.card__stickers_sticker-tooltip')
                tooltip.classList.add('card__stickers_sticker-tooltip-open')
                let c = tooltip.getBoundingClientRect()
                let tooltipX = c.left + c.width
                let windowWidth = window.screen.availWidth
                if(windowWidth < tooltipX){
                    tooltip.classList.add('card__stickers_sticker-tooltip--rigth')
                }
            }
            
        },
        closeTooltip(e){
            let $this = e.target
            let tooltip = $this.querySelector('.card__stickers_sticker-tooltip')
            setTimeout(function (){
                tooltip.classList.remove('card__stickers_sticker-tooltip-open')
                if( tooltip.classList.contains('card__stickers_sticker-tooltip--rigth'))
                    tooltip.classList.remove('card__stickers_sticker-tooltip--rigth')
            }, 4000)
        },
        clickCloseTooltip(e){
            let $this = e.target
            $this.parentElement.classList.remove('card__stickers_sticker-tooltip-open')
            if( $this.parentElement.classList.contains('card__stickers_sticker-tooltip--rigth'))
                $this.parentElement.classList.remove('card__stickers_sticker-tooltip--rigth')
        },
        menuBtnClick(e){
            console.log(e.target)
        }
    },
}
</script>