<template>
    <div class="order">
        
        <div class="order__header">
            <h2 class="profile__title">Список заказов</h2>
        </div>
        <div v-if="ordersAll.length === 0" class="order__none">
            <div class="order__none_text">У вас пока еще нет заказов</div>
            <div class="order__none_btn">Перейти в каталог</div>
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
                :icon="icon"
            ></select-list>
        </div>
        <div class="order__main">
            <order-list v-model.trim="details" :orders="ordersAll"></order-list>
        </div>
    </div>
</template>

<script>
    import selectList from './select-list.vue'
    import orderList from './page-orders/order-list.vue'
    export default {
         components: { 
             selectList,
             orderList,
         },
        name:"page-orders",
        props:{
            
        },
        data(){
            return{
                profile: [],
                points:['Выполнен','В ожидании оплаты','Отменен'],
                details: false,
                icon:'check'
            }
        },
        mounted() {
            this.$store.dispatch('personalUpdateOrders');
        },
        created(){
            this.$eventBus.$on("allOrders", this.allOrders)
        },
        methods:{
            /*allOrders() {
                this.details = false
                this.$eventBus.$emit('closeDetails')
            },*/
        },
        computed: {
            ordersAll() {
                return this.$store.state.personal.orders;
            },
        }
    }
</script>