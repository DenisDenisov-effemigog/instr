<template><!--{{ $tc('') }}-->
    <div class="checkout-reg">
        <div class="checkout-reg__content">
            <form class="checkout-reg__form">
                <label for="name" class="checkout-reg__label">
                    <input
                        class="checkout-reg__input"
                        :class="{'checkout-reg__input_error': $v.name.$error}"
                        type="text"
                        name="name"
                        id="name"
                        autocomplete="name"
                        autocorrect="off"
                        v-model.trim="$v.name.$model">
                    <span v-if="!IndividualFlag" class="checkout-reg__label-text"
                        :class="{'checkout-reg__label-text_up': $v.name.required}"
                    >Контактное лицо</span>
                    <span v-else class="checkout-reg__label-text"
                        :class="{'checkout-reg__label-text_up': $v.name.required}"
                    >ФИО</span>
                    <svg viewBox="0 0 24 24"
                        class="checkout-reg__label-icon"
                        v-if="$v.name.required"
                        @click="$v.name.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="checkout-reg__error-text checkout-reg__error-text_invalid"
                        v-if="$v.name.$error">{{ $tc('text.error') }}</div>
                </label>
                <label v-show="!IndividualFlag" class="checkout-reg__label">
                    <input
                        class="checkout-reg__input"
                        :class="{'checkout-reg__input_error': $v.code.$error}"
                        type="text"
                        name="code"
                        v-model.trim="$v.code.$model">
                    <span class="checkout-reg__label-text"
                        :class="{'checkout-reg__label-text_up': $v.code.required}"
                    >ИНН</span>
                    <svg viewBox="0 0 24 24"
                        class="checkout-reg__label-icon"
                        v-if="$v.code.required"
                        @click="$v.code.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="checkout-reg__error-text checkout-reg__error-text_invalid"
                        v-if="$v.company.$error">{{ $tc('text.error') }}</div>
                </label>
                <label v-show="!IndividualFlag" name="company" class="checkout-reg__label">
                    <input
                        class="checkout-reg__input"
                        :class="{'checkout-reg__input_error': $v.company.$error}"
                        type="text"
                        name="company"
                        id="company"
                        autocomplete="organization"
                        autocorrect="off"
                        v-model.trim="$v.company.$model">
                    <span class="checkout-reg__label-text"
                        :class="{'checkout-reg__label-text_up': $v.company.required}"
                    >Компания</span>
                    <svg viewBox="0 0 24 24"
                        class="checkout-reg__label-icon"
                        v-if="$v.company.required"
                        @click="$v.company.$model = ''" 
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="checkout-reg__error-text checkout-reg__error-text_invalid"
                        v-if="$v.company.$error">{{ $tc('text.error') }}</div>
                </label>
                <label name="phone" class="checkout-reg__label">
                    <input
                        class="checkout-reg__input"
                        :class="{'checkout-reg__input_error': $v.phone.$error}"
                        type="tel"
                        :mask="phoneMask"
                        :tokens="tokens"
                        name="phone"
                        id="phone"
                        autocomplete="tel"
                        autocorrect="off"
                        v-model.trim="$v.phone.$model">
                    <span class="checkout-reg__label-text"
                        :class="{'checkout-reg__label-text_up': $v.phone.required}"
                    >Номер телефона</span>
                    <svg viewBox="0 0 24 24"
                        class="checkout-reg__label-icon"
                        v-if="$v.phone.required"
                        @click="$v.phone.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="checkout-reg__error-text checkout-reg__error-text_invalid"
                        v-if="$v.phone.$error">{{ $tc('text.error') }}</div>
                </label>
                <label name="email" class="checkout-reg__label">
                    <input
                        class="checkout-reg__input"
                        :class="{'checkout-reg__input_error': $v.newEmail.$error}"
                        type="email"
                        name="email"
                        id="email"
                        autocomplete="email"
                        autocorrect="off"
                        autocapitalize="off"
                        v-model.trim="$v.newEmail.$model">
                    <span class="checkout-reg__label-text"
                        :class="{'checkout-reg__label-text_up': $v.newEmail.required}"
                    >Email</span>
                    <svg viewBox="0 0 24 24"
                        class="checkout-reg__label-icon"
                        v-if="$v.newEmail.required"
                        @click="$v.newEmail.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="checkout-reg__error-text checkout-reg__error-text_invalid"
                        v-if="$v.newEmail.$error">{{ $tc('text.error') }}</div>
                </label>
                <!-- <div class="checkout-reg__error-text" v-if="$v.error">*Обязательное поле для заполнения</div> -->
            </form>
        </div>
    </div>
</template>

<script>

    import {required, email, helpers} from "vuelidate/lib/validators";

    export default {    
        name:'checkout-reg',
        validations: {
            name: {
                required
            },
            company: {
                required
            },
            code: {
                required,
            },
            phone: {
                required
            },
            newEmail: {
                required,
                email
            }
        },
        props:{
            currentTab:{
                type:String,
                required: true
            },
            IndividualFlag:{
                type:Boolean,
                required: true
            }
        },
        data(){
            return{
                name: '',
                company: '',
                code: '',
                phone: '',
                newEmail: '',
            }
        },
        methods:{
            
        }
        
    }
</script>