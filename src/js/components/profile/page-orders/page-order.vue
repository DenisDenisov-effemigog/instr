<template>
    <div class="page-order">
        <div class="page-order__head">
            <div class="page-order__info">
                <div class="page-order__number">Заказ #325214</div>
                <div class="page-order__date">31.12.2020</div>
                <div class="page-order__status">Выполнен</div>
            </div>
            <div class="page-order__select">
                <select-list
                    :points="points"
                ></select-list>
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
            <div class="page-order__table">
                <div class="page-order__article">Артикул</div>
                <div class="page-order__name">Название</div>
                <div class="page-order__qty">Кол-во</div>
                <div class="page-order__item-price">Цена/шт.</div>
                <div class="page-order__old-price">Старая цена</div>
                <div class="page-order__discount">Скидка</div>
                <div class="page-order__new-price">Новая цена</div>
            </div>
            <order-product-list :flag='flag' :products="products"></order-product-list>
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
                            <div class="page-order__desc-order_price">6 920 ₽</div>
                        </li>
                        <li class="page-order__desc-order_item page-order__desc-order_item--discount">
                            <div class="page-order__desc-order_name">Скидка</div>
                            <div class="page-order__desc-order_price page-order__desc-order_price--discount">918 ₽</div>
                        </li>
                        <li class="page-order__desc-order_item page-order__desc-order_item--delivery">
                            <div class="page-order__desc-order_name">Livrare</div>
                            <div class="page-order__desc-order_price">+119.27 RON</div>
                        </li>
                        <li class="page-order__desc-order_item page-order__desc-order_item--total">
                            <div class="page-order__desc-order_name">Ваша цена</div>
                            <div class="page-order__desc-order_price page-order__desc-order_price--total">6 000 ₽</div>
                        </li>
                    </ul>
                    <div ref="mobileBtn" class="page-order__desc-order_btn">
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
</template>

<script>
import selectList from '../select-list.vue'
import OrderProductList from './order-product-list.vue'
export default {
    components: { selectList,OrderProductList},
    name:"page-order",
    data(){
        return{
            points:['Документы','Ключи','Мотоцикл'],
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
                    itemPrice:'65 ',
                    allPrice:'910 ',
                    discount:'10%',
                    totalPrice:'810 '
                },
                {
                    art:'325214',
                    desc:'Trimmer pe benzina GT-52S...',
                    qty:'12',
                    itemPrice:'65 ',
                    allPrice:'910 ',
                    discount:'10%',
                    totalPrice:'810 '
                },
                {
                    art:'325214',
                    desc:'Trimmer pe benzina GT-52S...',
                    qty:'12',
                    itemPrice:'65 ',
                    allPrice:'910 ',
                    discount:'10%',
                    totalPrice:'810 '
                },
                {
                    art:'325214',
                    desc:'Trimmer pe benzina GT-52S...',
                    qty:'12',
                    itemPrice:'65 ',
                    allPrice:'910 ',
                    discount:'10%',
                    totalPrice:'810 '
                },
                {
                    art:'325214',
                    desc:'Trimmer pe benzina GT-52S...',
                    qty:'12',
                    itemPrice:'65 ',
                    allPrice:'910 ',
                    discount:'10%',
                    totalPrice:'810 '
                },
            ]
        }
    },
    methods:{
        mouseWheel(){
            if(window.innerWidth < 768) {
                let windowPosition = (window.pageYOffset + window.innerHeight).toFixed(0)
                let pcH = document.querySelector('.profile__content').clientHeight.toFixed(0)
                if(pcH > windowPosition){
                    this.$refs.mobileBtn.classList.add('page-order__desc-order_btn--fixed')
                }else{
                    if(this.$refs.mobileBtn.classList.contains('page-order__desc-order_btn--fixed')){
                        this.$refs.mobileBtn.classList.remove('page-order__desc-order_btn--fixed')
                    }
                }
                console.log(pcH)
                console.log(windowPosition)
            }
            
        }
    },
    created () {
        window.addEventListener('scroll', this.mouseWheel);
    },
}
</script>