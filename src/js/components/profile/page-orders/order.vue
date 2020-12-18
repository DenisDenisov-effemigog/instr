<template>
    <div>
        <div class="order__desc" @click.stop="openDetails(index)">
            <div class="order__number">#{{order.number}}</div>
            <div class="order__date">{{order.date}}</div>
            <div class="order__status">{{order.status}}</div>
            <div class="order__qty">{{order.qty}} товара</div>
            <div class="order__price">{{order.priceTotal}} &#8381;</div>
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
            <div class="order__arrow" :class="{'order__arrow--open': opened}">
                <svg @click.stop="clickArrow">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                </svg>
            </div>
        </div>
        <order-product-list :products="order.product" :orderIndex="index" :opened="opened"></order-product-list>
    </div>
</template>

<script>
import orderProductList from './order-product-list.vue'
export default {
    components: {
        orderProductList,
    },
    name: 'order',
    props: {
        order: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
    },
    data(){
        return{
            opened: false,
        }
    },
    created(){
        this.$eventBus.$on("detailOrder", this.openDetails)
    },
    methods:{
        clickArrow(){
            this.opened = !this.opened
        },
        openDetails(index){
            this.$eventBus.$emit("openDetails", index)
        },
        openModal(modal) {
            let vm = this;
            
            let result = vm.order.product.filter(function (item) {
                return item.available === false
            })
            this.$eventBus.$emit("openModal", modal, result, false)
        },
    }
}
</script>