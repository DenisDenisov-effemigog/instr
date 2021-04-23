<template>
    <div v-if="dispatched">
        <div class="profile-modal__notification">{{ $tc('profile_delivery.notification_text') }}</div>
        <div class="profile-modal__button" @click="close">{{ $tc('link.close') }}</div>
    </div>
    <form class="profile-modal__form" v-else
        @submit.prevent="submit">
        <label for="address" class="profile-modal__label">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input--error': $v.address.$error}"
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
            <span class="profile-modal__error-text" v-if="$v.$dirty && (!$v.address.minLength || !$v.message.minLength)">*{{ $tc('text.error') }}</span>
            <span class="profile-modal__error-text" v-if="$v.$error && (!$v.address.required || !$v.message.required)">
                *{{ $tc('text.required') }}
            </span>
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
                message: '',
                dispatched: false
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
                    vm.$eventBus.$emit('updateAddress')
                    this.dispatched = true
                }).catch(errors => {
                    console.error(errors);
                })
            },
            close() {
                this.$eventBus.$emit('closeModal')
            }
        },
    }
</script>