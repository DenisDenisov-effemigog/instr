<template>
    <div class="order">
        
        <div class="order__header">
            <h2 class="profile__title">{{ $tc(h1) }}</h2>
        </div>
        <div v-if="ordersAll.length === 0" class="order__none">
            <div class="order__none_text">{{ $tc('profile_orders.empty_text') }}</div>
            <div class="order__none_btn">{{ $tc('button.go_catalog') }}</div>
        </div>
        <div class="order__info" v-if="!details && ordersAll.length !== 0">
            <div class="order__info-icon">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__wanted'"></use>
                </svg>
            </div>
            <div class="order__info-text">{{ $tc('profile_orders.info_text') }}</div>
        </div>
        <div class="order__info-select" v-if="!details && ordersAll.length !== 0">
            <select-list
                :points="points"
                :selectopenSelect="selectopenSelect"
                :sortingPage="'orders'"
            ></select-list>
        </div>
        <div class="order__main">
            <order-list v-model.trim="details" :orders="ordersAll"></order-list>
        </div>
    </div>
</template>

<script>
    import selectList from '../partials/select-list.vue'
    import orderList from './page-orders/order-list.vue'
    export default {
         components: { 
             selectList,
             orderList,
         },
        name:"page-orders",
        props:{
            points:{
                type: Array,
                required: true,
            },
            selectopenSelect:{
                type: Object,
                required: true,
            },
        },
        data(){
            return{
                profile: [],
                details: false,
            }
        },
        mounted() {
            this.$store.dispatch('personalUpdateOrders');
            this.$eventBus.$emit('hideMenu')
        },
        created(){
            this.$eventBus.$on('apply-sorting', this.applySorting);
        },
        beforeDestroy() {
            // this.$eventBus.$off('apply-sorting');
        },
        methods:{
            applySorting(orders) {
                this.ordersAll = orders
            }
        },
        computed: {
            ordersAll: {
                get: function() {
                    return this.$store.state.personal.orders;
                },
                set: function() {
                    this.applySorting()
                }
            },
            h1() {
                return this.$store.state.layout.h1;
            },
        }
    }
</script>