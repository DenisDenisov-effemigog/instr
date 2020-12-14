<template>
    <form class="profile-modal__form">
        <label name="name" class="profile-modal__label">
            <span class="profile-modal__label-text">Контактное лицо</span>
            <input
                class="profile-modal__input"
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                autocorrect="off"
                placeholder="Контактное лицо">
            <svg viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="company" class="profile-modal__label">
            <span class="profile-modal__label-text">Компания</span>
            <input
                class="profile-modal__input"
                type="text"
                name="company"
                id="company"
                autocomplete="organization"
                autocorrect="off"
                placeholder="Компания">
            <svg viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="code" class="profile-modal__label">
            <span class="profile-modal__label-text">Код доступа</span>
            <input
                class="profile-modal__input"
                type="text"
                name="code"
                id="code"
                placeholder="Код доступа">
            <svg viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="tel" class="profile-modal__label">
            <span class="profile-modal__label-text">Номер телефона</span>
            <input
                class="profile-modal__input"
                type="tel"
                name="tel"
                id="tel"
                autocomplete="tel"
                autocorrect="off"
                placeholder="Номер телефона">
            <svg viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="email" class="profile-modal__label">
            <span class="profile-modal__label-text">Email</span>
            <input
                class="profile-modal__input"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                autocorrect="off"
                autocapitalize="off"
                placeholder="Email">
            <svg viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <input type="submit" class="profile-modal__button" value="Сохранить">
    </form>
</template>

<script>
export default {
    name:"edit-profile",
    props:{
    },
    methods: {
        closeOutside(event) {
            if(event.toElement.className !== '') {
                this.closeModal() 
            }
        }
    },
}
</script>