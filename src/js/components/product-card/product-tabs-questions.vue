<template>
    <div class="product-tabs__content-answer">
        <form class="product-tabs__form"
            :class="{'product-tabs__form--expanded': formExpanded}"
            @submit.prevent="addQuestion"
            @click="formExpanded = true">
            <div class="product-tabs__content-title">{{ $tc('product_card.form.title') }}</div>
            <textarea class="product-tabs__input"
                      :class="{'form__input--error': $v.newQuestion.$error}"
                      :placeholder="$tc('input.text.write-ask')"
                      autocorrect="off"
                      v-model.trim="$v.newQuestion.$model"
            ></textarea>
            <span class="product-tabs__form-button-block">
                <label class="product-tabs__input-email-label">
                    <input class="product-tabs__input-email"
                           :name="email"
                           :placeholder="$tc('input.text.mail-answer')"
                           autocorrect="off"
                           autocomplete="email"
                           autocapitalize="off"
                           :class="{'form__input--error': $v.email.$error}"
                           v-model.trim="$v.email.$model"
                    >
                    <svg viewBox="0 0 24 24" @click="email = ''" v-if="email">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                </label>
                <input type="submit"
                       class="product-tabs__button"
                       :value="$tc('product_card.button.send-question')"
                >
            </span>
             <span class="product-tabs__form-error"
                :class="{'product-tabs__form-error_show': $v.email.$error || $v.newQuestion.$error}"
             >{{$tc('text.error')}}</span>
             <span class="product-tabs__form-error"
                :class="{'product-tabs__form-error_show': error}"
             >{{$tc('text.error.server')}}</span>
        </form>
        <div class="product-tabs__answer" v-if="newItem.question">
            <span class="product-tabs__new-badge">{{ $tc('product_card.questions.badge') }}</span>
            <div class="product-tabs__content-title" v-show="newItem.name">{{newItem.name}}</div>
            <div class="product-tabs__question">
                <svg  viewBox="0 0 18 18">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__question'"></use>
                </svg>
                <div class="product-tabs__question-text">{{newItem.question}}</div>
            </div>   
        </div>
        <div class="product-tabs__answer" v-for="(question, index) in qAs" :key="index">
            <div class="product-tabs__content-title" v-show="question.name">{{question.name}}</div>
            <div class="product-tabs__question">
                <svg  viewBox="0 0 18 18">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__question'"></use>
                </svg>
                <div class="product-tabs__question-text">{{question.question}}</div>
            </div>
            <product-tabs-answer v-if="question.answer" :answer="question.answer">
            </product-tabs-answer>    
        </div>
        <div class="product-tabs__answers-all" @click="expand" v-if="!expanded && quantity > 3">
            {{ $tc('product_card.link.see_more') }} {{ $tc('product_card.link.see_more_question', questionsQuantity - 3) }}
        </div>
    </div>
</template>

<script>
    import productTabsAnswer from './product-tabs-answer.vue'
    import {required,email} from "vuelidate/lib/validators";
    import * as Api from '../../api/index'

    let api = Api.getInstance();

    export default {
        name: "product-tabs-questions",
        props: {
            questions: {
                type: Array,
                required: true
            },
            user: {
                type: Object,
                required: true
            },
            productId: {
                type: Number,
                required: true
            },
        },
        data() {
            return {
                expanded: false,
                error: false,
                formExpanded: false,
                newQuestion: '',
                email: this.user.email,
                newItem: {
                    'name': null,
                    'question': null,
                    'answer': null
                },
                quantity: null
            }
        },
        validations:{
            email: {required, email},
            newQuestion: {required}
        },
        components: {
            productTabsAnswer
        },
        methods: {    
            addQuestion() {
                if (!this.$v.$invalid) {
                    
                    let vm = this;
                    api.sendQuestion( vm.productId, vm.newQuestion, vm.email).then(answer => {
                        vm.newQuestionItem();
                        vm.formExpanded = false;
                        vm.quantity = vm.questions.length
                        vm.newQuestion = null
                        vm.$v.newQuestion.$reset()
                        this.error = false
                    }).catch((errors) => {
                        console.error(errors);
                        this.error = true
                        /*todo возможные ошибки от сервера, возможео понадобится*/
                        if (errors === 'http_parameter_err') {
                        } else if (errors === 'need_auth') {
                        } else if (errors === 'incorrect_email') {
                        }
                    });
                } else {
                    this.$v.$touch();
                }
            },
            expand() {
                this.expanded = true;
            },
            newQuestionItem() {
                if (this.user.email === this.email) {
                    this.newItem.name = this.user.name
                } else {
                    this.newItem.name = null
                }
                this.newItem.question = this.newQuestion;
                return this.newItem
            }
        },
        computed: {
            qAs() {
                if (this.expanded) {
                    return this.questions.slice()
                } else {
                    return this.questions.slice(0, 3)
                }
            },
            questionsQuantity() {
                return this.quantity = this.questions.length
            },
        },
        created() {
            this.qAs
            this.questionsQuantity
        }
    }
</script>

<style scoped>
    .demo {
        position: relative;
    }
</style>