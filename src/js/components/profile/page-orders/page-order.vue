<template>
    <div class="order">
        <div
            class="breadcrumbs"
            @click="allOrders"
        >
            <svg class="breadcrumbs__back" viewBox="0 0 18 15">
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
            </svg>
            <span>{{ $tc('link.back') }}</span>
        </div>
        <div class="order__header">
            <h2 class="profile__title">{{ $tc('link.orders_list') }}</h2>
        </div>
        
    <div class="order__main">
        
        
        <div class="page-order" ref="content">
            
            <div class="page-order__head">
                <div class="page-order__info">
                    <div class="page-order__number">{{ $tc('text.order') }} #{{ order.number }}</div>
                    <div class="page-order__date">{{ order.date }}</div>
                    <div class="page-order__status">{{ order.status }}</div>
                </div>
                <div class="page-order__select">
                    <select-list
                        :points="order.documents"
                        :icon="icon"
                        :selectopenSelect="order.currentDocument"
                    ></select-list>
                </div>
                <div @click.stop="openModal('repeat-order')" class="page-order__btn">
                    <div class="page-order__btn-icon">
                        <svg>
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__repeat'"></use>
                        </svg>
                    </div>
                    <div class="page-order__btn-text">{{ $tc('profile_orders.link.repeat') }}</div>
                </div>
            </div>
            <div class="page-order__main">
                <div class="page-order__table">
                    <div class="page-order__article">{{ $tc('text.articul') }}</div>
                    <div class="page-order__name">{{ $tc('text.name') }}</div>
                    <div class="page-order__qty">{{ $tc('text.quantity') }}</div>
                    <div class="page-order__item-price">{{ $tc('text.price') }}/{{ $tc('text.count') }}</div>
                    <div class="page-order__old-price">{{ $tc('text.price_old') }}</div>
                    <div class="page-order__discount">{{ $tc('text.discount') }}</div>
                    <div class="page-order__new-price">{{ $tc('text.price_new') }}</div>
                </div>
                <order-product-list :orderId="order.id" :showAll="true" :opened="true" :products="order.basket"></order-product-list>
                <div class="page-order__desc">
                    <ul class="page-order__desc-list">
                        <li class="page-order__desc-item" v-for="(item, index) in deliveryInfo">
                            <div class="page-order__desc-icon">
                                <svg v-if="index === 1">
                                    <use :xlink:href="templatePath + `images/sprite.svg#icons__${item.icon}`"></use>
                                </svg>
                                <svg viewBox="-3 -5 20 20" v-else>
                                    <use :xlink:href="templatePath + `images/sprite.svg#icons__${item.icon}`"></use>
                                </svg>
                            </div>
                            <div class="page-order__desc-info">
                                <div class="page-order__desc-subtitle">
                                    {{ $tc(item.title) }}
                                </div>
                                <div class="page-order__desc-desc">
                                    {{item.desc}}
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="order-desc">
                        <h3 class="order-desc__title">{{ $tc('profile_orders.title.price') }}</h3>
                        <ul class="order-desc__list">
                            <li class="order-desc__item">
                                <div class="order-desc__name">{{ $tc('text.price') }}</div>
                                <div class="order-desc__price">{{ order.price }} &#8381;</div>
                            </li>
                            <li class="order-desc__item order-desc__item_discount">
                                <div class="order-desc__name">{{ $tc('text.discount') }}</div>
                                <div class="order-desc__price order-desc__price_discount">{{ order.discount }} &#8381;</div>
                            </li>
                            <li class="order-desc__item order-desc__item_delivery">
                                <div class="order-desc__name">{{ $tc('profile_orders.economy') }}</div>
                                <div class="order-desc__price">+{{ order.economy }} &#8381;</div>
                            </li>
                            <li class="order-desc__item order-desc__item_total">
                                <div class="order-desc__name order-desc__name_total">{{ $tc('text.price_yours') }}</div>
                                <div class="order-desc__price order-desc__price_total">{{ order.priceTotal }} &#8381;</div>
                            </li>
                        </ul>
                        <div class="order-desc__btn"
                             :class="{'order-desc__btn_fixed': fixedButton}"
                             @click.stop="openModal('repeat-order')"
                        >
                            <div class="order-desc__btn-wrapper">
                                <div class="order-desc__btn-icon">
                                    <svg>
                                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__repeat'"></use>
                                    </svg>
                                </div>
                                <div class="order-desc__btn-text">{{ $tc('profile_orders.link.repeat') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    </div>
    </div>
</template>

<script>
import selectList from '../../partials/select-list.vue'
import OrderProductList from './order-product-list.vue'

import * as Api from '../../../api';
let api = Api.getInstance();

export default {
    components: { selectList,OrderProductList},
    name:"page-order",
    data(){
        return {
            order: {
                id: 0,
                date: 0,
                address: '',
                address_full: '',
                status: '',
                paid: false,
                count: 0,
                prices: {
                    base: 0,
                    tax: 0,
                    delivery: 0
                },
                client: '',
                payment: '',
                documents: [],
                currentDocument: {},
                basket: []
            },
            flag: true,
            fixedButton: true,
            icon:'icons__download'
        }
    },
    mounted() {
        this.prepareOrder(this.$route.params.id);
    },
    computed: {
        deliveryInfo() {
            return [
                {
                    icon: 'car',
                    title: 'text.delivery',
                    desc: this.order.address
                },
                {
                    icon: 'user-profile',
                    title: 'profile_orders.title.recipient',
                    desc: this.order.client
                },
                {
                    icon: 'paycard',
                    title: 'profile_orders.title.payment',
                    desc: this.order.payment
                },
            ]
        },
    },
    methods:{
        allOrders() {
            this.$router.go(-1)
            //this.details = false
            //this.$eventBus.$emit('closeDetails')
            this.$eventBus.$emit('hideBreadcrumbs', false)
        },
        prepareOrder(orderId) {
            api.personalOrder(this.$route.params.id).then((order) => {
                this.order = order;
                this.$eventBus.$emit('change-current-point', order.currentDocument)
                console.log('this.order', this.order);
            }).catch((error) => {
                this.$router.push('/account/orders/');
            });
        },
        mouseWheel(){
            if(window.innerWidth < 768) {
                let windowPosition = (window.pageYOffset + window.innerHeight).toFixed(0)
                let pcH = (this.$refs.content.clientHeight).toFixed(0)
                this.fixedButton = +pcH > +windowPosition
            }
        },
        closeStickyBtn(){
            this.fixedButton = false
        },
        openModal(modal) {

            let vm = this;
            //debugger;            

            let result = vm.order.basket.filter(function (item) {
                //debugger;
                return item.available === false
            })
            console.log('vm.products' , vm.products, 'result' , result);
            let repeatOrder = {
                'products': result,
                'orderNumber': vm.order.number
            }

            this.$eventBus.$emit("openModal", modal, repeatOrder, false, false)

        } 
    },
    created () {
        window.addEventListener('scroll', this.mouseWheel);
        this.$eventBus.$on("closeStickyButton", this.closeStickyBtn);
    },
}
</script>