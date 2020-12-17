<template>
    <form class="profile-modal__form profile-modal__form_column"
        @submit.prevent="saveChanges">
        <label name="reason" class="profile-modal__radio">
            <input
                type="radio"
                name="reason"
                value="1">
            <span class="profile-modal__check"></span>
            <span class="profile-modal__radio-label">Причина № 1</span>
        </label>
        <label name="reason" class="profile-modal__radio">
            <input
                type="radio"
                name="reason"
                value="2">
            <span class="profile-modal__check"></span>
            <span class="profile-modal__radio-label">Причина № 2</span>
        </label>
        <label name="reason" class="profile-modal__radio">
            <input
                type="radio"
                name="reason"
                value="3">
            <span class="profile-modal__check"></span>
            <span class="profile-modal__radio-label">Причина № 3</span>
        </label>
        <label name="reason" class="profile-modal__radio profile-modal__radio_column">
            <span class="profile-modal__radio-input">
                <input
                    type="radio"
                    name="reason"
                    value="">
                <span class="profile-modal__check"></span>
                <span class="profile-modal__radio-label">Другая причина</span>
            </span>
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': message}"
            >Сообщение</span>
            <textarea
                class="profile-modal__textarea"
                :class="{'profile-modal__textarea_error': invalid}"
                name="reason"
                placeholder="Сообщение"
                v-model.trim="message"
            ></textarea>
            <span class="profile-modal__error-text" v-if="invalid">*Обязательное поле для заполнения</span>
        </label>
        <input type="submit" class="profile-modal__button" value="Удалить профиль">
    </form>
</template>

<script>
export default {
    name:"delete-profile",
    props:{
    },
    data() {
        return {
            invalid: false,
            message: ''
        }
    },
    methods: {
        saveChanges() {
            
        }
    },
}
</script>