<template>
    <form class="profile-modal__form"
        @submit.prevent="submit">
        <label name="address" class="profile-modal__label">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': $v.address.required}"
            >Адрес</span>
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_error': $v.address.$error}"
                type="text"
                name="address"
                id="address"
                autocomplete="name"
                autocorrect="off"
                placeholder="Адрес"
                v-model.trim="address">
        </label>
        <label name="message" class="profile-modal__label profile-modal__label_column">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': $v.message.required}"
            >Сообщение</span>
            <textarea
                class="profile-modal__textarea"
                :class="{'profile-modal__textarea_error': $v.message.$error}"
                name="message"
                id="message"
                placeholder="Сообщение"
                v-model.trim="message"
            ></textarea>
            <span class="profile-modal__error-text" v-if="$v.$error">*Обязательное поле для заполнения</span>
        </label>
        <input type="submit" class="profile-modal__button" value="Отправить запрос">
    </form>
</template>

<script>
    import {required, minLength} from "vuelidate/lib/validators"

    export default {
        name:"add-address",
        props:{
        },
        validations: {
            address: {
                required,
                minLength: minLength(6)
            },
            message: {
                required,
                minLength: minLength(6)
            }
        },
        data() {
            return {
                address: '',
                message: ''
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.saveChanges();
                }
            },
            saveChanges() {
                this.address = this.$v.address.$model;
                this.message = this.$v.message.$model
            }
        },
    }
</script>