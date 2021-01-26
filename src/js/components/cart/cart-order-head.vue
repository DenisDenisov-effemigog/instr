<template>
    <div class="cart-order__head" :class="{'cart-order__head--active': mobileFlag}">
        <div class="cart-order__head-circle">
            <vue-ellipse-progress
                :progress="progressPrice"
                :color="'#049004'"
                empty-color="rgba(145, 148, 152, 0.16)"
                :size="32"
                :thickness="1"
                :empty-thickness="1"
                animation="default 700 1000"
                fontSize="1.5rem"
                :legend="false"
                line="round"
            >
                <svg class="cart-order__head-icon"
                     slot="legend-caption"
                     :viewBox="progressIconSize"
                >
                    <use :xlink:href="templatePath + 'images/sprite.svg#' + progressIcon"></use>
                </svg>
            </vue-ellipse-progress>
        </div>
        <div class="cart-order__head-text" v-if="currentPrice > rightPrice">{{ $tc('cart.order.progress_success') }}</div>
        <div class="cart-order__head-text" v-else>{{ $tc('cart.order.progress_text_start') }}{{ getPrice }}{{ $tc('cart.order.progress_text_end') }}</div>
    </div>
</template>

<script>
export default {
    name:"cart-order-head",
    data(){
        return{
            rightPrice: 7500, /*TODO вывести из базы ???*/
            progress: 0,
            progressIcon: 'icons__cube',
            progressIconSize: '0 0 24 24'
        }
    },
    props:{
        mobileFlag:{
            type:Boolean,
            default: false
        },
        currentPrice:{
            type: Number,
            required: true
        }
    },
    computed:{
        progressPrice() {
            if (this.currentPrice > this.rightPrice) {
                this.progress = 100;
                this.progressIcon = 'check';
                this.progressIconSize = '-1 -2 12 12';
            } else {
                this.progress = this.currentPrice/7500*100;
                this.progressIcon = 'icons__cube';
                this.progressIconSize = '0 0 24 24';
            }

            return this.progress
        },
        getPrice(){
            return this.rightPrice - this.currentPrice
        }
    }
}
</script>