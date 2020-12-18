<template>
    <form class="profile-modal__form"
        @submit.prevent="saveChanges">
        <label name="name" class="profile-modal__label">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': person.contact}"
            >Контактное лицо</span>
            <input
                class="profile-modal__input"
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                autocorrect="off"
                placeholder="Контактное лицо"
                v-model.trim="person.contact">
            <svg viewBox="0 0 24 24" v-if="person.contact" @click="person.contact = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="company" class="profile-modal__label">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': person.company}"
            >Компания</span>
            <input
                class="profile-modal__input"
                type="text"
                name="company"
                id="company"
                autocomplete="organization"
                autocorrect="off"
                placeholder="Компания"
                v-model.trim="person.company">
            <svg viewBox="0 0 24 24" v-if="person.company" @click="person.company = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="code" class="profile-modal__label">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': person.code}"
            >Код доступа</span>
            <input
                class="profile-modal__input"
                type="text"
                name="code"
                id="code"
                placeholder="Код доступа"
                v-model.trim="person.code">
            <svg viewBox="0 0 24 24" v-if="person.code" @click="person.code = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="phone" class="profile-modal__label">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': person.phone}"
            >Номер телефона</span>
            <input
                class="profile-modal__input"
                type="tel"
                name="phone"
                id="phone"
                autocomplete="tel"
                autocorrect="off"
                placeholder="Номер телефона"
                v-model.trim="person.phone">
            <svg viewBox="0 0 24 24" v-if="person.phone" @click="person.phone = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="email" class="profile-modal__label">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': person.email}"
            >Email</span>
            <input
                class="profile-modal__input"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                autocorrect="off"
                autocapitalize="off"
                placeholder="Email"
                v-model.trim="person.email">
            <svg viewBox="0 0 24 24" v-if="person.email" @click="person.email = ''">
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
        person: {required: true}
    },
    data() {
        return {
        }
    },
    computed: {
        
    },
    methods: {
        closeOutside(event) {
            if(event.toElement.className !== '') {
                this.closeModal() 
            }
        },
        saveChanges() {
            if (this.person.contact && this.person.company && this.person.code && this.person.phone && this.person.email) {
                console.log('save changes')
            }
        }
    },
}
</script>