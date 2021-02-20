<template>
    <div class="dashboard" v-if="loaded">
        <div class="dashboard__head">
            <h2 class="dashboard__title">Сводка</h2>
            <dashboard-notifications></dashboard-notifications>
        </div>
        <div class="dashboard__main">
            <div class="dashboard__top">
                <finance-progress :financeCharges="financeData.charges"></finance-progress>
                <dashboard-discount></dashboard-discount>
                <dashboard-contract></dashboard-contract>
            </div>
            <div class="dashboard__bottom">
                <dashboard-curator></dashboard-curator>
                <dashboard-petitions></dashboard-petitions>
                <dashboard-orders></dashboard-orders>
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
    import financeProgress from './finance-progress.vue'
    import DashboardContract from './page-dashboard/dashboard-contract.vue'
    import DashboardCurator from './page-dashboard/dashboard-curator.vue'
    import DashboardDiscount from './page-dashboard/dashboard-discount.vue'
    import DashboardNotifications from './page-dashboard/dashboard-notifications.vue'
    import DashboardOrders from './page-dashboard/dashboard-orders.vue'
    import DashboardPetitions from './page-dashboard/dashboard-petitions.vue'
export default {
    name: "page-dashboard",
    components:{
        DashboardDiscount, 
        DashboardContract, 
        DashboardCurator, 
        DashboardOrders, 
        DashboardNotifications,
        financeProgress,
        DashboardPetitions
    },
    data() {
            return {
                loaded: false,
            }
        },
    methods: {
        loading(){
            let vm = this
            setTimeout(function () {
                vm.loaded = true
            }, 500)
        },
    },
    created() {
        this.loading()
    },
    mounted(){
        this.$eventBus.$emit('hideMenu');
        this.$store.dispatch('personalUpdateFinanceData');
    },
    computed: {
        financeData() {
            return this.$store.state.personal.financeData;
        },
    }
}
</script>
        