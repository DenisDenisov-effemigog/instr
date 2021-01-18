<template>
    <div class="cart-search">
        <div class="cart-search__head">
            <div class="cart-search__title">Добавить товар по артикулу</div>
            <div class="cart-search__icon" 
                @mouseenter="openTooltip = true"
                @mouseleave="openTooltip = false"
                >
                <svg @click=" openTooltip = true ">
                    <use xlink:href="/images/sprite.svg#icons__info"></use>
                </svg>
                <div class="cart-search__tooltip" :class="{'cart-search__tooltip--open':openTooltip}">
                    <p>Введите артикул товара каждый с новой строки. На строке должен находиться только артикул и количество товара. Максимум 100 строк.</p>
                    <div @click=" openTooltip = false ">
                        <svg viewBox="0 0 12 12">
                            <use xlink:href="/images/sprite.svg#close"></use>
                        </svg> 
                    </div>               
                </div>
            </div>
        </div>
        <form action="" class="cart-search__form">
            <label for="" class="cart-search__label">
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
                <span class="profile-modal__error-text" v-if="$v.$error">*Обязательное поле для заполнения</span>
            </label>
            <button type="button" class="cart-search__btn" @click="submit">Добавить</button>
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
            valArr:[],
            newVal:''
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
            if(this.newVal.length < 5){
                let isDigit = false
                if(e.key >= 0 || e.key <= 9 || e.key == 'Backspace'  || e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'ArrowUp' || e.key == 'ArrowDown'){
                    isDigit = true
                }else if(e.key == 'Enter'){
                    this.value = this.$v.value.$model;
                    this.newVal = this.value.split('\n')
                }
                else{
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
                console.log(newVal)
            }
    },
    computed:{

    }
}
</script>