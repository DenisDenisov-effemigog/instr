<template>
    <form class="profile-modal__form"
          @submit.prevent="submit">
        <label name="name" class="profile-modal__label">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text_up': $v.name.required}"
            >Контактное лицо</span>
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_error': $v.name.$error}"
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                autocorrect="off"
                placeholder="Контактное лицо"
                v-model.trim="$v.name.$model">
            <svg
                viewBox="0 0 24 24"
                class="profile-modal__label-icon"
                v-if="$v.name.required"
                @click="$v.name.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="company" class="profile-modal__label">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text_up': $v.company.required}"
            >Компания</span>
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_error': $v.company.$error}"
                type="text"
                name="company"
                id="company"
                autocomplete="organization"
                autocorrect="off"
                placeholder="Компания"
                v-model.trim="$v.company.$model">
            <svg
                viewBox="0 0 24 24"
                class="profile-modal__label-icon"
                v-if="$v.company.required"
                @click="$v.company.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="code" class="profile-modal__label">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text_up': $v.code.required}"
            >Код доступа</span>
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_error': $v.code.$error}"
                type="text"
                name="code"
                id="code"
                placeholder="Код доступа"
                v-model.trim="$v.code.$model">
            <svg
                viewBox="0 0 24 24"
                class="profile-modal__label-icon"
                v-if="$v.code.required"
                @click="$v.code.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="phone" class="profile-modal__label profile-modal__label_column">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text_up': $v.phone.required}"
            >Номер телефона</span>
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_error': $v.phone.$error}"
                type="tel"
                name="phone"
                id="phone"
                autocomplete="tel"
                autocorrect="off"
                placeholder="Номер телефона"
                v-model.trim="$v.phone.$model">
            <svg
                viewBox="0 0 24 24"
                class="profile-modal__label-icon"
                v-if="$v.phone.required"
                @click="$v.phone.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <span
                class="profile-modal__error-text profile-modal__error-text_input-error"
                v-if="$v.phone.$error"
            >Ошибка при вводе данных</span>
        </label>
        <label name="email" class="profile-modal__label profile-modal__label_column">
            <span class="profile-modal__label-text"
                  :class="{'profile-modal__label-text_up': $v.email.required}"
            >Email</span>
            <input
                class="profile-modal__input"
                :class="{'profile-modal__input_error': $v.email.$error}"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                autocorrect="off"
                autocapitalize="off"
                placeholder="Email"
                v-model.trim="$v.email.$model">
            <svg
                viewBox="0 0 24 24"
                class="profile-modal__label-icon"
                v-if="$v.email.required"
                @click="$v.email.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <span
                class="profile-modal__error-text profile-modal__error-text_input-error"
                v-if="$v.email.$error"
            >Ошибка при вводе данных</span>
        </label>
        <div class="profile-modal__error-text" v-if="invalid">*Обязательное поле для заполнения</div>
        <input type="submit" class="profile-modal__button" value="Сохранить">
    </form>
</template>

<script>
    import {required, minLength, email, numeric, alphaNum} from "vuelidate/lib/validators"

    export default {
        name:"edit-profile",
        props:{
            person: {required: true}
        },
        validations: {
            name: {
                required,
                minLength: minLength(4)
            },
            company: {
                required
            },
            code: {
                required,
                alphaNum
            },
            phone: {
                required,
                numeric
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
                invalid: false
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.saveChanges();
                    this.invalid = false
                } else {
                    this.invalid = true
                }
            },
            closeOutside(event) {
                if(event.toElement.className !== '') {
                    this.closeModal()
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
            this.name = this.person.contact,
            this.company = this.person.company,
            this.code = this.person.code,
            this.phone = this.person.phone,
            this.email = this.person.email
        }
    }
</script>