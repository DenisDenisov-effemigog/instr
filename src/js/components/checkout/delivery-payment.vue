<template>
    <div class="delivery-payment">
        <h3 class="delivery-payment__title">{{ $tc('checkout.title.payment') }}</h3>
        <form action="" class="delivery-payment__form">
            <label class="delivery-payment__radio" v-for="payment in payments" :key="payment.id">
                <input name="pay" 
                       type="radio" 
                       :value="payment.value" 
                       v-model="payMethod"
                       @change="changeDeliveryPayment(payment.value, payment.id)"
                >
                <span class="delivery-payment__check"></span>
                <div class="delivery-payment__radio-label">
                    <span class="delivery-payment__radio-title">{{ payment.title }}</span>
                    <span class="delivery-payment__radio-text">{{ payment.description }}</span>
                </div>
            </label>
        </form>
    </div>
</template>

<script>
export default {
    name:"delivery-payment",
    props: {
        payments: {
            required: true,
            type: Array
        },  
    },
    data(){
        return{
            payMethod: this.payments[0].value
        }
    },
    methods: {
        changeDeliveryPayment(type, id) {
            this.$eventBus.$emit('push-payment', id)
            this.$store.dispatch('basketOrderCalc', {
                paymentId: id,
                deliveryId: null
            }).finally(() => {
            })
        }
    }
}
</script>