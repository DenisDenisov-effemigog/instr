<template>
    <div class="checkout-delivery">
        <h2 class="checkout-delivery__title">{{ $tc('text.delivery') }}</h2>
        <div class="checkout-delivery__content">
            <div class="delivery-option">
            <div v-for="delivery in deliveries"
                 class="delivery-option__wrap"
                 :class="{
                     'delivery-option__wrap--active': currentOption === delivery.type, 
                     'delivery-option__wrap-delivery': delivery.type === 'delivery',
                     'delivery-option__wrap-receive': delivery.type === 'receive',
                 }"
                 @click="currentOption = delivery.type"
            >
                <div class="delivery-option__sale">{{ $tc('text.discount') }} -{{delivery.discount}}%</div>
                <div class="delivery-option__title">{{ delivery.name }}</div>
                <div class="delivery-option__text">{{ delivery.description }}</div>
                <div class="delivery-option__date">{{ delivery.date }}</div>
                <div class="delivery-option__price" v-if="delivery.price > 0">{{ currency(delivery.price)}} {{ $tc('text.currency') }}</div>
                <div class="delivery-option__price delivery-option__price--green" v-else>{{ $tc('text.free') }}</div>
            </div>
            <delivery-address
                v-if="currentOption === 'delivery'"
                :currentTab="currentTab"
            ></delivery-address>
            <receive-address v-else
                             :deliveryPoints="deliveryPoints"
            ></receive-address>
        </div>
        </div>
    </div>
</template>

<script>
    import deliveryAddress from "./delivery-address.vue";
    import ReceiveAddress from "./receive-address.vue";
    
    export default {
        components: { deliveryAddress, ReceiveAddress },
        name:"checkout-delivery",
        props:{
            currentTab:{
                type:String,
                required: true
            },
            deliveries: {
                required: true,
                type: Array
            },
            deliveryPoints: {
                required: true,
                type: Array
            },
        },
        data(){
            return{
                currentOption: 'delivery'
            }
        }
    }
</script>