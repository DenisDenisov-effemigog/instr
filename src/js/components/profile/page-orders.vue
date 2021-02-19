<template>
    <div class="order" v-if="loaded">  
        <div class="order__header">
            <h2 class="profile__title">{{ $tc(h1) }}</h2>
        </div>
        <div v-if="ordersAll.length === 0" class="profile__empty-content">
            <div class="order__text">{{ $tc('profile_orders.empty_text') }}</div>
            <a :href="catalogLink" class="profile__catalogue-btn">{{ $tc('button.move_to_catalog') }}</a>
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
            <order-list v-model="details" :orders="paginatedOrders"></order-list>
        </div>
        <div class="order__pagination">
            <order-pagination v-model="pageNumber" :pageAmount="showPages" v-if="ordersAll.length > 0"></order-pagination>
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
    import orderPagination from './page-orders/order-pagination.vue'
    import config from "../../config";

    export default {
        components: { 
            selectList,
            orderList,
            orderPagination,
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
                pageNumber: 1,
                onPage: 10,
                loaded: false,
                catalogLink: config.links.catalog
            }
        },
        mounted() {
            this.$store.dispatch('personalUpdateOrders');
            this.$eventBus.$emit('hideMenu')
        },
        created(){
            this.loading();
            this.$eventBus.$on('apply-sorting', this.applySorting);
        },
        beforeDestroy() {
            // this.$eventBus.$off('apply-sorting');
        },
        methods:{
            loading(){
                let vm = this
                setTimeout(function () {
                    vm.loaded = true
                }, 500)
            },
            applySorting(status) {
                this.$store.dispatch('personalSortOrders', status);
                this.pageNumber = 1;
            },
        },
        computed: {
            ordersAll() {
                return this.$store.state.personal.orders;
            },
            h1() {
                return this.$store.state.layout.h1;
            },
            showPages() {
                return Math.ceil(this.ordersAll.length / this.onPage);
            },
            paginatedOrders() {
                return this.ordersAll.slice((this.pageNumber - 1) * this.onPage, this.pageNumber * this.onPage);
            }
        }
    }
</script>