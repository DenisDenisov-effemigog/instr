<template>
    <router-link 
        tag="div" 
        :to="'/my/orders/'"
    >
        <div @click="passIndex" class="dashboard-orders">
            <div class="dashboard-orders__head">
                <h3 class="dashboard-orders__title">
                    {{ $tc('profile.dashboard.order_title') }}  
                </h3>
            </div>
            <div class="dashboard-orders__main">
                <ul class="dashboard-orders__list">
                    <li v-if="!ordersData.length" class="dashboard-orders__item dashboard-orders__item--info">{{ $tc('profile.dashboard.order_info') }}  </li>
                    <li v-for="(item, index) in ordersData"
                        :key="index"
                        class="dashboard-orders__item"
                        v-else
                    >
                        <div class="dashboard-orders__item-top">
                            <div class="dashboard-orders__number">
                                #{{item.number}}
                            </div>
                            <div class="dashboard-orders__price">
                                {{item.priceTotal}} {{ $tc('text.currency') }}                    
                            </div>
                        </div>
                        <div class="dashboard-orders__item-bottom">
                            <div class="dashboard-orders__date">
                                {{item.date}}                         
                            </div>
                            <div class="dashboard-orders__status">
                                {{item.status.label}}                        
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name:"dashboard-orders",
    methods:{
        passIndex(){
            this.$eventBus.$emit("passIndex", 3)
        }
    },
    computed: {
        ordersData() {
            return this.$store.state.personal.currentOrders
        },
    },
}
</script>