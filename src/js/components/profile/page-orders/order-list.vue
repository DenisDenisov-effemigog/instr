<template>
    <ul class="order__list">
        <li class="order__item" v-for="item in orders" :key="item.id">
            <div class="order__desc">
                <div class="order__number">#{{item.number}}</div>
                <div class="order__date">{{item.date}}</div>
                <div class="order__status">{{item.status}}</div>
                <div class="order__qty">{{item.qty}}</div>
                <div class="order__price">{{item.price}} &#8381;</div>
                <div class="order__btn">
                    <div class="order__btn-icon">
                        <svg>
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__repeat'"></use>
                        </svg>
                    </div>
                    <div class="order__btn-text">
                        Повторить заказ
                    </div>
                </div>
                <div v-if="item.product" class="order__arrow">
                    <svg @click="clickArrow">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                    </svg>
                </div>
                <div v-else class="order__arrow">
                    <svg>
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                    </svg>
                </div>
            </div>
            <order-product-list
                v-if="item.product"
                :products = item.product
            ></order-product-list>
        </li>
    </ul>
</template>

<script>
import orderProductList from './order-product-list.vue'
export default {
 components: { orderProductList },
    name: 'order-list',
    data(){
        return{
            flag: false,
            orders:[
                {
                    id: 1,
                    number:'325214',
                    date:'31.12.2020',
                    status:'Выполнен',
                    qty:'8 товаров',
                    price:'1 000 819',
                    product:[
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        },
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        },
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        },
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        },
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        },
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30;',
                            discount:'10%',
                            totalPrice:'810.30'
                        },
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        },
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        }
                    ]
                },
                {
                    id: 2,
                    number:'325214',
                    date:'31.12.2020',
                    status:'Выполнен',
                    qty:'2 товарa',
                    price:'1 000 819',
                    product:[
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        },
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        },
                    ]
                },
                {
                    id: 3,
                    number:'325214',
                    date:'31.12.2020',
                    status:'Выполнен',
                    qty:'4 товара',
                    price:'819',
                    product:[
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        },
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        },
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        },
                        {
                            art:'325214',
                            desc:'Trimmer pe benzina GT-52S...',
                            qty:'12',
                            itemPrice:'65',
                            allPrice:'910.30',
                            discount:'10%',
                            totalPrice:'810.30'
                        }
                    ]
                },
                {
                    id: 4,
                    number:'325214',
                    date:'31.12.2020',
                    status:'Выполнен',
                    qty:'1 000 000 товаров',
                    price:'1 000 819'
                }
            ]
        }
    },
    methods:{
        clickArrow(e){
            e.target.closest('div').classList.toggle('order__arrow--open')
            e.target.closest('div').parentElement.nextElementSibling.classList.toggle('order__product-list--open')
        }
    }
}
</script>