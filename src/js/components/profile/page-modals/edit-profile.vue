<template>
    <form class="profile-modal__form"
          @submit.prevent="submit">
        <label for="name" class="profile-modal__label profile-modal__label--column">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input--error': $v.name.$error}"
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                autocorrect="off"
                v-model.trim="$v.name.$model">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text--up': $v.name.required}"
            >{{ $tc('title.person') }}</span>
            <svg
                viewBox="0 0 24 24"
                class="profile-modal__label-icon"
                v-if="$v.name.required"
                @click="$v.name.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <span
                class="profile-modal__error-text profile-modal__error-text--invalid-email"
                v-if="$v.name.$error"
            >{{ $tc('text.error') }}</span>   
        </label>
        <label for="company" class="profile-modal__label" v-if="person.company">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input--error': $v.company.$error}"
                type="text"
                name="company"
                id="company"
                autocomplete="organization"
                autocorrect="off"
                v-model.trim="$v.company.$model"
                readonly="readonly">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text--up': $v.company.required}"
            >{{ $tc('title.company') }}</span>
        </label>
        <label for="code" class="profile-modal__label" v-if="person.code">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input--error': $v.code.$error}"
                type="text"
                name="code"
                id="code"
                v-model.trim="$v.code.$model"
                readonly="readonly">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text--up': $v.code.required}"
            >{{ $tc('title.vat') }}</span>
        </label>
        <label for="phone" class="profile-modal__label profile-modal__label--column">
            <the-mask
                class="profile-modal__input"
                :class="{'profile-modal__input--error': $v.phone.$error}"
                type="tel"
                :mask="phoneMask"
                :tokens="tokens"
                :masked="true"
                name="phone"
                id="phone"
                autocomplete="tel"
                autocorrect="off"
                v-model.trim="$v.phone.$model"/>
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text--up': $v.phone.required}"
            >{{ $tc('title.phone_number') }}</span>
            <svg
                viewBox="0 0 24 24"
                class="profile-modal__label-icon"
                v-if="$v.phone.required"
                @click="$v.phone.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <span
                class="profile-modal__error-text profile-modal__error-text--invalid"
                v-if="$v.phone.$error"
            >{{ $tc('text.error') }}</span>
        </label>
        <label for="email" class="profile-modal__label profile-modal__label--column">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input--error': $v.email.$error}"
                type="text"
                name="email"
                id="email"
                autocomplete="email"
                autocorrect="off"
                autocapitalize="off"
                v-model.trim="$v.email.$model">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text--up': $v.email.required}"
            >{{ $tc('title.email') }}</span>
            <svg
                viewBox="0 0 24 24"
                class="profile-modal__label-icon"
                v-if="$v.email.required"
                @click="$v.email.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <span
                class="profile-modal__error-text profile-modal__error-text--invalid-email"
                v-if="$v.email.$error && !emailReg"
            >{{ $tc('text.error') }}</span>
            <span
                class="profile-modal__error-text profile-modal__error-text--invalid-email"
                v-if="emailReg"
            >{{ $tc('text.error_reg') }}</span>
        </label>
        <div class="profile-modal__error-text" v-if="$v.$error">*{{ $tc('text.required') }}</div>
        <input type="submit" class="profile-modal__button" :value="$tc('input.text.save')">
    </form>
</template>

<script>
    import {required, minLength, maxLength, email, numeric, alphaNum} from "vuelidate/lib/validators"
    import {TheMask} from 'vue-the-mask'
    import config from "../../../config";
    import * as Api from '../../../api/index'

    let api = Api.getInstance();

    export default {
        name:"edit-profile",
        props:{
            phoneMask:{
                type: String,
                required: true,
            },
            person: {required: true}
        },
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
                alphaNum
            },
            phone: {
                required,
            },
            email: {
                required,
                email
            }
        },
        data() {
            return {
                name: '',
                company: '',
                code: '',
                phone: null,
                email: '',
                tokens: config.phoneTokens,
                emailReg: false
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                let mailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(!mailReg.test(this.email) && !this.email == ''){
                    this.emailReg = true
                }else{
                    this.emailReg = false
                }
                if (!this.$v.$invalid && !this.emailReg) {
                    this.saveChanges();
                }
            },
            saveChanges() {
                let vm = this
                
                api.editProfile(vm.$v.name.$model, vm.$v.phone.$model, vm.$v.email.$model).then(answer => {
                    vm.$eventBus.$emit('closeModal')
                    vm.$eventBus.$emit('editProfile', answer)
                }).catch(errors => {
                    console.error(errors);
                })
            }
        },
        mounted() {
            this.name = this.person.contact
            this.company = this.person.company
            this.code = this.person.code
            this.phone = this.person.phone
            this.email = this.person.email
        }
    }
</script>