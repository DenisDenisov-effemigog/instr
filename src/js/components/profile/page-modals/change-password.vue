<template>
    <form class="profile-modal__form"
        @submit.prevent="submit">
        <label name="password" class="profile-modal__label profile-modal__label_column">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_dots': $v.password.$model && !passwordHidden,
                'profile-modal__input_error': $v.password.$error }"
                :type="passwordType"
                name="password"
                id="password"
                v-model.trim="$v.password.$model">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': $v.password.required}">
                Текущий пароль
            </span>
            <show-password v-model="passwordHidden"></show-password>
            <span
                class="profile-modal__error-text profile-modal__error-text_input-error"
                v-if="$v.password.$error"
            >Ошибка при вводе данных</span>
        </label>
        <label name="newPassword" class="profile-modal__label profile-modal__label_column">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_dots': $v.newPassword.required && !newPasswordHidden,
                'profile-modal__input_error': $v.newPassword.$error }"
                :type="newPasswordType"
                name="newPassword"
                id="newPassword"
                v-model.trim="$v.newPassword.$model">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': $v.newPassword.required}">
                Новый пароль
            </span>
            <show-password v-model="newPasswordHidden"></show-password>
            <span
                class="profile-modal__error-text profile-modal__error-text_input-error"
                v-if="$v.newPassword.$error"
            >Ошибка при вводе данных</span>
        </label>
        <div class="profile-modal__text">Пароль должен быть длиной от 6 символов и содержать как минимум одну цифру и одну заглавную букву</div>
        <input type="submit" class="profile-modal__button" value="Сохранить">
    </form>
</template>

<script>
    import {required, helpers} from "vuelidate/lib/validators";
    import showPassword from '../../partials/show-password.vue';
    
    import config from "../../../config";

    const pattern = helpers.regex('pattern', config.passwordPattern)

    export default {
        name:"change-password",
        components: {
            showPassword
        },
        validations: {
            password: {
                required,
                pattern
            },
            newPassword: {
                required,
                pattern
            },
        },
        data() {
            return {
                password: '',
                newPassword: '',
                passwordHidden: false,
                newPasswordHidden: false
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
                this.password = this.$v.password.$model
                this.newPassword = this.$v.newPassword.$model
            }
        },
        computed: {
            passwordType() {
                return this.passwordHidden ? 'text' : 'password'
            },
            newPasswordType() {
                return this.newPasswordHidden ? 'text' : 'password'
            }
        }
    }
</script>