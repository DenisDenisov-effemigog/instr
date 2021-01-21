<template>
    <div class="cart-order">
        <cart-order-head
            :currentPrice="productsPrice"
        ></cart-order-head>
        <div class="cart-order__content">
            <h2 class="cart-order__title">Корзина</h2>
            <div class="cart-order__desc">
                <ul class="cart-order__list">
                    <li class="cart-order__item">
                        <div class="cart-order__text">Цена без скидки</div>
                        <div class="cart-order__price">
                            {{ currency(productsPrice) }}
                            <span>₽</span>
                        </div>
                    </li>
                    <li class="cart-order__item" v-for="item in cartOrderArr">
                        <div class="cart-order__text">{{item.text}}</div>
                        <div class="cart-order__price" :class="{'cart-order__price--green' :item.discount}">
                            {{ currency(item.price) }}
                            <span>₽</span>
                        </div>
                    </li>
                    <li class="cart-order__item cart-order__item--total">
                        <div class="cart-order__text cart-order__text--total">Ваша цена</div>
                        <div class="cart-order__total-price">
                            {{ currency(getTotalPrice) }}
                            <span>₽</span>
                            </div>
                    </li>
                </ul>
            </div>
            <div ref="cartOrderInfo" class="cart-order__info">
                *Здесь может находиться какой нибудь поясняющий текст или предупреждающий.
            </div>
            <div class="cart-order__btn-wrap" :class="{'cart-order__btn-wrap--fixed': fixedFlag}">
                <!-- TODO добавить ссылку на чекаут -->
                <a href="#checkout" class="cart-order__btn">Оформить заказ</a>
            </div>
        </div>
    </div>
</template>

<script>
import cartOrderHead from './cart-order-head.vue'
export default {
  components: { cartOrderHead },
    name:"cart-order",
    props: {
        productsPrice: {
            required: true,
            type: Number
        }
    },
    data(){
        return{
            cartOrderArr:[
                 {
                    "text": "Скидка",
                    "price": 918,
                    "discount": true
                },
                 {
                    "text": "Скидка",
                    "price": 1,
                    "discount": true
                },
                 {
                    "text": "Скидка",
                    "price": 1,
                    "discount": true
                }
            ],
            fixedFlag: false
        }
    },
    computed:{
        getTotalPrice(){
            let vm = this
            if(!vm.cartOrderArr.length){
                return vm.productsPrice
            } else{
                let totalPrice = vm.productsPrice - vm.cartOrderArr[0].price + vm.cartOrderArr[1].price + vm.cartOrderArr[2].price
                return totalPrice
            }
            
        }
    },
    created(){
        window.addEventListener('scroll', this.mobileScroll)
        window.addEventListener('resize', this.mobileScroll)
    },
    methods:{
        mobileScroll(){
            if(window.innerWidth < 1024) {
                let windowPosition = window.pageYOffset + window.innerHeight
                let cartInfoPosition = this.$refs.cartOrderInfo.offsetTop + this.$refs.cartOrderInfo.offsetHeight + 64
                if(windowPosition < cartInfoPosition){
                    this.fixedFlag = true
                }else{
                    this.fixedFlag = false
                }
            } else {
                this.fixedFlag = false
            }
        }
    }
}
</script>