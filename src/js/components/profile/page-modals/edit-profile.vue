<template>
    <form class="profile-modal__form"
          @submit.prevent="submit">
        <label for="name" class="profile-modal__label">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_error': $v.name.$error}"
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                autocorrect="off"
                v-model.trim="$v.name.$model">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text_up': $v.name.required}"
            >{{ $tc('profile_personal.title.person') }}</span>
            <svg
                viewBox="0 0 24 24"
                class="profile-modal__label-icon"
                v-if="$v.name.required"
                @click="$v.name.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>   
        </label>
        <label for="company" class="profile-modal__label">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_error': $v.company.$error}"
                type="text"
                name="company"
                id="company"
                autocomplete="organization"
                autocorrect="off"
                v-model.trim="$v.company.$model"
                readonly="readonly">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text_up': $v.company.required}"
            >{{ $tc('profile_personal.title.company') }}</span>
        </label>
        <label for="code" class="profile-modal__label">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_error': $v.code.$error}"
                type="text"
                name="code"
                id="code"
                v-model.trim="$v.code.$model"
                readonly="readonly">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text_up': $v.code.required}"
            >{{ $tc('profile_personal.title.inn') }}</span>
        </label>
        <label for="phone" class="profile-modal__label profile-modal__label_column">
            <the-mask
                class="profile-modal__input"
                :class="{'profile-modal__input_error': $v.phone.$error}"
                type="tel"
                :mask="phoneMask"
                :tokens="tokens"
                name="phone"
                id="phone"
                autocomplete="tel"
                autocorrect="off"
                v-model.trim="$v.phone.$model"/>
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text_up': $v.phone.required}"
            >{{ $tc('profile_personal.title.phone_number') }}</span>
            <svg
                viewBox="0 0 24 24"
                class="profile-modal__label-icon"
                v-if="$v.phone.required"
                @click="$v.phone.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <span
                class="profile-modal__error-text profile-modal__error-text_invalid"
                v-if="$v.phone.$error"
            >{{ $tc('text.error') }}</span>
        </label>
        <label for="email" class="profile-modal__label profile-modal__label_column">
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_error': $v.email.$error}"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                autocorrect="off"
                autocapitalize="off"
                v-model.trim="$v.email.$model">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text_up': $v.email.required}"
            >{{ $tc('profile_personal.title.email') }}</span>
            <svg
                viewBox="0 0 24 24"
                class="profile-modal__label-icon"
                v-if="$v.email.required"
                @click="$v.email.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <span
                class="profile-modal__error-text profile-modal__error-text_invalid_email"
                v-if="$v.email.$error"
            >{{ $tc('text.error') }}</span>
        </label>
        <div class="profile-modal__error-text" v-if="$v.$error">*{{ $tc('text.required') }}</div>
        <input type="submit" class="profile-modal__button" value="Сохранить">
    </form>
</template>

<script>
    import {required, minLength, email, numeric, alphaNum} from "vuelidate/lib/validators"
    import {TheMask} from 'vue-the-mask'
    import config from "../../../config";

    export default {
        name:"edit-profile",
        props:{
            person: {required: true}
        },
        components: {
            TheMask
        },
        validations: {
            name: {
                required
            },
            company: {
                required
            },
            code: {
                required,
                alphaNum
            },
            phone: {
                required
            },
            email: {
                required,
                email
            }
        },
        data() {
            return {
                name: '',
                company: '',
                code: '',
                phone: null,
                email: '',
                tokens: config.phoneTokens,
                phoneMask: config.phoneMask
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
               this.person.contact = this.$v.name.$model;
               this.person.company = this.$v.company.$model;
               this.person.code = this.$v.code.$model;
               this.person.phone = this.$v.phone.$model;
               this.person.email = this.$v.email.$model;
            }
        },
        mounted() {
            this.name = this.person.contact
            this.company = this.person.company
            this.code = this.person.code
            this.phone = this.person.phone
            this.email = this.person.email
        }
    }
</script>