<template>
    <form class="profile-modal__form"
        @submit.prevent="submit">
        <label for="address" class="profile-modal__label">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_error': $v.address.$error}"
                type="text"
                name="address"
                id="address"
                autocomplete="name"
                autocorrect="off"
                v-model.trim="address">
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text--up': $v.address.required}"
            >{{ $tc('text.address') }}</span>
        </label>
        <label for="message" class="profile-modal__label profile-modal__label--column">
            <textarea
                class="profile-modal__textarea"
                :class="{'profile-modal__textarea--error': $v.message.$error}"
                name="message"
                id="message"
                v-model.trim="message"
            ></textarea>
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text--up': $v.message.required}"
            >{{ $tc('text.message') }}</span>
            <span class="profile-modal__error-text" v-if="$v.$error">*{{ $tc('text.required') }}</span>
        </label>
        <input type="submit" class="profile-modal__button" :value="$tc('modal.link.confirm')">
    </form>
</template>

<script>
    import {required, minLength} from "vuelidate/lib/validators"
    import * as Api from '../../../api/index'

    let api = Api.getInstance();

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
                let vm = this

                api.addAddress(vm.$v.address.$model, vm.$v.message.$model).then(answer => {
                    vm.$eventBus.$emit('closeModal')
                    vm.$eventBus.$emit('updateAddress')
                }).catch(errors => {
                    console.error(errors);
                })
            }
        },
    }
</script>