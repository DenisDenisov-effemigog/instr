<template>
    <form class="profile-modal__form">
        <label name="password" class="profile-modal__label">
            <span class="profile-modal__label-text" v-if="password">
                Текущий пароль
            </span>
            <input
                class="profile-modal__input"
                type="password"
                name="password"
                id="password"
                placeholder="Текущий пароль"
                v-model="password">
            <svg viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__eye'"></use>
            </svg>
        </label>
        <label name="newPassword" class="profile-modal__label">
            <span class="profile-modal__label-text" v-if="newPassword">
                Новый пароль
            </span>
            <input
                class="profile-modal__input"
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Новый пароль"
                v-model="newPassword">
            <svg viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__eye'"></use>
            </svg>
        </label>
        <div class="profile-modal__text">Пароль должен быть длиной от 6 символов и содержать как минимум одну цифру и одну заглавную букву</div>
        <input type="submit" class="profile-modal__button" value="Сохранить">
    </form>
</template>

<script>
export default {
    name:"change-password",
    props:{
    },
    data() {
        return {
            password: '',
            newPassword: ''
        }
    },
    methods: {
    },
}
</script>