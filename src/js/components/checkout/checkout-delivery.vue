<template>
    <div class="checkout-delivery">
        <h2 class="checkout-delivery__title">Доставка</h2>
        <div class="checkout-delivery__content">
            <delivery-option
                :currentTab="currentTab"
            ></delivery-option>
        </div>
    </div>
</template>

<script>
import deliveryOption from './delivery-option.vue'
export default {
  components: { deliveryOption },
    name:"checkout-delivery",
    props:{
        currentTab:{
            type:String,
            required: true
        }
    }
}
</script>