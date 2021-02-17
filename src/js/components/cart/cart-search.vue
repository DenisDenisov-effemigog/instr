<template>
    <div class="cart-search">
        <div class="cart-search__head">
            <div class="cart-search__title">{{ $tc('cart.search.title') }}</div>
            <div class="cart-search__icon" 
                @mouseenter="openTooltip = true"
                @mouseleave="openTooltip = false"
                >
                <svg @click=" openTooltip = true ">
                    <use xlink:href="/images/sprite.svg#icons__info"></use>
                </svg>
                <div class="cart-search__tooltip" :class="{'cart-search__tooltip--open':openTooltip}">
                    <p>{{ $tc('cart.search.placeholder') }}</p>
                    <div @click=" openTooltip = false ">
                        <svg viewBox="0 0 12 12">
                            <use xlink:href="/images/sprite.svg#close"></use>
                        </svg> 
                    </div>               
                </div>
            </div>
        </div>
        <form action="" class="cart-search__form">
            <label class="cart-search__label">
                <div class="cart-search__textarea-wrapper">
                    <textarea-autosize type="text" class="cart-search__textarea"
                        :min-height="30"
                        ref="myTextarea"
                        :max-height="280"
                        @keydown.native="textareaChange"
                        v-model.trim="value"
                        placeholder="Укажите артикул и количество товара в виде: 12334443 54"
                    ></textarea-autosize>
                </div>
                <span class="form__error-text" v-if="$v.$error">*{{ $tc('text.required') }}</span>
            </label>
            <button type="button" class="cart-search__btn" @click="submit">{{ $tc('cart.search.button') }}</button>
        </form>
    </div>
</template>

<script>
    import {required, minLength} from "vuelidate/lib/validators"

export default {
    name: "cart-search",
    data(){
        return{
            openTooltip: false,
            value: '',
            newVal:[]
        }
    },
    validations: {
        value: {
            required,
            minLength: minLength(5)
        },
    },
    computed:{

    },
    methods:{
        textareaChange(e){
            if(this.newVal.length < 50){
                let isDigit = false
                if(e.key >= 0 || e.key <= 9 || e.key == 'Backspace'  || e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'ArrowUp' || e.key == 'ArrowDown' || e.ctrlKey && e.key == 'c' || e.ctrlKey && e.key == 'v'){
                    isDigit = true
                }else if(e.key == 'Enter'){
                    let newArr = []
                    let valueArr = this.value.split('\n')
                    for(let i = 0; i < valueArr.length; i++){
                        newArr.push({sku:valueArr[i].split(' ')[0], quantity:valueArr[i].split(' ')[1]})
                        this.newVal = newArr
                    }
                }else{
                    e.preventDefault();
                }
            }else{
                e.preventDefault();
            }
            
            
        },
        submit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.saveChanges();
            }
        },
        saveChanges() {
            this.value = this.$v.value.$model;
            let newVal = this.value.split('\n')
            let arr = []
            for (let i = 0; i < newVal.length; i++){
                if(newVal[i].split(' ').length > 2) {
                    arr.push(newVal[i].split(' ').splice(1))
                } else {
                    arr.push(newVal[i].split(' '))
                }
            }
            
            this.$store.dispatch('searchItem', arr);
        }
    },
}
</script>