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
                    :key="product.id"
                >
                    <div class="order-modal__special_img">
                        <img :src="product.images[0].img" alt="">
                    </div>
                    <div class="order-modal__special_info">
                        <div class="order-modal__special_article">{{ $tc('text.articul') }}: {{ product.sku }}</div>
                        <div class="order-modal__special_desc"> {{ product.name }} </div>
                    </div>
                </li>
            </ul>
        </div>
        <a :href="cartLink" class="order-modal__btn">{{ $tc('link.go_cart') }}</a>
    </div>
</template>

<script>
    import config from "../../../config";
    
    export default {
        name:'repeat-order',
        props: {
            products: {
                required: true,
                type: Object
            }, 
        },
        data() {
            return {
                cartLink: config.links.cart
            }
        },
    }
</script>