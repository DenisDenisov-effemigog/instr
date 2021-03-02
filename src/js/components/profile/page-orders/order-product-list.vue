<template>
    <ul class="order__product-list" :class="{'order__product-list--open': opened}">
        <li v-for="(product, index) in products" 
            class="order__product-item" 
            v-if="index < 3 && !showAll || showAll"
        >
            <div class="order__product-number"><span>{{ $tc('text.articul') }}:</span>{{ product.sku }}</div>
            <div class="order__product-desc">
                <span>{{ product.name }}</span>
                <div class="order__product-desc_tooltip">
                    {{ product.name }}
                </div>
            </div>
            <div class="order__product-qty">{{ product.basket_quantity }} <span>{{ $tc('text.count') }}</span></div>
            <div class="order__product-item-price">{{ currency(product.price) }}  {{ $tc('text.item_currency') }}</div>
            <div class="order__product-all-price">{{ currency(product.priceTotal + product.discount) }} {{ $tc('text.currency') }}</div>
            <div class="order__product-discount">
                <span v-if="product.discount > 0">{{ product.discount }}%</span>
            </div>
            <div class="order__product-total-price">{{ currency(product.priceTotal) }} {{ $tc('text.currency') }}</div>
        </li>
        
        <li class="order__product-item--all" v-if="products.length > 3 && !showAll">
            <a @click.prevent="openDetails">{{ $tc('profile_orders.link.more_info') }}</a>
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
    methods:{
        openDetails() {
            this.$router.push('/my/orders/' + this.orderId + '/');
            this.$eventBus.$emit('hideBreadcrumbs', true);
        },
    }
}
</script>