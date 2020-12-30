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
                    <ul class="page-order__desc-list">
                        <li class="page-order__desc-item" v-for="(item, index) in deliveryInfo">
                            <div class="page-order__desc-icon">
                                <svg v-if="index == 1">
                                    <use :xlink:href="templatePath + `images/sprite.svg#icons__${item.icon}`"></use>
                                </svg>
                                <svg viewBox="-3 -5 20 20" v-else>
                                    <use :xlink:href="templatePath + `images/sprite.svg#icons__${item.icon}`"></use>
                                </svg>
                            </div>
                            <div class="page-order__desc-info">
                                <div class="page-order__desc-subtitle">
                                    {{item.title}}
                                </div>
                                <div class="page-order__desc-desc">
                                    {{item.desc}}
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="order-desc">
                        <h3 class="order-desc__title">Стоимость заказа</h3>
                        <ul class="order-desc__list">
                            <li class="order-desc__item">
                                <div class="order-desc__name">Цена</div>
                                <div class="order-desc__price">{{ order.price }} &#8381;</div>
                            </li>
                            <li class="order-desc__item order-desc__item_discount">
                                <div class="order-desc__name">Скидка</div>
                                <div class="order-desc__price order-desc__price_discount">{{ order.discount }} &#8381;</div>
                            </li>
                            <li class="order-desc__item order-desc__item_delivery">
                                <div class="order-desc__name">Экономия</div>
                                <div class="order-desc__price">+{{ order.economy }} &#8381;</div>
                            </li>
                            <li class="order-desc__item order-desc__item_total">
                                <div class="order-desc__name order-desc__name_total">Ваша цена</div>
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
                                <div class="order-desc__btn-text">
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
            fixedButton: true,
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
                let pcH = (this.$refs.content.clientHeight).toFixed(0)
                this.fixedButton = +pcH > +windowPosition
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