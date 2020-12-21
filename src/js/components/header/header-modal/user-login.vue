<template>
    <form class="user-login__form"
        @submit.prevent="submit">
        <label name="email" class="user__label">
            <input
                class="user__input"
                :class="{'user__input_error': $v.email.$error}"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                autocorrect="off"
                autocapitalize="off"
                v-model.trim="$v.email.$model">
            <span class="user__label-text"
                :class="{'user__label-text_up': $v.email.required}"
            >Email</span>
            <svg viewBox="0 0 24 24"
                class="user__label-icon"
                v-if="$v.email.required"
                @click="$v.email.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <div class="user__error-text user__error-text_invalid"
                v-if="$v.email.$error">
                Ошибка при вводе данных
            </div>
        </label>
        <label name="password" class="user__label">
            <input
                class="user__input"
                :class="{'user__input_dots': $v.password.$model && !passwordHidden,
                'user__input_error': $v.password.$error}"
                :type="passwordType"
                name="password"
                id="password"
                v-model.trim="$v.password.$model">
            <span class="user__label-text"
                :class="{'user__label-text_up': $v.password.required}"
            >Пароль</span>
            <show-password v-model="passwordHidden"></show-password>
            <div class="user__error-text user__error-text_invalid_password"
                v-if="$v.password.$error">
                Ошибка при вводе данных
            </div>
        </label>
        <div class="user__error-text" v-if="$v.$error">*Обязательное поле для заполнения</div>
        <input type="submit" class="user__button" value="Войти">
    </form>
</template>

<script>
    import {required, email, helpers} from "vuelidate/lib/validators"
    import showPassword from '../../partials/show-password.vue'
    
    import config from "../../../config";

    const pattern = helpers.regex('pattern', config.passwordPattern)

    export default {
        name:'user-login',
        components: {
            showPassword
        },
        props: {
        },
        validations: {
            email: {
                required,
                email
            },
            password: {
                required,
                pattern
            }
        },
        data() {
            return {
                email: '',
                password: '',
                passwordHidden: false
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.enter();
                }
            },
            enter() {
                this.email = this.$v.email.$model;
                this.password = this.$v.password.$model
            }
        },
        computed: {
            passwordType() {
                return this.passwordHidden ? 'text' : 'password'
            }
        }
    }
</script>