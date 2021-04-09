<template>
    <div class="checkout-delivery">
        <h3 class="checkout-delivery__title">{{ $tc('text.delivery') }}</h3>
        <div class="checkout-delivery__content">
            <div class="delivery-option">
            <div v-for="delivery in deliveries" :key="delivery.name"
                 class="delivery-option__wrap"
                 :class="{
                     'delivery-option__wrap--active': deliveryId === delivery.id, 
                     'delivery-option__wrap--delivery': delivery.type === 'delivery',
                     'delivery-option__wrap--receive': delivery.type === 'receive',
                 }"
                 @click="changeDeliveryType(delivery.type, delivery.id)"
            >
                <div v-show="delivery.discount > 0" class="delivery-option__sale">{{ $tc('text.discount') }} -{{delivery.discount}}%</div>
                <div class="delivery-option__title">{{ delivery.name }}</div>
                <div class="delivery-option__text">{{ delivery.description }}</div>
                <div class="delivery-option__date">{{ delivery.date }}</div>
                <!-- #TODO скрыто пока не научились считать. пысы: когда научимся не забыть вернуть условия -->
                <!-- <div class="delivery-option__price" v-if="delivery.price > 0">{{ currency(delivery.price)}} {{ $tc('text.currency') }}</div> -->
                <div class="delivery-option__price delivery-option__price--green" v-if="delivery.price = 0">{{ $tc('text.free') }}</div>
            </div>
            <delivery-address
                v-if="currentOption === 'delivery'"
                :currentTab="currentTab"
                :currentCity="currentCity"
                :addresses="addresses"
                :user="user"
            ></delivery-address>
            <receive-address 
                v-else-if="currentOption === 'receive'"
                :deliveryPoints="deliveryPoints"
                :currentCity="currentCity"
                @getCity="getCity"
                :deliveryId="deliveryId"
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
            currentCity:{
                type: Object,
                default: {
                    id: '',
                    name: ''
                }
            }
        },
        data(){
            return{
                currentOption: 'delivery',
                deliveryId: this.deliveries[0].id
            }
        },
        methods: {
            changeDeliveryType(type, id) {
                let cityName = null
                if (this.currentCity && this.currentCity.name) {
                    cityName = this.currentCity.name
                }
                this.deliveryId = id
                this.currentOption = type
                this.$eventBus.$emit('push-delivery', type, id)
                this.$store.dispatch('basketOrderCalc', {
                    paymentId: null,
                    deliveryId: id,
                    city: cityName
                }).finally(() => {
                })
            },
            getCity(data){
                this.$store.dispatch('basketOrderCalc', {
                    paymentId: null,
                    deliveryId: this.deliveryId,
                    city: data.value.name
                }).finally(() => {
                })
            }
        },
        created() {
            this.$eventBus.$on("getCity", this.getCity)
        },
    }
</script>