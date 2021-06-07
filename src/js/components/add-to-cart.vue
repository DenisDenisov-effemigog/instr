<template>
    <div class="add-to-cart" :class="{'add-to-cart--big': size==='big'}">
        <div class="add-to-cart__in-cart" v-if="amount > 0 && !disabled">
			<div
				class="add-to-cart__button add-to-cart__button--decrease"
				:disabled="decreaseDisabled"
				@click="decrease"
			>
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#minus'"></use>
                </svg>
			</div>
            
            <div class="add-to-cart__input">
                <div class="add-to-cart__input-text" v-if="text">{{ $tc(text) }}</div>
                <div class="add-to-cart__amount-input">
                    <input 
                        v-if="inputMode"
                        type="number"
                        inputmode="numeric"
                        @change="changeVal($event.target.value)" 
                        @keydown="inputVal" 
                        :value="amount"
                        :autofocus="autofocusFlag"
                    > 
                    <!-- временно отключаем меру подсчета -->
                    <p v-else @click="inputMode = true" class="add-to-cart__amount">{{amount}} {{ $tc('text.count') }}</p>
                </div>
                <div v-show="tooltipFlag" class="add-to-cart__tooltip" :class="{'add-to-cart__tooltip--active':tooltipFlag}">
                    {{ $tc('button.add_to_cart.tooltip.part1') }} {{maxAmount}} {{ $tc('button.add_to_cart.tooltip.part2') }}
                </div>
            </div>
            
			<div
				class="add-to-cart__button add-to-cart__button--increase"
				:disabled="increaseDisabled"
				@click="increase(false, $event.target)"
			>
                <svg viewBox="2 2 12 12">
                    <use :xlink:href="templatePath + 'images/sprite.svg#plus'"></use>
                </svg>
			</div>
        </div>
		<div v-else>
            <div 
                class="add-to-cart__add" 
                :class="{'add-to-cart__add--smaller': changeIcon && width < 760}"
                :disabled="disabled"
                @click="increase(true, $event.target)"
            >
                <svg v-if="changeIcon && width < 760 && !disabled">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__cart'"></use>
                </svg>
                <svg viewBox="-2 -1 12 12" v-else-if="amount > 0 && disabled">
                    <use :xlink:href="templatePath + 'images/sprite.svg#check'"></use>
                </svg>
              <template v-else>{{ $tc(buttonTitle) }}</template>  
            </div>
		</div>
    </div>
</template>

<script>
    import config from "../config";

    export default {
        name: "add-to-cart",
        props: {
            productId: {
                type: Number,
                required: true
            },
            maxAmount: {
                type: Number,
                required: false,
                default: 100
            },
            // принимаем значение из корзины, чтобы задизейблить минус при кол-ве товаров = 1
            isCart:{
                type:Boolean,
                required: false,
                default: false
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
                default: 'button.add_to_cart.short',
                required: false,
            },
            size: {
                type: String,
                default: '',
                required: false,
            },
            productOrderPosition: {
                type: Number,
                default: 0,
                required: false,
            },
        },
        data() {
            return {
                loading: false,
                disabled: false,
                amount: 0,
                width: 0,
                _debounce_timer: null,
                _loading_timer: null,
                tooltipFlag: false,
                inputMode: false,
                autofocusFlag: true
            };
        },
        computed: {
            storeAmount() {
                return this.$store.getters.basketProductQuantity(this.productId);
            },
            increaseDisabled() {
                return this.amount >= this.maxAmount;
            },
            decreaseDisabled() {
                return this.amount <= this.allowedDecreaseAmount;
            },
            allowedDecreaseAmount() {
                return this.isCart ? 1 : 0;
            },
        },
        watch: {
            storeAmount(newValue) {
                if(!this._debounce_timer) {
                    this.amount = newValue;
                }
            }
        },
        mounted() {
            this.amount = this.storeAmount;
        },
        created() {
            window.addEventListener('resize', this.updateWidth);
            this.updateWidth()
            window.addEventListener('scroll', this.mobileScroll);
            this.$eventBus.$on("current-amount", this.currentAmount)
        },
        methods: {
            currentAmount(){
                console.log(this.storeAmount);
                this.amount = this.storeAmount;
            },
            setAmount(amount) {
                if(amount >= this.maxAmount){
                    this.tooltipFlag = true
                    setTimeout(() => {
                        this.tooltipFlag = false
                    }, 5000);
                }
                let vm = this;

                // Включение лоадера при долгой загрузке
                if (vm._loading_timer) {
                    clearTimeout(vm._loading_timer);
                    vm._loading_timer = null;
                }
                vm._loading_timer = setTimeout(function () {
                    vm.loading = true;
                }, config.loading_timeout);


                vm.$store.dispatch('basketSendQuantity', {
                    productId: this.productId,
                    quantity: amount
                }).finally(() => {
                    vm.loading = false;

                    if (vm._loading_timer) {
                        clearTimeout(vm._loading_timer);
                        vm._loading_timer = null;
                    }
                    this.$store.dispatch('basketOrderCalc')
                });
            },
            startSetAmount() {
                let vm = this;
                if (vm._debounce_timer) {
                    clearTimeout(vm._debounce_timer);
                    vm._debounce_timer = null;
                }
                this._debounce_timer = setTimeout(function () {
                    vm.setAmount(vm.amount);
                }, config.debounce_timeout);
            },
            decrease() {
                if (this.amount > this.allowedDecreaseAmount) {
                    this.amount--;
                    this.startSetAmount();
                }
            },
            updateWidth() {
                if(window.innerWidth < 768){
                    this.inputMode = true
                    this.autofocusFlag = false
                }
                this.width = window.innerWidth;
            },
            increase(clickFlag, event) {
                let button = event
                if(clickFlag){
                    this.$emit('cloneCard', button)
                }
                if (this.amount < this.maxAmount) {
                    this.amount++;
                    if(this.changeIcon && this.width < 760) {
                        this.disabled = true
                    }
                    this.startSetAmount();
                }
            },
            inputVal(e){
                if(e.key >= 0 || e.key <= 9 || e.key == 'Backspace'  || e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'ArrowUp' || e.key == 'ArrowDown'){
                    
                }else if( e.key == 'Enter'){
                    if(window.innerWidth > 768){
                        this.inputMode = false
                    }
                }else{
                    e.preventDefault()
                }
            },
            changeVal(e){
                this.amount = Number(e)
                if (this.amount <= this.maxAmount && this.amount >= this.allowedDecreaseAmount){
                    this.amount = Number(e)
                }else{
                    if (this.amount >= this.maxAmount){
                        this.amount = this.maxAmount
                    }
                    if (this.amount <= this.allowedDecreaseAmount){
                        this.amount = this.allowedDecreaseAmount
                    }
                }
                // if(window.innerWidth > 768){
                //     this.inputMode = false
                // }
                this.startSetAmount()
            },
        }
    }
</script>