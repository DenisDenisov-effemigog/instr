<template>
    <div class="add-to-cart">
        <div class="add-to-cart__in-cart" v-if="amount > 0">
			<div
				class="add-to-cart__button add-to-cart__button_decrease"
				:disabled="decreaseDisabled"
				@click="decrease"
			>
                <svg>
                    <use :xlink:href="'./images/sprite.svg#minus'"></use>
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
                <template>{{ amount }} шт.</template>
            </span>
            
			<div
				class="add-to-cart__button add-to-cart__button_increase"
				:disabled="increaseDisabled"
				@click="increase"
			>
                <svg viewBox="2 2 12 12">
                    <use :xlink:href="'./images/sprite.svg#plus'"></use>
                </svg>
			</div>
        </div>
		<div v-else >
            <div class="add-to-cart__add" @click="increase">
              <template>В корзину</template>  
            </div>
            <!--<div class="add-to-cart__add__mobile">
                <svg class="add-to-cart__add__mobile-icon">
                    <use xlink:href="./images/sprite.svg#icons__cart"></use>
                </svg>
            </div>-->
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
        },
        data() {
            return {
                amount: 0,
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
        methods: {
            decrease() {
                if (this.amount > this.allowedDecreaseAmount) {
                    this.amount--;
                }
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
        }
    }
</script>