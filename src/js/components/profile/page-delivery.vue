<template>
    <div class="delivery">
        <div class="delivery__header" 
             :class="{'delivery__header_column': addresses.length === 0}"
        >
            <h2 class="profile__title">{{ $tc('link.my_addresses') }}</h2>
            <p class="delivery__no-address" v-if="addresses.length === 0">{{ $tc('profile_delivery.empty_text') }}</p>
            <add-address-btn></add-address-btn>
        </div>
      
        <div v-if="addresses.length > 0">
            <ul class="delivery__list">
                <li class="delivery__item" v-for="order in addresses">
                    <div class="delivery__desc">
                        <div class="delivery__order">{{ $tc('text.address') }} № {{order.order}}</div>
                        <div class="delivery__address">{{order.address}}</div>
                        <div class="delivery__status"
                             :class="'delivery__status--' + order.status"
                        >
                            <p @click="openTooltip(order.order)">{{ order.statusPrint }}</p>
                            <div ref="tooltip" class="delivery__tooltip"
                                 :class="{'delivery__tooltip--open': showToltip === order.order}"
                                 v-if="order.statusDesc"
                            >
                                <p>{{ order.statusDesc }}</p>
                                <div class="delivery__tooltip-icon">
                                    <svg @click ="closeTooltip(order.order)" viewBox="0 0 12 12">
                                        <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="delivery__icon" @click.prevent="deleteAddress">
                        <svg v-if="order.status !== 'not confirmed'">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__del'"></use>
                        </svg>
                    </div>
                </li>
                <add-address-btn></add-address-btn>
            </ul>
        </div>
    </div>
</template>

<script>
import AddAddressBtn from '../add-address-btn.vue';
export default {
    name:"page-delivery",
    components:{
        AddAddressBtn
    },
    data(){
        return{
            showToltip: 0,
        }
    },
    mounted() {
        console.log('his.$store.dispatch(');
        this.$store.dispatch('personalUpdateAddresses');
        this.$eventBus.$emit('hideMenu')
    },
    methods: {
        deleteAddress() {
            // через массив передаем оглавление, сообщение модального окна удаления адреса - 2 элемеента
            this.$eventBus.$emit("openModal", 'dialogue', [this.$tc('modal.title.address_remove'), this.$tc('modal.text.address_remove')], false, false)
        },
        openTooltip(data){
            this.showToltip = data
        },
        closeTooltip(data){
            this.showToltip = 0
        }
    },
    computed: {
        addresses() {
            console.log('this.$store.state.personal.addresses', this.$store.state.personal.addresses);
            return this.$store.state.personal.addresses;
        },
    }
}
</script>