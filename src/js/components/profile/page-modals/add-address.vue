<template>
    <form class="profile-modal__form">
        <label name="address" class="profile-modal__label">
            <span class="profile-modal__label-text">Адрес</span>
            <input
                class="profile-modal__input"
                type="text"
                name="address"
                id="address"
                autocomplete="name"
                autocorrect="off"
                placeholder="Адрес">
        </label>
        <label name="message" class="profile-modal__label profile-modal__label_column">
            <span class="profile-modal__label-text">Сообщение</span>
            <textarea
                class="profile-modal__textarea"
                name="message"
                id="message"
                placeholder="Сообщение"
            ></textarea>
            <span class="profile-modal__error-text">*Обязательное поле для заполнения</span>
        </label>
        <input type="submit" class="profile-modal__button" value="Отправить запрос">
    </form>
</template>

<script>
export default {
    name:"add-address",
    props:{
    },
    methods: {
    },
}
</script>