<template>
    <div class="delivery">
        <div class="delivery__header" 
             :class="{'delivery__header_column': addresses.length === 0}"
        >
            <h2 class="profile__title">Адреса доставки</h2>
            <p class="delivery__no-address" v-if="addresses.length === 0">У вас пока нет ни одного адреса.</p>
            <div class="delivery__add-address-btn"
                 @click.prevent="openModal('new-address')"
            >
                <svg viewBox="0 0 20 20">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__plus-small'"></use>
                </svg>
                <span>Добавить адрес</span>
            </div>
        </div>
      
        <div v-if="addresses.length > 0">
            <ul class="delivery__list">
                <li class="delivery__item" v-for="order in addresses">
                    <div class="delivery__desc">
                        <div class="delivery__order">Адрес № {{order.order}}</div>
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
                    <div class="delivery__icon" @click.prevent="openModal('delete-address')">
                        <svg v-if="order.status !== 'not confirmed'">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__del'"></use>
                        </svg>
                    </div>
                </li>
                <div class="delivery__add-address-btn delivery__add-address-btn_mobile"
                    @click.prevent="openModal('new-address')"
                >
                    <svg viewBox="0 0 20 20">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__plus-small'"></use>
                    </svg>
                    <span>Добавить адрес</span>
                </div>
            </ul>

        </div>
    </div>
</template>

<script>
export default {
    name:"page-delivery",
    props:{
        /*profile: {
            required: true,
            type: Array,
        },*/
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
        openModal(modal) {
            this.$eventBus.$emit("openModal", modal, '', false, false)
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