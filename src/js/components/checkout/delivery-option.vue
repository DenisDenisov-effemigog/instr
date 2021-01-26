<template>
    <div class="delivery-option">
        <div class="delivery-option__wrap delivery-option__wrap-delivery"
            :class="{'delivery-option__wrap--active': currentOption === 'delivery'}"
            @click="currentOption = 'delivery'"
        ><!--TODO из базы всё-->
            <div class="delivery-option__sale">Скидка -5%</div>
            <div class="delivery-option__title">Курьерская доставка</div>
            <div class="delivery-option__text">Доставка курьером до вашего адреса. Выберите нужный</div>
            <div class="delivery-option__date">8.08 2020</div>
            <div class="delivery-option__price">1 564 ₽</div>
        </div>
        <div class="delivery-option__wrap delivery-option__wrap-receive"
            :class="{'delivery-option__wrap--active': currentOption === 'receive'}"
            @click="currentOption = 'receive'"            
        >
            <div class="delivery-option__sale">Скидка -5%</div>
            <div class="delivery-option__title">Самовывоз</div>
            <div class="delivery-option__text">Самовывоз товара из пункта выдачи. Выберите подходящий</div>
            <div class="delivery-option__date">8.08 2020</div>
            <div class="delivery-option__price delivery-option__price--green">бесплатно</div>
        </div>
        <delivery-address 
            v-if="currentOption === 'delivery'"
            :currentTab="currentTab"
        ></delivery-address>
        <receive-address
            v-else
        ></receive-address>
    </div>
</template>

<script>
import deliveryAddress from './delivery-address.vue'
import ReceiveAddress from './receive-address.vue'
export default {
  components: { deliveryAddress, ReceiveAddress },
    name:"delivery-option",
    props:{
        currentTab:{
            type:String,
            required: true
        }
    },
    data(){
        return{
            currentOption: 'delivery'
        }
    }
}
</script>