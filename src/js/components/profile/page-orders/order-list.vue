<template>
    <div>
        <ul class="order__list" v-if="!showDetails">
            <li class="order__item"
                v-for="(item, index) in orders"
                :key="item.id"
            >
                <div class="order__desc" @click.stop="openDetails(index)">
                    <div class="order__number">#{{item.number}}</div>
                    <div class="order__date">{{item.date}}</div>
                    <div class="order__status">{{item.status}}</div>
                    <div class="order__qty">{{item.qty}} товара</div>
                    <div class="order__price">{{item.priceTotal}} &#8381;</div>
                    <div @click.stop="openModal('repeat-order')" class="order__btn">
                        <div class="order__btn-icon">
                            <svg>
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__repeat'"></use>
                            </svg>
                        </div>
                        <div class="order__btn-text">
                            Повторить заказ
                        </div>
                    </div>
                    <div class="order__arrow">
                        <svg @click.stop="clickArrow">
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                        </svg>
                    </div>
                </div>
                <order-product-list :products="item.product" :orderIndex="index"></order-product-list>
            </li>
        </ul>
        <page-order v-else :order="order"></page-order>
    </div>
</template>

<script>
import orderProductList from './order-product-list.vue'
import PageOrder from './page-order.vue'
export default {
     components: { 
         orderProductList,
         PageOrder, 
     },
     name: 'order-list',
     props: {
         value: {
             type: Boolean,
             required: true
         },
         orders: {
             type: Array,
             required: true
         },
     },
     data(){
         return{
             order: {},
         }
    },
    model: {
        prop: 'value',
        event: 'change',
    },
    computed: {
        showDetails: {
            get: function () {
                return this.value;
            },
            set: function (newValue) {
                this.$emit('change', newValue);
            }
        },
    },
    created(){
        this.$eventBus.$on("detailOrder", this.openDetails)
    },
    methods:{
         clickArrow(e){
             e.target.closest('div').classList.toggle('order__arrow--open')
             e.target.closest('div').parentElement.nextElementSibling.classList.toggle('order__product-list--open')
         },
        openDetails(index){
            this.showDetails = true
            this.order = this.orders[index]
            this.$eventBus.$emit("openDetails")
        },
        openModal(modal) {
            this.$eventBus.$emit("openModal", modal, '', false)
        },
    }
}
</script>