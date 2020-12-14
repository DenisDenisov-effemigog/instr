<template>
    <form class="profile-modal__form">
        <label name="password" class="profile-modal__label">
            <span class="profile-modal__label-text profile-modal__radio-label">
                Текущий пароль
            </span>
            <input
                class="profile-modal__input"
                type="password"
                name="password"
                id="password"
                placeholder="Текущий пароль">
            <svg viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__eye'"></use>
            </svg>
        </label>
        <label name="newPassword" class="profile-modal__label">
            <span class="profile-modal__label-text profile-modal__radio-label">
                Новый пароль
            </span>
            <input
                class="profile-modal__input"
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Новый пароль">
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
    methods: {
    },
}
</script>