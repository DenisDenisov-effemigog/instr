<template>
    <div class="order">
        <div class="order__header">
            <h2 class="profile__title">Список заказов</h2>
        </div>
        <div class="order__info">
            <div class="order__info-icon">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__wanted'"></use>
                </svg>
            </div>
            <div class="order__info-text">
                В этом разделе вы найдете информацию о заказах, сделанных на сайте
            </div>
        </div>
        <div class="order__info-select">
            <select-list
                :points="points"
            ></select-list>
        </div>
        <div class="order__main">
            <order-list></order-list>
        </div>
        <page-order></page-order>
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
        }
    },
    methods:{

    }
}
</script>