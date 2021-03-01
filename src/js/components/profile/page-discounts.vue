<template>
    <div class="discounts">
        <h2 class="discounts__title">{{ $tc('profile.dashboard.discount_title') }}</h2>
        <dashboard-discount :amountOrders="ordersAll.length" :className="className"></dashboard-discount>
        <discounts-calculation :amountOrders="ordersAll.length"></discounts-calculation>
        <div class="discounts-conditions">
            <h3 class="discounts-conditions__title">{{ $tc('profile.discounts.conditions_title') }}</h3>
            <div class="discounts-conditions__main">
                <div class="discounts-conditions__text">
                    {{ $tc('profile.discounts.conditions_text') }} <a href="#" class="discounts-conditions__link">{{ $tc('profile.discounts.conditions_link') }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dashboardDiscount from './page-dashboard/dashboard-discount.vue'
import DiscountsCalculation from './page-discounts/discounts-calculation.vue';
    export default {
    components: { dashboardDiscount,DiscountsCalculation  },
        name:"page-discounts",
        data() {
            return {
                className:"personal"
            }
        },
        methods: {
        },
        mounted(){
            this.$eventBus.$emit('hideMenu');
            this.$store.dispatch('personalUpdateOrders');
        },
        computed:{
            ordersAll() {
                return this.$store.state.personal.orders;
            },
        }
    }
</script>