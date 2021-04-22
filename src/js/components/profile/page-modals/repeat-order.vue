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
        <a @click="addToCard" class="order-modal__btn"
            :class="{'button--disabled': products.disableBtn}"
        >
            {{ $tc('link.go_cart') }}
        </a>
    </div>
</template>

<script>
    import config from "../../../config";
    import * as Api from '../../../api';
    let api = Api.getInstance();
    
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
        methods: {
            addToCard() {
                if (!this.products.disableBtn) {
                    api.personalOrderRepaet(this.products.id).then(() => {
                        window.location.replace(this.cartLink)
                    })
                }
            }
        }
    }
</script>