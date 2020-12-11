<template>
    <div class="add-to-cart" :class="{'add-to-cart--big': size==='big'}">
        <div class="add-to-cart__in-cart" v-if="amount > 0">
			<div
				class="add-to-cart__button add-to-cart__button_decrease"
				:disabled="decreaseDisabled"
				@click="decrease"
			>
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#minus'"></use>
                </svg>
			</div>
            
            <input 
                v-if="allowNull === false" 
                type="number" 
                class="add-to-cart__amount-input" 
                @change="changeVal($event.target.value)" 
                :value="amount"
            > 
            <span v-else class="add-to-cart__amount">
                <span v-if="text">{{ text }}</span>
                <template>{{ amount }} шт.</template>
            </span>
            
			<div
				class="add-to-cart__button add-to-cart__button_increase"
				:disabled="increaseDisabled"
				@click="increase"
			>
                <svg viewBox="2 2 12 12">
                    <use :xlink:href="templatePath + 'images/sprite.svg#plus'"></use>
                </svg>
			</div>
        </div>
		<div v-else >
            <div 
                class="add-to-cart__add" 
                :class="{'add-to-cart__add--smaller': changeIcon && width < 760}" 
                @click="increase">
                <svg v-if="changeIcon && width < 760">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__cart'"></use>
                </svg>
              <template v-else>{{ buttonTitle }}</template>  
            </div>
		</div>
    </div>
</template>

<script>

    export default {
        name: "add-to-cart",
        props: {
            maxAmount: {
                type: Number,
                required: false,
                default: 100
            },
            allowNull:{
                type:Boolean,
                required: false,
                default: true
            },
            changeIcon: {
                type: Boolean,
                default: false,
            },
            text: {
                type: String,
                default: '',
                required: false,
            },
            buttonTitle: {
                type: String,
                default: 'В корзину',
                required: false,
            },
            size: {
                type: String,
                default: '',
                required: false,
            },
        },
        data() {
            return {
                amount: 0,
                width: 0,
            };
        },
        computed: {
            increaseDisabled() {
                return this.amount >= this.maxAmount;
            },
            decreaseDisabled() {
                return this.amount <= this.allowedDecreaseAmount;
            },
            allowedDecreaseAmount() {
                return this.allowNull ? 0 : 1;
            },
        },
        watch: {
        },
        mounted() {
        },
        created() {
            window.addEventListener('resize', this.updateWidth);
            this.updateWidth()
            window.addEventListener('scroll', this.mobileScroll);
        },
        methods: {
            decrease() {
                if (this.amount > this.allowedDecreaseAmount) {
                    this.amount--;
                }
            },
            updateWidth() {
                this.width = window.innerWidth;
            },
            increase() {
                if (this.amount < this.maxAmount) {
                    this.amount++;
                }
            },
            changeVal(e){
                this.amount = Number(e)
                if (this.amount <= this.maxAmount && this.amount >= this.allowedDecreaseAmount){
                    return
                }else{
                    if (this.amount >= this.maxAmount){
                        this.amount = this.maxAmount
                        return
                    }
                    if (this.amount <= this.allowedDecreaseAmount){
                        this.amount = this.allowedDecreaseAmount
                        return
                    }
                }
            },
            mobileScroll(){
                if(window.innerWidth < 768) {
                    let productOrder = document.querySelector('.product-order__wrapper')
                    if(productOrder !== null){
                        let productOrderPosition = productOrder.offsetTop + (productOrder.clientHeight - 24)
                        let windowPosition = window.pageYOffset
                        if(windowPosition > productOrderPosition){
                            this.$eventBus.$emit('openStickyButton', 'Добавить в корзину')
                        }else{
                            this.$eventBus.$emit('closeStickyButton')
                        }
                    }
                }
            }
        }
    }
</script>