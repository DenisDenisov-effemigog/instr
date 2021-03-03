<template>
    <form class="profile-modal__form"
        @submit.prevent="submit">
        <!-- <label for="password" class="profile-modal__label profile-modal__label--column">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input--dots': $v.password.$model && !passwordHidden,
                'profile-modal__input_error': $v.password.$error }"
                :type="passwordType"
                name="password"
                id="password"
                v-model.trim="$v.password.$model">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text--up': $v.password.required}"
            >{{ $tc('change_pass.current') }}</span>
            <show-password v-model="passwordHidden"></show-password>
            <span
                class="profile-modal__error-text profile-modal__error-text_input-error"
                v-if="$v.password.$error"
            >{{ $tc('text.error') }}</span>
        </label> -->
        <label for="newPassword" class="profile-modal__label profile-modal__label--column">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input--dots': $v.newPassword.required && !newPasswordHidden,
                'profile-modal__input_error': $v.newPassword.$error }"
                :type="newPasswordType"
                name="newPassword"
                id="newPassword"
                v-model.trim="$v.newPassword.$model">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text--up': $v.newPassword.required}"
            >{{ $tc('change_pass.new') }}</span>
            <show-password v-model="newPasswordHidden"></show-password>
            <span
                class="profile-modal__error-text profile-modal__error-text_input-error"
                v-if="$v.newPassword.$error"
            >{{ $tc('text.error') }}</span>
        </label>
        <label for="confirmPassword" class="profile-modal__label profile-modal__label--column">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input--dots': $v.confirmPassword.required && !confirmPasswordHidden,
                'profile-modal__input_error': $v.confirmPassword.$error }"
                :type="confirmPasswordType"
                name="confirmPassword"
                id="confirmPassword"
                v-model.trim="$v.confirmPassword.$model">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text--up': $v.confirmPassword.required}"
            >{{ $tc('change_pass.confirm') }}</span>
            <show-password v-model="confirmPasswordHidden"></show-password>
            <span
                class="profile-modal__error-text profile-modal__error-text_input-error"
                v-if="$v.confirmPassword.$error"
            >{{ $tc('text.error') }}</span>
        </label>
        <div class="profile-modal__text">{{ $tc('change_pass.text') }}</div>
        <div class="profile-modal__error-text" v-if="!!notIdenticalText">{{ notIdenticalText }}</div>
        <input type="submit" class="profile-modal__button" :value="$tc('input.text.save')">
    </form>
</template>

<script>
    import {required, helpers} from "vuelidate/lib/validators";
    import showPassword from '../../partials/show-password.vue';
    
    import config from "../../../config";
    import * as Api from '../../../api/index'

    let api = Api.getInstance();

    const pattern = helpers.regex('pattern', config.passwordPattern)

    export default {
        name:"change-password",
        components: {
            showPassword
        },
        validations: {
            // password: {
            //     required,
            //     pattern
            // },
            newPassword: {
                required,
                pattern
            },
            confirmPassword: {
                required,
                pattern
            },
        },
        data() {
            return {
                password: '',
                newPassword: '',
                confirmPassword: '',
                passwordHidden: false,
                newPasswordHidden: false,
                confirmPasswordHidden: false,
                notIdenticalText: ''
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.saveChanges();
                }
            },
            saveChanges() {
                let vm = this
                api.changePassowrd(vm.$v.newPassword.$model, vm.$v.confirmPassword.$model).then(() => {
                // api.changePassowrd(vm.$v.password.$model, vm.$v.newPassword.$model).then(() => {
                    vm.$eventBus.$emit('closeModal');
                }).catch(error => {
                    console.log(error[0].message);
                    this.notIdenticalText = error[0].message
                })
            }
        },
        computed: {
            passwordType() {
                return this.passwordHidden ? 'text' : 'password'
            },
            newPasswordType() {
                return this.newPasswordHidden ? 'text' : 'password'
            },
            confirmPasswordType() {
                return this.confirmPasswordHidden ? 'text' : 'password'
            },
            identicalPassword() {
                if (this.$v.newPassword.$model === this.$v.confirmPassword.$model) this.notIdenticalText = ''
            }
        }
    }
</script>