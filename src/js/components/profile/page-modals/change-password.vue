<template>
    <form class="profile-modal__form"
        @submit.prevent="saveChanges">
        <label name="password" class="profile-modal__label">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': password}"
            >
                Текущий пароль
            </span>
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_dots': password && !passwordHidden}"
                :type="passwordType"
                name="password"
                id="password"
                placeholder="Текущий пароль"
                v-model.trim="password">
            <show-password v-model="passwordHidden"></show-password>
        </label>
        <label name="newPassword" class="profile-modal__label">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': newPassword}"
            >
                Новый пароль
            </span>
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_dots': newPassword && !newPasswordHidden}"
                :type="newPasswordType"
                name="newPassword"
                id="newPassword"
                placeholder="Новый пароль"
                v-model.trim="newPassword">
            <show-password v-model="newPasswordHidden"></show-password>
        </label>
        <div class="profile-modal__text">Пароль должен быть длиной от 6 символов и содержать как минимум одну цифру и одну заглавную букву</div>
        <input type="submit" class="profile-modal__button" value="Сохранить">
    </form>
</template>

<script>
    import showPassword from './elements/show-password.vue'

    export default {
        name:"change-password",
        components: {
            showPassword
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
            saveChanges() {
                if (this.password && this.newPassword) {

                }
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