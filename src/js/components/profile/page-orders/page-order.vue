<template>
    <div class="page-order">
        <div class="page-order__head">
            <div class="page-order__info">
                <div class="page-order__number">Заказ #325214</div>
                <div class="page-order__date">31.12.2020</div>
                <div class="page-order__status">Выполнен</div>
            </div>
            <div class="page-order__select">
                <select-list></select-list>
            </div>
            <div class="page-order__btn">
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
            <ul class="page-order__list">
                <li class="page-order__item">Артикул</li>
                <li class="page-order__item">Название</li>
                <li class="page-order__item">Кол-во</li>
                <li class="page-order__item">Цена/шт.</li>
                <li class="page-order__item">Старая цена</li>
                <li class="page-order__item">Скидка</li>
                <li class="page-order__item">Новая цена</li>
            </ul>
            <order-product-list :flag='flag' :products="products"></order-product-list>
            <div class="page-order__desc">
                <ul class="page-order__desc-list">
                    <li class="page-order__desc-item" v-for="item in deliveryInfo">
                        <div class="page-order__desc-icon">
                            <svg>
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
                <div class="page-order__desc-order">
                    <h3 class="page-order__desc-title">Стоимость заказа</h3>
                    <ul class="page-order__desc-list">
                        <li class="page-order__desc-item"></li>
                        <li class="page-order__desc-item"></li>
                        <li class="page-order__desc-item"></li>
                        <li class="page-order__desc-item"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import selectList from '../select-list.vue'
import OrderProductList from './order-product-list.vue'
export default {
    components: { selectList,OrderProductList},
    name:"page-order",
    data(){
        return{
            flag: true,
            deliveryInfo:[
                {
                    icon: 'car',
                    title: 'Доставка курьером',
                    desc: 'Москва, Трехгорный Вал 3, ст. 26'
                },
                {
                    icon: 'user-profile',
                    title: 'Получатель',
                    desc: 'Константин Константинопольский konstantynopolsky@gmail.com +7 (910) 872-92-89'
                },
                {
                    icon: 'paycard',
                    title: 'Оплата',
                    desc: 'Оплата онлайн по карте'
                },
            ],
            products:[
                {
                    art:'325214',
                    desc:'Trimmer pe benzina GT-52S...',
                    qty:'12',
                    itemPrice:'65 RON',
                    allPrice:'910.30 RON',
                    discount:'10%',
                    totalPrice:'810.30 RON'
                },
                {
                    art:'325214',
                    desc:'Trimmer pe benzina GT-52S...',
                    qty:'12',
                    itemPrice:'65 RON',
                    allPrice:'910.30 RON',
                    discount:'10%',
                    totalPrice:'810.30 RON'
                },
                {
                    art:'325214',
                    desc:'Trimmer pe benzina GT-52S...',
                    qty:'12',
                    itemPrice:'65 RON',
                    allPrice:'910.30 RON',
                    discount:'10%',
                    totalPrice:'810.30 RON'
                },
                {
                    art:'325214',
                    desc:'Trimmer pe benzina GT-52S...',
                    qty:'12',
                    itemPrice:'65 RON',
                    allPrice:'910.30 RON',
                    discount:'10%',
                    totalPrice:'810.30 RON'
                },
                {
                    art:'325214',
                    desc:'Trimmer pe benzina GT-52S...',
                    qty:'12',
                    itemPrice:'65 RON',
                    allPrice:'910.30 RON',
                    discount:'10%',
                    totalPrice:'810.30 RON'
                },
            ]
        }
    },
    methods:{

    }
}
</script>