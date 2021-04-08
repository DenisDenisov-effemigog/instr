<template>
    <form class="profile-modal__form profile-modal__form--column"
        @submit.prevent="submit">
        <label class="profile-modal__radio"
               v-for="(reason, index) in delationReasons"
               :key="index"
               v-if="index !== delationReasons.length - 1"
        >
            <input
                type="radio"
                :name="'reason-'+ (index + 1)"
                :value="index + 1"
                v-model="picked">
            <span class="profile-modal__check"></span>
            <!-- Отрисовка причин с нумерацией -->
            <span class="profile-modal__radio-label">{{ $tc(reason) }}{{ index + 1 }}</span> 
        </label>
        <label class="profile-modal__radio profile-modal__radio_column"
               v-for="(reason, index) in delationReasons"
               :key="index"
               v-if="index === delationReasons.length - 1"
        >
            <span class="profile-modal__radio-input">
                <input
                    type="radio"
                    name="reason-another"
                    :value="$tc(reason)"
                    v-model="picked">
                <span class="profile-modal__check"></span>
                <span class="profile-modal__radio-label">{{ $tc(reason) }}</span>
            </span>
            <textarea
                class="profile-modal__textarea" 
                :class="{'profile-modal__textarea--error': $v.message.$error && picked === $tc(reason)}"
                name="reason-another"
                v-model.trim="$v.message.$model"
                :disabled="picked !== $tc(reason)"
            ></textarea>
            <span class="profile-modal__label-text"
                :class="{'profile-modal__label-text--up': $v.message.required}"
            >{{ $tc('text.message') }}</span>
            <span class="profile-modal__error-text" v-if="$v.message.$error && picked === $tc(reason)">*{{ $tc('text.required') }}</span>
        </label>
        <input type="submit" class="profile-modal__button" :value="$tc('profile_personal.link.delete_profile')" v-if="type == 'profile'">
        <input type="submit" class="profile-modal__button" :value="$tc('modal.link.confirm')" v-else-if=" type === 'address'">
    </form>
</template>

<script>
    import {required, minLength} from "vuelidate/lib/validators"
    import * as Api from '../../../api/index'

    let api = Api.getInstance();

    export default {
        name:"delete-profile",
        props:{
            reasons: {
                type: Array,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: false
            },
            address: {
                type: String,
                required: false
            }
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
                picked: 1,
                checkedVal: ''
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (this.picked !== this.$tc('delete_profile.reason_another')) {
                    this.saveChanges();
                }else if (!this.$v.$invalid){
                    this.saveChanges()
                }
            },
            saveChanges() {
                let vm = this
                if(vm.type === 'profile') {
                    api.deleteProfile(vm.picked, vm.message).then(() => {
                        vm.$eventBus.$emit('closeModal')
                        window.location.replace('/');
                    }).catch(errors => {
                        console.error(errors);
                    })
                } else if (vm.type === 'address') {
                    api.deleteAddress(vm.picked, vm.message, vm.id, vm.address).then(() => {
                        vm.$eventBus.$emit('closeModal')
                        vm.$eventBus.$emit('updateAddress')
                    }).catch(errors => {
                        console.error(errors);
                    })
                }
            }
        },
        computed: {
            delationReasons() {
                return this.reasons
            }
        }
    }
</script>