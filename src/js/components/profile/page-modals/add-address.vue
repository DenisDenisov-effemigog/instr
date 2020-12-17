<template>
    <form class="profile-modal__form"
        @submit.prevent="saveChanges">
        <label name="address" class="profile-modal__label">
            <span class="profile-modal__label-text" v-if="address">Адрес</span>
            <input
                class="profile-modal__input"
                type="text"
                name="address"
                id="address"
                autocomplete="name"
                autocorrect="off"
                placeholder="Адрес"
                v-model.trim="address">
        </label>
        <label name="message" class="profile-modal__label profile-modal__label_column">
            <span class="profile-modal__label-text" v-if="message">Сообщение</span>
            <textarea
                class="profile-modal__textarea"
                :class="{'profile-modal__textarea_error': invalid}"
                name="message"
                id="message"
                placeholder="Сообщение"
                v-model.trim="message"
            ></textarea>
            <span class="profile-modal__error-text" v-if="invalid">*Обязательное поле для заполнения</span>
        </label>
        <input type="submit" class="profile-modal__button" value="Отправить запрос">
    </form>
</template>

<script>
export default {
    name:"add-address",
    props:{
    },
    data() {
        return {
            address: '',
            message: '',
            invalid: false
        }
    },
    methods: {
        saveChanges
    },
}
</script>