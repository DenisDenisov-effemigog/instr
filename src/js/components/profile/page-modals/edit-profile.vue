<template>
    <form class="profile-modal__form"
        @submit.prevent="saveChanges">
        <label name="name" class="profile-modal__label">
            <span class="profile-modal__label-text" v-show="newName">Контактное лицо</span>
            <input
                class="profile-modal__input"
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                autocorrect="off"
                placeholder="Контактное лицо"
                v-model.trim="newName">
            <svg viewBox="0 0 24 24" v-if="newName" @click="newName = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="company" class="profile-modal__label">
            <span class="profile-modal__label-text" v-show="newCompany">Компания</span>
            <input
                class="profile-modal__input"
                type="text"
                name="company"
                id="company"
                autocomplete="organization"
                autocorrect="off"
                placeholder="Компания"
                v-model.trim="newCompany">
            <svg viewBox="0 0 24 24" v-if="newCompany" @click="newCompany = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="code" class="profile-modal__label">
            <span class="profile-modal__label-text" v-show="newCode">Код доступа</span>
            <input
                class="profile-modal__input"
                type="text"
                name="code"
                id="code"
                placeholder="Код доступа"
                v-model.trim="newCode">
            <svg viewBox="0 0 24 24" v-if="newCode" @click="newCode = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="phone" class="profile-modal__label">
            <span class="profile-modal__label-text" v-show="newPhone">Номер телефона</span>
            <input
                class="profile-modal__input"
                type="tel"
                name="phone"
                id="phone"
                autocomplete="tel"
                autocorrect="off"
                placeholder="Номер телефона"
                v-model.trim="newPhone">
            <svg viewBox="0 0 24 24" v-if="newPhone" @click="newPhone = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="email" class="profile-modal__label">
            <span class="profile-modal__label-text" v-show="newEmail">Email</span>
            <input
                class="profile-modal__input"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                autocorrect="off"
                autocapitalize="off"
                placeholder="Email"
                v-model.trim="newEmail">
            <svg viewBox="0 0 24 24" v-if="newEmail" @click="newEmail = ''">
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
            newName: '',
            newCompany: '',
            newCode: '',
            newPhone: '',
            newEmail: ''
        }
    },
    methods: {
        closeOutside(event) {
            if(event.toElement.className !== '') {
                this.closeModal() 
            }
        },
        saveChanges() {
            if (this.newName && this.newCompany && this.newCode && this.newPhone && this.newEmail) {
                console.log('save changes')
            }
        }
    },
}
</script>