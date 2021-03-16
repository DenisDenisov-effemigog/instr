<template>
    <div class="checkout-delivery">
        <h2 class="checkout-delivery__title">{{ $tc('text.delivery') }}</h2>
        <div class="checkout-delivery__content">
            <div class="delivery-option">
            <div v-for="delivery in deliveries" :key="delivery.name"
                 class="delivery-option__wrap"
                 :class="{
                     'delivery-option__wrap--active': currentOption === delivery.type, 
                     'delivery-option__wrap--delivery': delivery.type === 'delivery',
                     'delivery-option__wrap--receive': delivery.type === 'receive',
                 }"
                 @click="changeDeliveryType(delivery.type, delivery.id)"
            >
                <div v-show="delivery.discount > 0" class="delivery-option__sale">{{ $tc('text.discount') }} -{{delivery.discount}}%</div>
                <div class="delivery-option__title">{{ delivery.name }}</div>
                <div class="delivery-option__text">{{ delivery.description }}</div>
                <div class="delivery-option__date">{{ delivery.date }}</div>
                <div class="delivery-option__price" v-if="delivery.price > 0">{{ currency(delivery.price)}} {{ $tc('text.currency') }}</div>
                <div class="delivery-option__price delivery-option__price--green" v-else>{{ $tc('text.free') }}</div>
            </div>
            <delivery-address
                v-if="currentOption === 'delivery'"
                :currentTab="currentTab"
                :addresses="addresses"
                :user="user"
                :cities="cities"
                :streets="streets"
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
            addresses:{
                type:Array,
                required: true
            },
            user:{
                type:Object,
                required: true
            },
            cities:{
                type: Array,
                required: true
            },
            streets:{
                type: Array,
                required: true
            },
        },
        data(){
            return{
                currentOption: 'delivery'
            }
        },
        methods: {
            changeDeliveryType(type, id){
                this.currentOption = type
                console.log(this.currentOption);
                this.$eventBus.$emit('push-delivery', id)
                this.$store.dispatch('basketOrderCalc', {
                    paymentId: null,
                    deliveryId: id
                }).finally(() => {
                })
            }
        }
    }
</script>