<template>
    <div class="card">
        <div class="card__header">
            <div class="card__stickers">
                <div class="card__stickers_sticker card__stickers_sticker--new">
                    <span>Новинка</span>
                </div>
                <div class="card__stickers_sticker card__stickers_sticker--promo">
                    <span>Акция</span>
                </div>
            </div>
            <div class="card__favorite-btn">
                <svg>
                    <use xlink:href="./images/sprite.svg#icons__heart"></use>
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
            <div class="card__buy-btn">В корзину</div>
            <div class="card__compare-btn">
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

export default {
    name: 'card',
    components: {
        sliderPhotoCard
    },
    data() {
        return {
            product: 
                {
                    id: 1, 
                    title: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel', 
                    link: '',
                    code: 717950,
                    oldPrice: '3 819.27',
                    newPrice: '2 819.27',
                },
        }
    },
    methods: {
    },
}
</script>