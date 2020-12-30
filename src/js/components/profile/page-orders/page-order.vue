<template>
    <div class="order">
        <div
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
        
    <div class="order__main">
        
        
        <div class="page-order" ref="content">
            
            <div class="page-order__head">
                <div class="page-order__info">
                    <div class="page-order__number">Заказ #{{ order.number }}</div>
                    <div class="page-order__date">{{ order.date }}</div>
                    <div class="page-order__status">{{ order.status }}</div>
                </div>
                <div class="page-order__select">
                    <select-list
                        :points="points"
                        :icon="icon"
                        :selectFlag="selectFlag"
                    ></select-list>
                </div>
                <div @click.stop="openModal('repeat-order')" class="page-order__btn">
                    <div class="page-order__btn-icon">
                        <svg>
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__repeat'"></use>
                        </svg>
                    </div>
                    <div class="page-order__btn-text">
                        Повторить заказ
                    </div>
                </div>
            </div>
            <div class="page-order__main">
                <div class="page-order__table">
                    <div class="page-order__article">Артикул</div>
                    <div class="page-order__name">Название</div>
                    <div class="page-order__qty">Кол-во</div>
                    <div class="page-order__item-price">Цена/шт.</div>
                    <div class="page-order__old-price">Старая цена</div>
                    <div class="page-order__discount">Скидка</div>
                    <div class="page-order__new-price">Новая цена</div>
                </div>
                <order-product-list :orderId="order.id" :showAll="true" :opened="true" :products="order.basket"></order-product-list>
                <div class="page-order__desc">
                    <ul class="page-order__desc_list">
                        <li class="page-order__desc_item" v-for="item in deliveryInfo">
                            <div class="page-order__desc_icon">
                                <svg>
                                    <use :xlink:href="templatePath + `images/sprite.svg#icons__${item.icon}`"></use>
                                </svg>
                            </div>
                            <div class="page-order__desc_info">
                                <div class="page-order__desc_subtitle">
                                    {{item.title}}
                                </div>
                                <div class="page-order__desc_desc">
                                    {{item.desc}}
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="page-order__desc-order">
                        <h3 class="page-order__desc-order_title">Стоимость заказа</h3>
                        <ul class="page-order__desc-order_list">
                            <li class="page-order__desc-order_item">
                                <div class="page-order__desc-order_name">Цена</div>
                                <div class="page-order__desc-order_price">{{ order.price }} &#8381;</div>
                            </li>
                            <li class="page-order__desc-order_item page-order__desc-order_item--discount">
                                <div class="page-order__desc-order_name">Скидка</div>
                                <div class="page-order__desc-order_price page-order__desc-order_price--discount">{{ order.discount }} &#8381;</div>
                            </li>
                            <li class="page-order__desc-order_item page-order__desc-order_item--delivery">
                                <div class="page-order__desc-order_name">Экономия</div>
                                <div class="page-order__desc-order_price">+{{ order.economy }} &#8381;</div>
                            </li>
                            <li class="page-order__desc-order_item page-order__desc-order_item--total">
                                <div class="page-order__desc-order_name">Ваша цена</div>
                                <div class="page-order__desc-order_price page-order__desc-order_price--total">{{ order.priceTotal }} &#8381;</div>
                            </li>
                        </ul>
                        <div class="page-order__desc-order_btn"
                             :class="{'page-order__desc-order_btn--fixed': fixedButton}"
                             @click.stop="openModal('repeat-order')"
                        >
                            <div class="page-order__desc-order_btn_wrapper">
                                <div class="page-order__desc-order_btn_icon">
                                    <svg>
                                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__repeat'"></use>
                                    </svg>
                                </div>
                                <div class="page-order__desc-order_btn_text">
                                    Повторить заказ
                                </div>
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
import selectList from '../select-list.vue'
import OrderProductList from './order-product-list.vue'

import * as Api from '../../../api';
let api = Api.getInstance();

export default {
    components: { selectList,OrderProductList},
    name:"page-order",
    props: {
        /*order: {
            type: Object,
            required: true
        },*/
    },
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
                /*payment: {
                    id: 0,
                    name: ''
                },*/
                client: '',
                payment: '',
                basket: []
            },
            points:['Загрузить еще что-нибудь','Загрузить счет-фактуру'],
            flag: true,
            selectFlag: false,
            fixedButton: false,
            icon:'icons__download'
        }
    },
    mounted() {
        this.prepareOrder(this.$route.params.id);
        //this.$store.dispatch('addressUpdatePersons');
    },
    computed: {
        deliveryInfo() {
            return [
                {
                    icon: 'car',
                    title: 'Доставка',
                    desc: this.order.address
                },
                {
                    icon: 'user-profile',
                    title: 'Получатель',
                    desc: this.order.client
                },
                {
                    icon: 'paycard',
                    title: 'Оплата',
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
                console.log('this.order', this.order);
            }).catch((error) => {
                this.$router.push('/account/orders/');
            });
        },
        mouseWheel(){
            if(window.innerWidth < 768) {
                let windowPosition = (window.pageYOffset + window.innerHeight).toFixed(0)
                let pcH = this.$refs.content.clientHeight.toFixed(0)
                this.fixedButton = pcH > windowPosition;
            }
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
    },
}
</script>