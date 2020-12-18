<template>
    <div class="user">
        <div class="user-tabs">
            <div class="user-tabs__tab"
                :class="{'user-tabs__tab_active': selected}"
                @click="selected = !selected"
            >Вход</div>
            <div class="user-tabs__tab"
                :class="{'user-tabs__tab_active': !selected}"
                @click="selected = !selected"
            >Регистрация</div>
        </div>
        <div class="user-content">
            <div class="user-login" v-if="selected">
                <form class="user-login__form"
                    @submit.prevent="enter">
                    <label name="email" class="user__label">
                        <span class="user__label-text"
                            :class="{'user__label-text_up': email}"
                        >Email</span>
                        <input
                            class="user__input"
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            autocorrect="off"
                            autocapitalize="off"
                            placeholder="Email"
                            v-model.trim="email">
                        <svg viewBox="0 0 24 24"
                            class="user__label-icon"
                            v-if="email"
                            @click="email = ''">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg>
                        <div class="user__error-text user__error-text_invalid"
                            v-if="invalid">
                            Ошибка при вводе данных
                        </div>
                    </label>
                    <label name="password" class="user__label">
                        <span class="user__label-text"
                            :class="{'user__label-text_up': password}"
                        >Пароль</span>
                        <input
                            class="user__input"
                            :class="{'user__input_dots': password && !passwordHidden}"
                            :type="passwordType"
                            name="password"
                            id="password"
                            placeholder="Пароль"
                            v-model.trim="password">
                        <show-password v-model="passwordHidden"></show-password>
                        <div class="user__error-text user__error-text_invalid"
                            v-if="invalid">
                            Ошибка при вводе данных
                        </div>
                    </label>
                    <div class="user__error-text" v-if="invalid">*Обязательное поле для заполнения</div>
                    <input type="submit" class="user__button" value="Войти">
                </form>
            </div>
            <div class="user-reg" v-else>
                <form class="user-reg__form"
                    @submit.prevent="saveChanges">
                    <label name="reason" class="user-reg__radio">
                        <input
                            type="radio"
                            name="entity"
                            value="legal">
                        <span class="user-reg__check"></span>
                        <span class="user-reg__radio-label">Юридическое лицо</span>
                    </label>
                    <label name="reason" class="user-reg__radio">
                        <input
                            type="radio"
                            name="entity"
                            value="individual">
                        <span class="user-reg__check"></span>
                        <span class="user-reg__radio-label">Физическое лицо</span>
                    </label>
                    <label name="taxPayer" class="user-reg__checkbox">
                        <input
                            class="user-reg__checkbox-input"
                            type="checkbox"
                            name="taxPayer">
                        <span class="user-reg__checkbox-slider"></span>
                        <span class="user-reg__checkbox-label">Плательщик&nbsp;НДС</span>
                    </label>
                    <label name="name" class="user__label">
                        <span class="user__label-text"
                            :class="{'user__label-text_up': name}"
                        >Контактное лицо</span>
                        <input
                            class="user__input"
                            type="text"
                            name="name"
                            id="name"
                            autocomplete="name"
                            autocorrect="off"
                            placeholder="Контактное лицо"
                            v-model.trim="name">
                        <svg viewBox="0 0 24 24"
                            class="user__label-icon"
                            v-if="name"
                            @click="name = ''">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg>
                        <div class="user__error-text user__error-text_invalid"
                            v-if="invalidReg">
                            Ошибка при вводе данных
                        </div>
                    </label>
                    <label name="company" class="user__label">
                        <span class="user__label-text"
                            :class="{'user__label-text_up': company}"
                        >Компания</span>
                        <input
                            class="user__input"
                            type="text"
                            name="company"
                            id="company"
                            autocomplete="organization"
                            autocorrect="off"
                            placeholder="Компания"
                            v-model.trim="company">
                        <svg viewBox="0 0 24 24"
                            class="user__label-icon" 
                            v-if="company"
                            @click="company = ''">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg>
                        <div class="user__error-text user__error-text_invalid"
                            v-if="invalidReg">
                            Ошибка при вводе данных
                        </div>
                    </label>
                    <label name="code" class="user__label">
                        <span class="user__label-text"
                            :class="{'user__label-text_up': code}"
                        >Код доступа</span>
                        <input
                            class="user__input"
                            type="text"
                            name="code"
                            id="code"
                            placeholder="Код доступа"
                            v-model.trim="code">
                        <svg viewBox="0 0 24 24"
                            class="user__label-icon"
                            v-if="code"
                            @click="code = ''">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg>
                    </label>
                    <label name="phone" class="user__label">
                        <span class="user__label-text"
                            :class="{'user__label-text_up': phone}"
                        >Номер телефона</span>
                        <input
                            class="user__input"
                            type="tel"
                            name="phone"
                            id="phone"
                            autocomplete="tel"
                            autocorrect="off"
                            placeholder="Номер телефона"
                            v-model.trim="phone">
                        <svg viewBox="0 0 24 24"
                            class="user__label-icon"
                            v-if="phone"
                            @click="phone = ''">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg>
                        <div class="user__error-text user__error-text_invalid"
                            v-if="invalidReg">
                            Ошибка при вводе данных
                        </div>
                    </label>
                    <label name="email" class="user__label">
                        <span class="user__label-text"
                            :class="{'user__label-text_up': newEmail}"
                        >Email</span>
                        <input
                            class="user__input"
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            autocorrect="off"
                            autocapitalize="off"
                            placeholder="Email"
                            v-model.trim="newEmail">
                        <svg viewBox="0 0 24 24"
                            class="user__label-icon"
                            v-if="newEmail"
                            @click="newEmail = ''">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg>
                        <div class="user__error-text user__error-text_invalid"
                            v-if="invalidReg">
                            Ошибка при вводе данных
                        </div>
                    </label>
                    <div class="user__error-text" v-if="invalidReg">*Обязательное поле для заполнения</div>
                    <label name="agreement" class="user__label">
                        <input
                            class="user__checkbox-input"
                            type="checkbox"
                            name="agreement"
                            required
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
            </div>
        </div>
    </div>
</template>

<script>
import showPassword from '../../partials/show-password.vue'

    export default {
        name:'user',
        components: {
            showPassword
        },
        props: {
            // selected: {
            //     type: Boolean,
            //     required: true
            // }
        },
        data() {
            return {
                selected: true,
                invalid: false,
                invalidReg: false,
                email: '',
                password: '',
                passwordHidden: false,
                name: '',
                company: '',
                code: '',
                phone: '',
                newEmail: ''
            }
        },
        methods: {
            enter() {
                if (this.email && this.password) {
                    this.invalid = false
                } else {
                    this.invalid = true
                }
            },
            saveChanged() {
                if (this.name && this.company && this.code && this.phone && this.newEmail) {
                    this.invalidReg = false
                } else {
                    this.invalidReg = true
                }
            }
        },
        computed: {
            passwordType() {
                return this.passwordHidden ? 'text' : 'password'
            },
            newPasswordType() {
                return this.newPasswordHidden ? 'text' : 'password'
            }
        }
    }
</script>