<template>
    <form class="user-reg__form"
        @submit.prevent="submit">
        <label name="reason" class="user-reg__radio">
            <input
                type="radio"
                name="entity"
                value="legal"
                @click ='IndividualFlag = false'
                checked>
            <span class="user-reg__check"></span>
            <span class="user-reg__radio-label">Юридическое лицо</span>
        </label>
        <label name="reason" class="user-reg__radio">
            <input
                type="radio"
                name="entity"
                value="individual"
                @click ='IndividualFlag = true'>
            <span class="user-reg__check"></span>
            <span class="user-reg__radio-label">Физическое лицо</span>
        </label>
        <label v-show="!IndividualFlag" name="taxPayer" class="user-reg__checkbox">
            <input
                class="user-reg__checkbox-input"
                type="checkbox"
                name="taxPayer">
            <span class="user-reg__checkbox-slider"></span>
            <span class="user-reg__checkbox-label">Плательщик&nbsp;НДС</span>
        </label>
        <label name="name" class="user__label">
            <input
                v-if="!IndividualFlag"
                class="user__input"
                :class="{'user__input_error': $v.name.$error}"
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                autocorrect="off"
                v-model.trim="$v.name.$model">
            <input
                v-else
                class="user__input"
                :class="{'user__input_error': $v.name.$error}"
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                autocorrect="off"
                v-model.trim="$v.name.$model">
            <span v-if="!IndividualFlag" class="user__label-text"
                :class="{'user__label-text_up': $v.name.required}"
            >Контактное лицо</span>
            <span v-else class="user__label-text"
                :class="{'user__label-text_up': $v.name.required}"
            >ФИО</span>
            <svg viewBox="0 0 24 24"
                class="user__label-icon"
                v-if="$v.name.required"
                @click="$v.name.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <div class="user__error-text user__error-text_invalid"
                v-if="$v.name.$error">
                Ошибка при вводе данных
            </div>
        </label>
        <label v-show="!IndividualFlag" name="company" class="user__label">
            <input
                class="user__input"
                :class="{'user__input_error': $v.company.$error}"
                type="text"
                name="company"
                id="company"
                autocomplete="organization"
                autocorrect="off"
                v-model.trim="$v.company.$model">
            <span class="user__label-text"
                :class="{'user__label-text_up': $v.company.required}"
            >Компания</span>
            <svg viewBox="0 0 24 24"
                class="user__label-icon" 
                v-if="$v.company.required"
                @click="$v.company.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <div class="user__error-text user__error-text_invalid"
                v-if="$v.company.$error">
                Ошибка при вводе данных
            </div>
        </label>
        <label v-show="!IndividualFlag" name="code" class="user__label">
            <input
                class="user__input"
                :class="{'user__input_error': $v.code.$error}"
                type="text"
                name="code"
                id="code"
                v-model.trim="$v.code.$model">
            <span class="user__label-text"
                :class="{'user__label-text_up': $v.code.required}"
            >Код доступа</span>
            <svg viewBox="0 0 24 24"
                class="user__label-icon"
                v-if="$v.code.required"
                @click="$v.code.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
        </label>
        <label name="phone" class="user__label">
            <the-mask
                class="user__input"
                :class="{'user__input_error': $v.phone.$error}"
                type="tel"
                :mask="phoneMask"
                :tokens="tokens"
                name="phone"
                id="phone"
                autocomplete="tel"
                autocorrect="off"
                v-model.trim="phone"/>
            <span class="user__label-text"
                :class="{'user__label-text_up': $v.phone.required}"
            >Номер телефона</span>
            <svg viewBox="0 0 24 24"
                class="user__label-icon"
                v-if="$v.phone.required"
                @click="$v.phone.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <div class="user__error-text user__error-text_invalid"
                v-if="$v.phone.$error">
                Ошибка при вводе данных
            </div>
        </label>
        <label name="email" class="user__label">
            <input
                class="user__input"
                :class="{'user__input_error': $v.newEmail.$error}"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                autocorrect="off"
                autocapitalize="off"
                v-model.trim="newEmail">
            <span class="user__label-text"
                :class="{'user__label-text_up': $v.newEmail.required}"
            >Email</span>
            <svg viewBox="0 0 24 24"
                class="user__label-icon"
                v-if="$v.newEmail.required"
                @click="$v.newEmail.$model = ''">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
            </svg>
            <div class="user__error-text user__error-text_invalid"
                v-if="$v.newEmail.$error">
                Ошибка при вводе данных
            </div>
        </label>
        <div class="user__error-text" v-if="$v.error">*Обязательное поле для заполнения</div>
        <label name="agreement" class="user__label user__label_row">
            <input
                class="user__checkbox-input"
                type="checkbox"
                name="agreement"
                required
                checked
            >
            <span class="user__checkbox-label">
                <svg viewBox="0 0 10 8">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__checked'"></use>
                </svg>
            </span>
            <span class="user__checkbox-text">Я согласен с политикой обработки персональных данных</span>
        </label>
        <input type="submit" class="user__button" value="Зарегистрироваться">
    </form>
</template>

<script>
    import {required, minLength, email, alphaNum} from "vuelidate/lib/validators"
    import {TheMask} from 'vue-the-mask'
    
    import config from "../../../config";

    export default {
        name:'user-reg',
        components: {
            TheMask
        },
        props: {
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
            newEmail: {
                required,
                email
            }
        },
        data() {
            return {
                IndividualFlag: false,
                name: '',
                company: '',
                code: '',
                phone: '',
                newEmail: '',
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
               this.name = this.$v.name.$model;
               this.company = this.$v.company.$model;
               this.code = this.$v.code.$model;
               this.phone = this.$v.phone.$model;
               this.newEmail = this.$v.newEmail.$model;
            }
        }
    }
</script>