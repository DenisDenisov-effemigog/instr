<template>
    <ul class="order__product-list" :class="{'order__product-list--open': flag}">
        <li v-for="product in products" class="order__product-item">
            <div class="order__product-number"><span>Артикул:</span>{{product.art}}</div>
            <div class="order__product-desc">{{product.desc}}</div>
            <div class="order__product-qty">{{product.qty}}<span>шт.</span></div>
            <div class="order__product-item-price">{{product.itemPrice}} &#8381;</div>
            <div class="order__product-all-price">{{product.allPrice}} &#8381;</div>
            <div class="order__product-discount">{{product.discount}}</div>
            <div class="order__product-total-price">{{product.totalPrice}} &#8381;</div>
        </li>
        <!-- Нужно выводить 20 товаров -->
        <li class="order__product-item--all" v-show="products.length > 5">
            <a href="#">
                Больше информации о заказе
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name:"order-product-list",
    props:{
        products:{
            type: Array
        },
        flag:{
            type: Boolean,
            default: false
        }
        
    },
    data(){
        return{
            
        }
    },
    methods:{

    }
}
</script>