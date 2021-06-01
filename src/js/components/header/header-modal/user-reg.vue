<template>
    <form class="user-reg__form"
        @submit.prevent="submit">
        <label class="user-reg__radio">
            <input
                type="radio"
                name="entity"
                value="legal"
                @click='individualFlag = false'
                checked>
            <span class="user-reg__check"></span>
            <span class="user-reg__radio-label">{{ $tc('title.person_corporate') }}</span>
        </label>
        <label class="user-reg__radio">
            <input
                type="radio"
                name="entity"
                value="individual"
                @click='individualFlag = true'>
            <span class="user-reg__check"></span>
            <span class="user-reg__radio-label">{{ $tc('title.person_individual') }}</span>
        </label>
        <label v-show="!individualFlag" class="user-reg__checkbox">
            <input
                class="user-reg__checkbox-input"
                type="checkbox"
                name="taxPayer"
                v-model="isVatPayer"
            >
            <span class="user-reg__checkbox-slider"></span>
            <span class="user-reg__checkbox-label">{{ $tc('user_reg.tax_payer') }}</span>
        </label>
        <label for="name" class="user__label">
            <input
                class="user__input"
                :class="{'user__input--error': $v.name.$error}"
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                autocorrect="off"
                v-model.trim="$v.name.$model"
            >
            <span v-if="!individualFlag" class="user__label-text"
                :class="{'user__label-text--up': $v.name.required}"
            >{{ $tc('title.person') }}</span>
            <span v-else class="user__label-text"
                :class="{'user__label-text--up': $v.name.required}"
            >{{ $tc('user_reg.name') }}</span>
            <svg viewBox="0 0 24 24"
                class="user__label-icon"
                v-if="$v.name.required"
                @click="$v.name.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <div class="user__error-text user__error-text--invalid"
                 v-if="$v.name.$error"
            >{{ $tc('text.error') }}</div>
        </label>
        <label v-show="!individualFlag" for="company" class="user__label">
            <input
                class="user__input"
                :class="{'user__input--error': $v.company.$error}"
                type="text"
                name="company"
                id="company"
                autocomplete="organization"
                autocorrect="off"
                v-model.trim="$v.company.$model">
            <span class="user__label-text"
                :class="{'user__label-text--up': $v.company.required}"
            >{{ $tc('title.company') }}</span>
            <svg viewBox="0 0 24 24"
                class="user__label-icon" 
                v-if="$v.company.required"
                @click="$v.company.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <div class="user__error-text user__error-text--invalid"
                v-if="$v.company.$error">{{ $tc('text.error') }}</div>
        </label>
        <label v-show="!individualFlag" for="VAT" class="user__label">
            <input
                class="user__input"
                :class="{'user__input--error': $v.vat.$error}"
                type="text"
                name="VAT"
                id="VAT"
                v-model.trim="$v.vat.$model">
            <span class="user__label-text"
                :class="{'user__label-text--up': $v.vat.required}"
            >{{ $tc('title.vat') }}</span>
            <svg viewBox="0 0 24 24"
                class="user__label-icon"
                v-if="$v.vat.required"
                @click="$v.vat.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <div class="user__error-text user__error-text--invalid"
                v-if="$v.company.$error">{{ $tc('text.error') }}</div>
        </label>
        <label for="phone" class="user__label">
            <the-mask
                class="user__input"
                :class="{'user__input--error': $v.phone.$error}"
                type="tel"
                :mask="phoneMask"
                :tokens="tokens"
                :masked="true"
                name="phone"
                id="phone"
                autocomplete="tel"
                autocorrect="off"
                v-model.trim="phone"/>
            <span class="user__label-text"
                :class="{'user__label-text--up': $v.phone.required}"
            >{{ $tc('title.phone_number') }}</span>
            <svg viewBox="0 0 24 24"
                class="user__label-icon"
                v-if="$v.phone.required"
                @click="$v.phone.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <div class="user__error-text user__error-text--invalid"
                v-if="$v.phone.$error">{{ $tc('text.error') }}</div>
        </label>
        <label for="email" class="user__label">
            <input
                class="user__input"
                :class="{'user__input--error': $v.newEmail.$error}"
                type="text"
                name="email"
                id="email"
                autocomplete="email"
                autocorrect="off"
                autocapitalize="off"
                v-model.trim="newEmail">
            <span class="user__label-text"
                :class="{'user__label-text--up': $v.newEmail.required}"
            >{{ $tc('title.email') }}</span>
            <svg viewBox="0 0 24 24"
                class="user__label-icon"
                v-if="$v.newEmail.required"
                @click="$v.newEmail.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <div class="user__error-text user__error-text--invalid"
                v-show="$v.newEmail.$error && !emailReg">{{ $tc('text.error') }}</div>
            <div ref="emailError" class="user__error-text user__error-text--invalid"
                v-show="emailReg">{{ $tc('text.error_reg') }}</div>
        </label>
        <div class="user__error-text" v-if="$v.error">*{{ $tc('text.required') }}</div>
        <label class="user__label user__label_row">
            <input
                class="user__checkbox"
                type="checkbox"
                name="agreement"
                v-model="agreement"
                @click="agreement = !agreement"
            >
            <span class="user__checkbox-label">
                <svg class="user__checkbox-svg" viewBox="0 0 10 8">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__checked'"></use>
                </svg>
            </span>
            <span class="user__checkbox-text">{{ $tc('user_reg.agreement') }}</span>
        </label>
        <input type="submit" class="user__button" value="Зарегистрироваться">
    </form>
</template>

<script>
    import {required, minLength, email, alphaNum} from "vuelidate/lib/validators"
    import {TheMask} from 'vue-the-mask'
    import * as Api from '../../../api/index'

    let api = Api.getInstance()
    
    import config from "../../../config"

    export default {
        name:'user-reg',
        components: {
            TheMask
        },
        props: {
            phoneMask:{
                type: String,
                required: true,
            },
        },
        validations: {
            name: {
                required
            },
            company: {
                required
            },
            vat: {
                required,
                alphaNum
            },
            phone: {
                required
            },
            newEmail: {
                required,
                email
            },
        },
        data() {
            return {
                individualFlag: false,
                isVatPayer: false,
                agreement: true,
                name: '',
                company: '',
                vat: '',
                phone: '',
                newEmail: '',
                tokens: config.phoneTokens,
                emailReg: false
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                let mailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(!mailReg.test(this.newEmail) && !this.newEmail == ''){
                    this.emailReg = true
                    this.$refs.emailError.innerHTML = $tc('text.error_reg')
                }else{
                    this.emailReg = false
                }
                if (this.individualFlag){
                    if (!this.$v.name.$invalid &&
                        !this.$v.newEmail.$invalid && 
                        !this.$v.phone.$invalid && 
                        this.agreement &&
                        !this.emailReg
                    ) {
                        this.register();
                    }
                } else {
                    if (!this.$v.name.$invalid &&
                        !this.$v.company.$invalid &&
                        !this.$v.vat.$invalid && 
                        !this.$v.newEmail.$invalid && 
                        !this.$v.phone.$invalid && 
                        this.agreement &&
                        !this.emailReg
                    ) {
                        this.register();
                    }
                }
            },

            register() {
                let vm = this;
                let type = ''
                if (!vm.individualFlag){
                    type = true
                } else {
                    type = false
                }
                api.authSignUp(type, vm.name, vm.company, vm.vat, vm.newEmail, vm.phone, vm.isVatPayer).then(() => {
                    vm.$eventBus.$emit('closeModal');
                    window.location.replace(config.links.personal_profile);
                }).catch((errors) => {
                    console.log(errors )
                    setTimeout(() => {
                        this.emailReg = true
                        this.$refs.emailError.innerHTML = errors[0].message
                    }, 100);
                    // this.emailReg = true
                    // console.log(this.$refs.emailError);
                    // this.$refs.emailError.innerHTML = errors.message
                });

            },
        }
    }
</script>