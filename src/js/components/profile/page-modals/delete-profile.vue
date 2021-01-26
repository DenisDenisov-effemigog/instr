<template>
    <form class="profile-modal__form profile-modal__form_column"
        @submit.prevent="submit">
        <label class="profile-modal__radio">
            <input
                type="radio"
                name="reason-first"
                value="1"
                v-model="picked">
            <span class="profile-modal__check"></span>
            <span class="profile-modal__radio-label">{{ $tc('delete_profile.reason') }} № 1</span>
        </label>
        <label class="profile-modal__radio">
            <input
                type="radio"
                name="reason-second"
                value="2"
                v-model="picked">
            <span class="profile-modal__check"></span>
            <span class="profile-modal__radio-label">{{ $tc('delete_profile.reason') }} № 2</span>
        </label>
        <label class="profile-modal__radio">
            <input
                type="radio"
                name="reason-third"
                value="3"
                v-model="picked">
            <span class="profile-modal__check"></span>
            <span class="profile-modal__radio-label">{{ $tc('delete_profile.reason') }} № 3</span>
        </label>
        <label class="profile-modal__radio profile-modal__radio_column">
            <span class="profile-modal__radio-input">
                <input
                    type="radio"
                    name="reason-another"
                    :value="$tc('profile.delete_profile.another_reason')"
                    v-model="picked">
                <span class="profile-modal__check"></span>
                <span class="profile-modal__radio-label">{{ $tc('delete_profile.reason_another') }}</span>
            </span>
            <textarea
                class="profile-modal__textarea"
                :class="{'profile-modal__textarea_error': $v.message.$error && picked === $tc('delete_profile.reason_another')}"
                name="reason"
                v-model.trim="$v.message.$model"
                :disabled="picked !== $tc('delete_profile.reason_another')"
            ></textarea>
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text_up': $v.message.required}"
            >{{ $tc('text.message') }}</span>
            <span class="profile-modal__error-text" v-if="$v.message.$error && picked === $tc('delete_profile.reason_another')">*{{ $tc('text.required') }}</span>
        </label>
        <input type="submit" class="profile-modal__button" :value="$tc('profile_personal.link.delete_profile')">
    </form>
</template>

<script>
    import {required, minLength} from "vuelidate/lib/validators"


    export default {
        name:"delete-profile",
        props:{
        },
        validations: {
            message: {
                required,
                minLength: minLength(6)
            }
        },
        data() {
            return {
                message: '',
                picked: '',
                checkedVal: ''
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (this.picked !== 'delete_profile.reason_another') {
                    this.saveChanges();
                }else if(!this.$v.$invalid){
                    this.saveChanges()
                }
            },
            saveChanges() {
                if(this.message){
                    this.message = this.$v.message.$model;
                }
                this.checkedVal = this.picked
            }
        },
    }
</script>