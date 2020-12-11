<template>
    <ul class="order__list">
        <li class="order__item" v-for="item in dataArr" :key="item.id">
            <div class="order__desc">
                <div class="order__number">{{item.number}}</div>
                <div class="order__date">{{item.date}}</div>
                <div class="order__status">{{item.status}}</div>
                <div class="order__qty">{{item.qty}}</div>
                <div class="order__price">{{item.price}}</div>
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
            dataArr:[
                {
                    id: 1,
                    number:'#325214',
                    date:'31.12.2020',
                    status:'Выполнен',
                    qty:'1 000 000 товаров',
                    price:'1 000 819.27 RON'
                },
                {
                    id: 2,
                    number:'#325214',
                    date:'31.12.2020',
                    status:'Выполнен',
                    qty:'2 товарa',
                    price:'1 000 819.27 RON',
                    product:[
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
                },
                {
                    id: 3,
                    number:'#325214',
                    date:'31.12.2020',
                    status:'Выполнен',
                    qty:'4 товара',
                    price:'819.27 RON',
                    product:[
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
                        }
                    ]
                },
                {
                    id: 4,
                    number:'#325214',
                    date:'31.12.2020',
                    status:'Выполнен',
                    qty:'1 000 000 товаров',
                    price:'1 000 819.27 RON'
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