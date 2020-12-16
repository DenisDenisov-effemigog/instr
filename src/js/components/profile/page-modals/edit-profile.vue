<template>
    <form class="profile-modal__form">
        <label name="name" class="profile-modal__label">
            <span class="profile-modal__label-text" v-if="name">Контактное лицо</span>
            <input
                class="profile-modal__input"
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                autocorrect="off"
                placeholder="Контактное лицо"
                v-model="name">
            <svg viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="company" class="profile-modal__label">
            <span class="profile-modal__label-text" v-if="company">Компания</span>
            <input
                class="profile-modal__input"
                type="text"
                name="company"
                id="company"
                autocomplete="organization"
                autocorrect="off"
                placeholder="Компания"
                v-model="company">
            <svg viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="code" class="profile-modal__label">
            <span class="profile-modal__label-text" v-if="code">Код доступа</span>
            <input
                class="profile-modal__input"
                type="text"
                name="code"
                id="code"
                placeholder="Код доступа"
                v-model="code">
            <svg viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="tel" class="profile-modal__label">
            <span class="profile-modal__label-text" v-if="phone">Номер телефона</span>
            <input
                class="profile-modal__input"
                type="tel"
                name="tel"
                id="tel"
                autocomplete="tel"
                autocorrect="off"
                placeholder="Номер телефона"
                v-model="phone">
            <svg viewBox="0 0 24 24">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="email" class="profile-modal__label">
            <span class="profile-modal__label-text" v-if="email">Email</span>
            <input
                class="profile-modal__input"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                autocorrect="off"
                autocapitalize="off"
                placeholder="Email"
                v-model="email">
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
    data() {
        return {
            name: '',
            company: '',
            code: '',
            phone: '',
            email: ''
        }
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