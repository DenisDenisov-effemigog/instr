<template>
    <div class="delivery">
        <div class="delivery__header" 
             :class="{'delivery__header_column': addresses.length === 0}"
        >
            <h2 class="profile__title">{{ $tc('link.my_addresses') }}</h2>
            <p class="delivery__no-address" v-if="addresses.length === 0">{{ $tc('profile_delivery.empty_text') }}</p>
            <add-address-btn></add-address-btn>
        </div>
      
        <div class="delivery__list">
            <ul v-if="addresses.length > 0">
                <li class="delivery__item" v-for="order in addresses" :key="order.id">
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
                    <div class="delivery__icon" @click.prevent="deleteAddress(order.id)">
                        <svg v-if="order.status !== 'not confirmed'">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__del'"></use>
                        </svg>
                    </div>
                </li>
            </ul>
            <add-address-btn></add-address-btn>
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
            reasons: [
                'delete_profile.reason', 'delete_profile.reason', 'delete_profile.reason', 'delete_profile.reason_another'
            ]
        }
    },
    mounted() {
        console.log('his.$store.dispatch(');
        this.$store.dispatch('personalUpdateAddresses');
        this.$eventBus.$emit('hideMenu')
    },
    created() {
        this.$eventBus.$on('updateAddress', this.updateAddress)
    },
    methods: {
        updateAddress() {
            this.$store.dispatch('personalUpdateAddresses');
        },
        deleteAddress(addressId) {
            // через массив передаем причины удаления и что удаляем - 2 элемеента
            this.$eventBus.$emit("openModal", 'profile-delete', [this.reasons, 'address', addressId], false, false)
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
            return this.$store.state.personal.addresses;
        },
    }
}
</script>