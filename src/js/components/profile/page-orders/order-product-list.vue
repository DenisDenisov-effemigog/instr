<template>
    <ul class="order__product-list">
        <li v-for="product in products" class="order__product-item">
            <div class="order__product-number">{{product.art}}</div>
            <div class="order__product-desc">{{product.desc}}</div>
            <div class="order__product-qty">{{product.qty}}</div>
            <div class="order__product-item-price">{{product.itemPrice}}</div>
            <div class="order__product-all-price">{{product.allPrice}}</div>
            <div class="order__product-discount">{{product.discount}}</div>
            <div class="order__product-total-price">{{product.totalPrice}}</div>
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
        
    },
    data(){
        return{
            
        }
    },
    methods:{

    }
}
</script>