<template>
    <div class="dashboard">
        <div class="dashboard__head">
            <h2 class="dashboard__title">Сводка</h2>
            <dashboard-notifications></dashboard-notifications>
        </div>
        <div class="dashboard__main">
            <div class="dashboard__top">
                <dashboard-discount></dashboard-discount>
                <dashboard-contract></dashboard-contract>
            </div>
            <div class="dashboard__bottom">
                <dashboard-curator></dashboard-curator>
                <dashboard-orders></dashboard-orders>
            </div>
        </div>
    </div>
</template>

<script>
    import DashboardContract from './page-dashboard/dashboard-contract.vue'
    import DashboardCurator from './page-dashboard/dashboard-curator.vue'
    import DashboardDiscount from './page-dashboard/dashboard-discount.vue'
    import DashboardNotifications from './page-dashboard/dashboard-notifications.vue'
    import DashboardOrders from './page-dashboard/dashboard-orders.vue'
export default {
    name: "page-dashboard",
    components:{
        DashboardDiscount, 
        DashboardContract, 
        DashboardCurator, 
        DashboardOrders, 
        DashboardNotifications
    },
    mounted() {
        this.$eventBus.$emit('hideMenu')
    },
}
</script>
        