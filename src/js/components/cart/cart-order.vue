<template>
    <div class="cart-order">
        <cart-order-head
            :currentPrice="productsPrice"
        ></cart-order-head>
        <div class="cart-order__content">
            <h2 class="cart-order__title">{{ $tc('cart.title.full') }}</h2>
            <div class="cart-order__desc">
                <ul class="cart-order__list">
                    <li class="cart-order__item">
                        <div class="cart-order__text">{{ $tc('cart.order.all_price') }}</div>
                        <div class="cart-order__price">
                            {{ currency(productsPrice) }}
                            <span>{{ $tc('text.currency') }}</span>
                        </div>
                    </li>
                    <li class="cart-order__item" v-for="item in cartOrderArr">
                        <div class="cart-order__text">{{ $tc('text.discount') }}</div>
                        <div class="cart-order__price cart-order__price--green">
                            {{ currency(item.price) }}
                            <span>{{ $tc('text.currency') }}</span>
                        </div>
                    </li>
                    <li class="cart-order__item cart-order__item--total">
                        <div class="cart-order__text cart-order__text--total">{{ $tc('cart.order.your_price')}}</div>
                        <div class="cart-order__total-price">
                            {{ currency(getTotalPrice) }}
                            <span>{{ $tc('text.currency') }}</span>
                            </div>
                    </li>
                </ul>
            </div>
            <div ref="cartOrderInfo" class="cart-order__info">
                {{ $tc('cart.order.info')}}
            </div>
            <div class="cart-order__btn-wrap" 
                 :class="{'cart-order__btn-wrap--fixed': fixedFlag}" 
                 v-if="place === 'cart'"
            >
                <a :href="checkoutLink" class="cart-order__btn">{{ $tc('cart.order.button') }}</a>
            </div>
        </div>
    </div>
</template>

<script>
import cartOrderHead from './cart-order-head.vue'
import config from "../../config";

export default {
  components: { cartOrderHead },
    name:"cart-order",
    props: {
        productsPrice: {
            required: true,
            type: Number
        },
        place: {
            required: false,
            type: String,
            default: 'cart'
        }
    },
    data(){
        return{
            cartOrderArr:[
                 {
                    "price": 918,
                },
                 {
                    "price": 1,
                },
                 {
                    "price": 1,
                }
            ],
            fixedFlag: false,
            checkoutLink: config.links.checkout
        }
    },
    computed:{
        getTotalPrice(){
            let vm = this
            if(!vm.cartOrderArr.length){
                return vm.productsPrice
            } else{
                return vm.productsPrice - vm.cartOrderArr[0].price + vm.cartOrderArr[1].price + vm.cartOrderArr[2].price
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
                this.fixedFlag = windowPosition < cartInfoPosition;
            } else {
                this.fixedFlag = false
            }
        }
    }
}
</script>