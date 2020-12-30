<template>
    <div>        
        <div class="order__desc" @click.stop="openDetails(index)">
            <div class="order__number">#{{order.number}}</div>
            <div class="order__date">{{order.date}}</div>
            <div class="order__status">{{order.status}}</div>
            
            <span>{{ $tc('products', order.qty) }}</span>
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
                <div class="order__arrow_wrap" @click.stop="clickArrow">
                    <svg>
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                    </svg>
                </div>
            </div>
        </div>
        <order-product-list :orderId="order.id" :products="products" :orderIndex="index" :opened="opened"></order-product-list>
    </div>
</template>

<script>
import orderProductList from './order-product-list.vue'

import * as Api from '../../../api/index';

let api = Api.getInstance();

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
            products: [],
            opened: false,
        }
    },
    created(){
        this.$eventBus.$on("detailOrder", this.openDetails)
    },
    methods: {
        getOrderProducts(cb){
            //console.log('this.order ', this.order);
            if (this.products.length == 0) {
                return api.personalOrder(this.order.id).then((order) => {
                    //debugger;
                    //this.order = order;
                    this.products = order.basket;
                    //console.log('this.products', this.products);
                    /*if (cb) {
                        setTimeout(cb, 0);
                    }*/
                }).catch((error) => {
                    this.$router.push('/account/orders/');
                });
            } else {
                return new Promise((resolve, reject) => {
                    //debugger;                    
                    resolve();
                });
            }
        },
        clickArrow(){
            
            this.getOrderProducts();
            
            this.opened = !this.opened;
        },
        openDetails(index){
            //this.$eventBus.$emit("openDetails", index)
            this.$router.push('/account/orders/' + this.order.id + '/');
            this.$eventBus.$emit('hideBreadcrumbs', true);
        },
        openModal(modal) {
            let vm = this;
            //debugger;
            this.getOrderProducts().then(() => {
                //debugger;
                //this.order = order;
                //this.products = order.basket;
                //console.log('this.products', this.products);
                /*if (cb) {
                    setTimeout(cb, 0);
                }*/

                let result = vm.products.filter(function (item) {
                    //debugger;
                    return item.available === false
                })
                console.log('vm.products' , vm.products, 'result' , result);
                let repeatOrder = {
                    'products': result,
                    'orderNumber': vm.order.number
                }

                this.$eventBus.$emit("openModal", modal, repeatOrder, false, false)
                
            }).catch((error) => {
                //this.$router.push('/account/orders/');
            });
            //debugger;
            
        }
    }
}
</script>