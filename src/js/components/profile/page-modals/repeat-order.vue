<template>
    <div class="order-modal">
        <div class="order-modal__title">{{ $tc('profile_orders.link.repeat') }} #{{ products.orderNumber }}</div>
        <div class="order-modal__text">{{ $tc('repeat_order.text') }}</div>
        <div class="order-modal__special"
             v-if="products.products.length"
        >
            <div class="order-modal__special_title">{{ $tc('repeat_order.not_available') }}:</div>
            <ul class="order-modal__special_list">
                <li class="order-modal__special_item"
                    v-for="product in products.products"
                >
                    <div class="order-modal__special_img">
                        <img :src="productImg(product)" alt="">
                    </div>
                    <div class="order-modal__special_info">
                        <div class="order-modal__special_article">{{ $tc('text.articul') }}: {{ product.sku }}</div>
                        <div class="order-modal__special_desc"> {{ product.name }} </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="order-modal__btn">{{ $tc('link.go_cart') }}</div>
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
    methods: {
        productImg(product) {/*TODO не приходит картинка*/
            if (product.images.length)
                return product.images[0];
            else
                return '';
        },
    },
}
</script>