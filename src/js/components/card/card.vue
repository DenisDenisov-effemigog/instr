<template>
    <div class="card">
        <div class="card__header">
            <div class="card__stickers">
                <div 
                    class="card__stickers_sticker-wrap" 
                    v-for="tooltip in product.tooltips"
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
                        <svg viewBox="0 0 12 12">
                            <use xlink:href="./images/sprite.svg#close"></use>
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
                    <use xlink:href="./images/sprite.svg#icons__heart"></use>
                </svg>
                <svg v-else>
                    <use xlink:href="./images/sprite.svg#icons__heart-full"></use>
                </svg>
            </div>
        </div>
        <div class="card__image-block">
            <component is="slider-photo-card"></component>
        </div>
        <div class="card__code">{{ product.code}}</div>
        <div class="card__name">
            {{ product.title }}
        </div>
        <div class="card__price-block">
            <div class="card__price-block_old-price">{{ product.oldPrice}} RON</div>
            <div class="card__price-block_current-price">{{ product.newPrice }} RON</div>
        </div>
        <div class="card__button-block">
<!--            <div class="card__buy-btn">В корзину</div>-->
            <addToCart></addToCart>
            <div 
                class="card__compare-btn"
                :class="{'card__compare-btn--active': inCompare}"
                @click="inCompare = !inCompare">
                <svg>
                    <use xlink:href="./images/sprite.svg#icons__graf"></use>
                </svg>
            </div>
            <div class="card__menu-btn">
                <span></span>
                <span></span>
                <span></span>
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
    data() {
        return {
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
    },
}
</script>