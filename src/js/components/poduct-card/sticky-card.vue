<template>
    <div v-show="flag" class="sticky-card" :class="{'sticky-card--fixed': flag}">
        <div class="container">
            <div class="sticky-card__img">
                <img src="./demo_images/product/image_51.png" alt="">
            </div>
            <div class="sticky-card__desc">
                <div class="sticky-card__stickers">
                    <div class="product-card__stickers_sticker-wrap">
                        <div class="product-card__stickers_sticker product-card__stickers_sticker--new">
                            <span>Новинка</span>
                        </div>
                    </div>
                <div class="product-card__stickers_sticker-wrap">
                    <div class="product-card__stickers_sticker product-card__stickers_sticker--promo">
                        <span>Акция</span>
                    </div>
                </div>
                </div>
                <div class="sticky-card__text">Набор бит SL6 x 50, сталь S2, 10 шт. Gross Набор 50, сталь S2, шт. Gross 50, сталь S2</div>
            </div>
            <div class="sticky-card__price">
                <div class="sticky-card__price--old">3 819.27 RON</div>
                <div class="sticky-card__price--total">2 819.27 RON</div>
            </div>
            <add-to-cart></add-to-cart>
        </div>
    </div>
</template>

<script>
import AddToCart from "../card/add-to-cart.vue"

export default {
    name:"sticky-card",
    components:{
        AddToCart,
    },
    data(){
        return{
            flag: false
        }
    },
    methods:{
        mouseWheel(){
            let productCard = document.querySelector('.product-card')
            let headerHeigth = document.querySelector('.header').offsetHeight
            let productCardPosition = productCard.offsetTop + productCard.clientHeight
            let windowPosition = window.pageYOffset + headerHeigth

            if(windowPosition > productCardPosition){
                this.flag = true
            }else{
                this.flag = false
            }
        }
    },
    created () {
        window.addEventListener('scroll', this.mouseWheel);
    },
}
</script>