<template>
    <div class="discounts" v-if="loaded">
        <h2 class="discounts__title">{{ $tc('profile.dashboard.discount_title') }}</h2>
        <dashboard-discount 
            :amountOrders="ordersAll.length" 
            :className="className"
            :discounts="discountArr"
        ></dashboard-discount>
        <discounts-calculation 
            :amountOrders="ordersAll.length"
            :discounts="discountArr"
        ></discounts-calculation>
        <div class="discounts-conditions">
            <h3 class="discounts-conditions__title">{{ $tc('profile.discounts.conditions_title') }}</h3>
            <div class="discounts-conditions__main">
                <div class="discounts-conditions__text">
                    {{ $tc('profile.discounts.conditions_text') }} <a href="#" class="discounts-conditions__link">{{ $tc('profile.discounts.conditions_link') }}</a>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="preloader">
        <svg viewBox="0 0 145 145">
            <use :xlink:href="templatePath + 'images/sprite.svg#preloader'"></use>
        </svg>
        <div class="preloader__loading preloader__loading--first"></div>
        <div class="preloader__loading preloader__loading--second"></div>
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
                className:"personal",
                loaded: false,
            }
        },
        mounted() {
            this.$eventBus.$emit('hideMenu');
            this.$store.dispatch('personalUpdateOrders');
            this.$store.dispatch('personalGetDiscount');
        },
        computed: {
            discountArr() {
                return this.cloneOverJson(this.$store.state.personal.discount);
            },
            ordersAll() {
                return this.$store.state.personal.orders;
            },
        },
        created() {
            this.loading()
        },
        methods: {
            loading(){
                let vm = this
                setTimeout(function () {
                    vm.loaded = true
                }, 500)
            },
        },
    }
</script>