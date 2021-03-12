<template>
    <div class="order" v-if="loaded">  
        <div class="order__header">
            <h2 class="profile__title">{{ $tc(h1) }}</h2>
        </div>

        <div v-if="ordersOnPage.length === 0" class="profile__empty-content">
            <div class="order__text">{{ $tc('profile_orders.empty_text') }}</div>
            <a :href="catalogLink" class="profile__catalogue-btn">{{ $tc('button.move_to_catalog') }}</a>
        </div>

        <div class="order__info" v-if="!details && ordersOnPage.length !== 0">
            <div class="order__info-icon">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__wanted'"></use>
                </svg>
            </div>
            <div class="order__info-text">{{ $tc('profile_orders.info_text') }}</div>
        </div>
        
        <div class="order__info-select" v-if="!details && ordersOnPage.length !== 0">
            <select-list
                :points="ordersPoints"
                :selectopenSelect="selectopenSelect"
                :sortingPage="'orders'"
            ></select-list>
        </div>
        <div class="order__main">
            <order-list v-model="details" :orders="ordersOnPage"></order-list>
        </div>
        <div class="order__pagination">
            <component 
                is="pagination"
                :pagination="internalPagination"
                :placement="'.order'"
            >
            </component>
            <!-- <order-pagination v-model="pageNumber" :pageAmount="showPages" v-if="ordersOnPage.length > 0"></order-pagination> -->
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
    import selectList from '../partials/select-list.vue';
    import orderList from './page-orders/order-list.vue';
    // import orderPagination from './page-orders/order-pagination.vue'
    import config from "../../config";

    export default {
        components: { 
            selectList,
            orderList,
            // orderPagination,
        },
        name:"page-orders",
        props:{
            selectopenSelect:{
                type: Object,
                required: true,
            },
        },
        data(){
            return{
                profile: [],
                details: false,
                // pageNumber: 1,
                // onPage: 10,
                loaded: false,
                catalogLink: config.links.catalog,
                // internalPagination: {},
                selectedStatus: ''
            }
        },
        mounted() {
            this.$store.dispatch('personalUpdateOrders');
            this.$eventBus.$emit('hideMenu');
        },
        created(){
            this.loading();
            this.$eventBus.$on('apply-sorting', this.applySorting);
            this.$eventBus.$on('apply-orders-list', this.applyOrdersList);
        },
        beforeDestroy() {
            // this.$eventBus.$off('apply-sorting');
            this.$eventBus.$off('apply-orders-list');
        },
        methods:{
            loading(){
                let vm = this
                setTimeout(function () {
                    vm.loaded = true
                }, 500)
            },
            applySorting(status) {
                let data = {
                    status: status,
                    page: 1
                }
                this.$store.dispatch('personalUpdateOrders', data);
                this.selectedStatus = status
            },
            applyOrdersList(page) {
                let data = {
                    status: this.selectedStatus,
                    page: page
                }
                this.$store.dispatch('personalUpdateOrders', data);
            },
        },
        computed: {
            ordersOnPage() {
                return this.$store.state.personal.orders.orders;
            },
            ordersPoints() {
                return this.$store.state.personal.orders.points;
            },
            h1() {
                return this.$store.state.layout.h1;
            },
            internalPagination() {
                return this.$store.state.personal.orders.pagination
            }
            // showPages() {
            //     return Math.ceil(this.ordersOnPage.length / this.onPage);
            // },
            // paginatedOrders() {
            //     return this.ordersOnPage.slice((this.pageNumber - 1) * this.onPage, this.pageNumber * this.onPage);
            // }
        }
    }
</script>