<template>
    <div class="checkout-reg">
        <div class="checkout-reg__content">
            <form class="checkout-reg__form">
                <label for="name" class="checkout-reg__label">
                    <input
                        class="checkout-reg__input"
                        :class="{'checkout-reg__input--error': $v.name.$error}"
                        type="text"
                        name="name"
                        id="name"
                        autocomplete="name"
                        autocorrect="off"
                        @focusout="buildPersonData"
                        v-model.trim="$v.name.$model">
                    <span v-if="!IndividualFlag" class="checkout-reg__label-text"
                        :class="{'checkout-reg__label-text--up': $v.name.required}"
                    >{{ $tc('title.person') }}</span>
                    <span v-else class="checkout-reg__label-text"
                        :class="{'checkout-reg__label-text--up': $v.name.required}"
                    >{{ $tc('title.person_name') }}</span>
                    <svg viewBox="0 0 24 24"
                        class="checkout-reg__label-icon"
                        v-if="$v.name.required"
                        @click="$v.name.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="checkout-reg__error-text checkout-reg__error-text--invalid"
                        v-if="$v.name.$error">{{ $tc('text.error') }}</div>
                </label>
                <label v-show="!IndividualFlag" class="checkout-reg__label">
                    <the-mask
                        class="checkout-reg__input"
                        :class="{'checkout-reg__input--error': $v.code.$error}"
                        type="text"
                        :mask="codeMask"
                        name="code"
                        :tokens="codeTokens"
                        :masked="true"
                        @focusout="buildPersonData"
                        v-model.trim="$v.code.$model"
                    />
                    <span class="checkout-reg__label-text"
                        :class="{'checkout-reg__label-text--up': $v.code.required}"
                    >{{ $tc('title.vat') }}</span>
                    <svg viewBox="0 0 24 24"
                        class="checkout-reg__label-icon"
                        v-if="$v.code.required"
                        @click="$v.code.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="checkout-reg__error-text checkout-reg__error-text--invalid"
                        v-if="$v.code.$error">{{ $tc('text.error') }}</div>
                </label>
                <label v-show="!IndividualFlag" for="company" class="checkout-reg__label">
                    <input
                        class="checkout-reg__input"
                        :class="{'checkout-reg__input--error': $v.company.$error}"
                        type="text"
                        name="company"
                        id="company"
                        autocomplete="organization"
                        autocorrect="off"
                        @focusout="buildPersonData"
                        v-model.trim="$v.company.$model"
                    >
                    <span class="checkout-reg__label-text"
                        :class="{'checkout-reg__label-text--up': $v.company.required}"
                    >{{ $tc('title.company') }}</span>
                    <svg viewBox="0 0 24 24"
                        class="checkout-reg__label-icon"
                        v-if="$v.company.required"
                        @click="$v.company.$model = ''" 
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="checkout-reg__error-text checkout-reg__error-text--invalid"
                        v-if="$v.company.$error">{{ $tc('text.error') }}</div>
                </label>
                <label for="phone" class="checkout-reg__label">
                    <the-mask
                        class="checkout-reg__input"
                        :class="{'checkout-reg__input--error': $v.phone.$error}"
                        type="tel"
                        :mask="phoneMask"
                        :tokens="phoneTokens"
                        :masked="true"
                        name="phone"
                        id="phone"
                        autocomplete="tel"
                        autocorrect="off"
                        @focusout="buildPersonData"
                        v-model.trim="$v.phone.$model"
                    />
                    <span class="checkout-reg__label-text"
                        :class="{'checkout-reg__label-text--up': $v.phone.required}"
                    >{{ $tc('title.phone_number') }}</span>
                    <svg viewBox="0 0 24 24"
                        class="checkout-reg__label-icon"
                        v-if="$v.phone.required"
                        @click="$v.phone.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="checkout-reg__error-text checkout-reg__error-text--invalid"
                        v-if="$v.phone.$error">{{ $tc('text.error') }}</div>
                </label>
                <label for="email-checkout" class="checkout-reg__label">
                    <input
                        class="checkout-reg__input"
                        :class="{'checkout-reg__input--error': $v.newEmail.$error}"
                        type="text"
                        name="email"
                        id="email-checkout"
                        autocomplete="email"
                        autocorrect="off"
                        autocapitalize="off"
                        @focusout="buildPersonData"
                        v-model.trim="$v.newEmail.$model"
                    >
                    <span class="checkout-reg__label-text"
                        :class="{'checkout-reg__label-text--up': $v.newEmail.required}"
                    >{{ $tc('title.email') }}</span>
                    <svg viewBox="0 0 24 24"
                        class="checkout-reg__label-icon"
                        v-if="$v.newEmail.required"
                        @click="$v.newEmail.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="checkout-reg__error-text checkout-reg__error-text--invalid"
                        v-if="$v.newEmail.$error && !emailReg">{{ $tc('text.error') }}</div>
                    <div class="checkout-reg__error-text checkout-reg__error-text--invalid"
                        v-if="emailReg">{{ $tc('text.error_reg') }}</div>
                </label>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, email, helpers} from "vuelidate/lib/validators";
    import {TheMask} from 'vue-the-mask'

    import config from "../../config";

    export default {    
        name:'checkout-reg',
        components: {
            TheMask
        },
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
            phoneMask:{
                type: String,
                required: true,
            },
            codeMask:{
                type: String,
                required: true,
            },
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
                code: null,
                phone: null,
                newEmail: '',
                phoneTokens: config.phoneTokens,
                codeTokens: config.codeTokens,
                emailReg: false
            }
        },
        created() {
            this.$eventBus.$on('register-error', this.registerError)
        },
        methods:{
            buildPersonData(){
                let mailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(!mailReg.test(this.newEmail) && !this.newEmail == ''){
                    this.emailReg = true
                }else{
                    this.emailReg = false
                    this.$eventBus.$emit('push-personal-data', this.name, this.company, this.code, this.phone, this.newEmail,)
                }
                
            },
            registerError() {
                let vm = this
                vm.$v.$touch();
                if (window.innerWidth > 767) {
                    this.scrollTop('.checkout__content', 150);
                } else {
                    this.scrollTop('.checkout__content', 70);
                }
            }
        }
    }
</script>