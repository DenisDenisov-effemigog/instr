<template>
    <div class="contacts__wrap">
        <form v-if="!answer" action="" class="contacts-form" @submit.prevent="submit" ref="form">
            <h3 class="contacts-form__title">{{  $tc('contacts.form_title') }}</h3>
            <div class="contacts-form__column">
                <label name="name" class="contacts-form__label">
                    <input
                        class="contacts-form__input"
                        :class="{'contacts-form__input--error': $v.name.$error}"
                        type="text"
                        name="name"
                        id="name"
                        autocomplete="organization"
                        autocorrect="off"
                        v-model.trim="$v.name.$model">
                    <span class="contacts-form__label-text"
                        :class="{'contacts-form__label-text--up': $v.name.required}"
                    >{{ $tc('contacts.form_name') }}</span>
                    <svg viewBox="0 0 24 24"
                        class="contacts-form__label-icon" 
                        v-if="$v.name.required"
                        @click="$v.name.$model = ''">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="contacts-form__error-text contacts-form__error-text--invalid"
                        v-if="$v.name.$error">{{ $tc('text.error') }}</div>
                </label>
                <label name="phone" class="contacts-form__label">
                    <the-mask
                        class="contacts-form__input"
                        :class="{'contacts-form__input--error': $v.phone.$error}"
                        type="tel"
                        :mask="phoneMask"
                        :tokens="tokens"
                        :masked="true"
                        name="phone"
                        id="phone"
                        autocomplete="tel"
                        autocorrect="off"
                        v-model.trim="phone"/>
                    <span class="contacts-form__label-text"
                        :class="{'contacts-form__label-text--up': $v.phone.required}"
                    >{{ $tc('title.phone_number') }}</span>
                    <svg viewBox="0 0 24 24"
                        class="contacts-form__label-icon"
                        v-if="$v.phone.required"
                        @click="$v.phone.$model = ''">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="contacts-form__error-text contacts-form__error-text--invalid"
                        v-if="$v.phone.$error">{{ $tc('text.error') }}</div>
                </label>
                <label name="email" class="contacts-form__label">
                    <input
                        class="contacts-form__input"
                        :class="{'contacts-form__input--error': $v.newEmail.$error}"
                        type="email"
                        name="email"
                        id="email"
                        autocomplete="email"
                        autocorrect="off"
                        autocapitalize="off"
                        v-model.trim="newEmail">
                    <span class="contacts-form__label-text"
                        :class="{'contacts-form__label-text--up': $v.newEmail.required}"
                    >{{ $tc('title.email') }}</span>
                    <svg viewBox="0 0 24 24"
                        class="contacts-form__label-icon"
                        v-if="$v.newEmail.required"
                        @click="$v.newEmail.$model = ''">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="contacts-form__error-text contacts__error-text--invalid"
                        v-if="$v.newEmail.$error">{{ $tc('text.error') }}</div>
                </label>
                <label name="town" class="contacts-form__label">
                    <input
                        class="contacts-form__input"
                        type="text"
                        name="town"
                        id="town"
                        autocomplete="town"
                        autocorrect="off"
                        v-model.trim="$v.town.$model">
                    <span class="contacts-form__label-text"
                        :class="{'contacts-form__label-text--up': $v.town.required}"
                    >{{ $tc('contacts.form_town') }}</span>
                    <svg viewBox="0 0 24 24"
                        class="contacts-form__label-icon" 
                        v-if="$v.town.required"
                        @click="$v.town.$model = ''">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                </label>
            </div>
            <label for="message" class="contacts-form__label contacts-form__label--column">
                <textarea
                    class="contacts-form__textarea"
                    :class="{'contacts-form__textarea--error': $v.message.$error}"
                    name="message"
                    id="message"
                    v-model.trim="message"
                ></textarea>
                <span class="contacts-form__label-text"
                    :class="{'contacts-form__label-text--up': $v.message.required}"
                >{{ $tc('text.message') }}</span>
                <span class="contacts-form__error-text" v-if="$v.$error">*{{ $tc('text.required') }}</span>
            </label>
            <div class="contacts-form__stick">
                <label for="files" class="contacts-form__stick-label">
                    <input id="files" name="files" type="file" ref="file" class="contacts-form__stick-input">
                    {{ $tc('contacts.form_stick_input') }}
                </label>
                <span class="contacts-form__stick-text">
                    {{ $tc('contacts.form_stick_text') }}
                </span>
            </div>
            <input type="submit" class="contacts-form__btn" :value="$tc('contacts.form_btn')">
        </form>
        <div v-else class="contacts-form__answer">
            <div class="contacts-form__answer-text">
                Ваше сообщение отправлено!
            </div>
        </div>
    </div>
</template>

<script>

    import {required, email} from "vuelidate/lib/validators"
    import {TheMask} from 'vue-the-mask'

    import config from "../../config";

export default {
    name:"contacts-form",
    components: {
        TheMask
    },
    props: {
        phoneMask:{
            type: String,
            required: true,
        },  
    },
    validations: {
            name: {
                required
            },
            town: {
                required
            },
            phone: {
                required
            },
            newEmail: {
                required,
                email
            },
            message: {
                required,
            }
        },
        data() {
            return {
                name: '',
                phone: '',
                newEmail: '',
                town:'',
                message:'',
                tokens: config.phoneTokens,
                answer: false
            }
        },
        methods:{
            submit(){
                this.$v.$touch();
                let formData = {};
                if (!this.$v.name.$invalid &&
                    !this.$v.newEmail.$invalid && 
                    !this.$v.phone.$invalid &&
                    !this.$v.message.$invalid 
                ) {
                    if(this.$refs.file.files[0]){
                        formData.file = this.$refs.file.files[0]
                    }
                    formData.name = this.name
                    formData.phone = this.phone
                    formData.mail = this.newEmail
                    formData.town = this.town
                    formData.message = this.message
                    this.sendData(formData);
                }else{
                    console.log("zapolni");
                }
                
            },
            sendData(data){
                console.log(data);
                this.answer = true
            }
        }
}
</script>