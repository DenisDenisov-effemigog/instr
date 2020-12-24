<template>
    <div class="order-modal">
        <div class="order-modal__title">Повторить заказ #{{ products.orderNumber }}</div>
        <div class="order-modal__text">Все товары из этого заказа автоматически добавятся в корзину.</div>
        <div class="order-modal__special"
             v-if="products.products.length"
        >
            <div class="order-modal__special_title">К сожалению этих товаров в данный момент нет в наличии:</div>
            <ul class="order-modal__special_list">
                <li class="order-modal__special_item"
                    v-for="product in products.products"
                >
                    <div class="order-modal__special_img">
                        <img :src="productImg(product)" alt="">
                    </div>
                    <div class="order-modal__special_info">
                        <div class="order-modal__special_article">Артикул: {{ product.sku }}</div>
                        <div class="order-modal__special_desc"> {{ product.name }} </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="order-modal__btn">Перейти в корзину</div>
    </div>
</template>

<script>
export default {
    name:'repeat-order',
    props: {
        products: {
            required: true,
            type: Object
        }  
    },
    created() {
        //console.log(' this.products ' , this.products);
    },
    methods: {
        productImg(product) {//.images
            //console.log(' product images' , product.images);
            //console.log('product.images[0]' , product.images[0]);
            if (product.images.length)
                return product.images[0];
            else
                return '';
        },
    },
    computed: {
        
    
    }
}
</script>