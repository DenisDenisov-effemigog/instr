<template>
    <div class="cart-order">
        <cart-order-head
            :currentPrice="cartOrderArr[0].price"
        ></cart-order-head>
        <div class="cart-order__content">
            <h2 class="cart-order__title">Корзина</h2>
            <div class="cart-order__desc">
                <ul class="cart-order__list">
                    <li class="cart-order__item" v-for="item in cartOrderArr">
                        <div class="cart-order__text">{{item.text}}</div>
                        <div class="cart-order__price" :class="{'cart-order__price--green' :item.discount}">
                            {{item.price}}
                            <span>₽</span>
                        </div>
                    </li>
                    <li class="cart-order__item cart-order__item--total">
                        <div class="cart-order__text cart-order__text--total">Ваша цена</div>
                        <div class="cart-order__total-price">
                            {{getTotalPrice}}
                            <span>₽</span>
                            </div>
                    </li>
                </ul>
            </div>
            <div ref="cartOrderInfo" class="cart-order__info">
                *Здесь может находиться какой нибудь поясняющий текст или предупреждающий.
            </div>
            <div class="cart-order__btn-wrap" :class="{'cart-order__btn-wrap--fixed': fixedFlag}">
                <div class="cart-order__btn">Оформить заказ</div>
            </div>
        </div>
    </div>
</template>

<script>
import cartOrderHead from './cart-order-head.vue'
export default {
  components: { cartOrderHead },
    name:"cart-order",
    data(){
        return{
            cartOrderArr:[
                {
                    "text": "Цена без скидки",
                    "price": 6920
                },
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
            if(this.cartOrderArr.length == 1){
                return this.cartOrderArr.price
            }else{
                let totalPrice = this.cartOrderArr[0].price
                for(let i = 1; i < this.cartOrderArr.length; i++){
                    totalPrice = totalPrice - this.cartOrderArr[i].price
                }
                if(String(totalPrice).length > 3){
                    totalPrice = String(totalPrice)[0] + ' ' + String(totalPrice).slice(1, String(totalPrice).length)
                }
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
                console.log('windowPosition ' + windowPosition)
                console.log('cartInfoPosition ' + cartInfoPosition)
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