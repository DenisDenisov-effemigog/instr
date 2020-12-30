<template>
    <ul class="order__product-list" :class="{'order__product-list--open': opened}">
        <li v-for="(product, index) in products" 
            class="order__product-item" 
            v-if="index < 3 && !showAll || showAll"
        >
            <div class="order__product-number"><span>Артикул:</span>{{product.sku}}</div>
            <div class="order__product-desc">
                <span>{{product.name}}</span>
                <div class="order__product-desc_tooltip">
                    {{product.name}}
                </div>
            </div>
            <div class="order__product-qty">{{product.basket_quantity}}<span>шт.</span></div>
            <div class="order__product-item-price">{{product.price}} &#8381;</div>
            <div class="order__product-all-price">{{product.allPrice}} &#8381;</div>
            <div class="order__product-discount">
                <span v-if="product.discount > 0">{{product.discount}}%</span>
            </div>
            <div class="order__product-total-price">{{product.totalPrice}} &#8381;</div>
        </li>
        
        <li class="order__product-item--all" v-if="products.length > 3 && !showAll">
            <a @click.prevent="openDetails"> 
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
            type: Array,
            required: true
        },
        opened:{
            type: Boolean,
            default: false
        },
        showAll:{
            type: Boolean,
            default: false
        },
        orderIndex:{
            type: Number,
            default: null
        },
        orderId:{
            type: Number,
            default: null
        },
    },
    data(){
        return{
            
        }
    },
    created() {
        //console.log('this.orderId ', this.orderId)
    },
    methods:{
        openDetails() {
            this.$router.push('/account/orders/' + this.orderId + '/');
            //this.$eventBus.$emit("detailOrder", this.orderIndex);
            this.$eventBus.$emit('hideBreadcrumbs', true);
        },
    }
}
</script>