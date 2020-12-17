<template>
    <div class="order">
        <div 
            v-show="details"
            class="breadcrumbs" 
            @click="allOrders"
        >
            <svg class="breadcrumbs__back" viewBox="0 0 18 15">
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
            </svg>
            <span>Назад</span>
        </div>
        <div class="order__header">
            <h2 class="profile__title">Список заказов</h2>
        </div>
        <div class="order__info" v-if="!details">
            <div class="order__info-icon">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__wanted'"></use>
                </svg>
            </div>
            <div class="order__info-text">
                В этом разделе вы найдете информацию о заказах, сделанных на сайте
            </div>
        </div>
        <div class="order__info-select" v-if="!details">
            <select-list
                :points="points"
            ></select-list>
        </div>
        <div class="order__main" v-if="!details">
            <order-list v-model="details"></order-list>
        </div>
        <page-order v-if="details"></page-order>
    </div>
</template>

<script>
    import selectList from './select-list.vue'
    import orderList from './page-orders/order-list.vue'
    import PageOrder from './page-orders/page-order.vue'
    export default {
         components: { 
             selectList,
             orderList,
             PageOrder,
         },
        name:"page-orders",
        props:{
        },
        data(){
            return{
                points:['Выполнен','В ожидании оплаты','Отменен'],
                details: false,
            }
        },
        created(){
            this.$eventBus.$on("allOrders", this.allOrders)
            this.$eventBus.$on("openDetails", this.detailOrder)
        },
        methods:{
            allOrders() {
                this.details = false
                this.$eventBus.$emit('closeDetails')
            },
            detailOrder() {
                this.details = true
            },
        }
        }
</script>