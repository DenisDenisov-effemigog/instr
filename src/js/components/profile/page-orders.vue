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
        <div v-if="profile.length === 0" class="order__none">
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
            <order-list v-model.trim="details" :orders="profile"></order-list>
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
            profile: {
                required: true,
                type: Array,
            },
        },
        data(){
            return{
                points:['Выполнен','В ожидании оплаты','Отменен'],
                details: false,
                icon:'check'
            }
        },
        created(){
            this.$eventBus.$on("allOrders", this.allOrders)
        },
        methods:{
            allOrders() {
                this.details = false
                this.$eventBus.$emit('closeDetails')
            },
        }
    }
</script>