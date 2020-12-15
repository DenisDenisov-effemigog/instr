<template>
    <div class="product-tabs__content-answer">
        <form class="product-tabs__form"
            :class="{'product-tabs__form_expanded': formExpanded}"
            @submit.prevent="addQuestion"
            @click="formExpanded = true">
            <div class="product-tabs__content-title">Задайте вопрос о товаре</div>
            <textarea class="product-tabs__input"
                type="text"
                placeholder="Напишите свой вопрос"
                autocorrect="off"
                v-model="newQuestion"
                required></textarea>
            <span class="product-tabs__form-button-block">
                <label name="email" class="product-tabs__input-email-label">
                    <input class="product-tabs__input-email"
                        name="email"
                        type="email"
                        placeholder="Email для ответа"
                        autocorrect="off"
                        autocomplete="email"
                        v-model="email"
                        required>
                    <svg viewBox="0 0 24 24" @click="email = ''" v-if="email">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                </label>
                <input type="submit"
                    class="product-tabs__button"
                    value="Отправить вопрос"
                >
            </span>
            <!-- <span class="product-tabs__form-error"
                :class="{'product-tabs__form-error_show': error}">
                Заполните все поля</span> -->
        </form>
        <div class="product-tabs__answer" v-for="(question, index) in qAs">
            <span class="product-tabs__new-badge" v-if="newBadge === index">Новый вопрос</span>
            <div class="product-tabs__content-title" v-show="question.name">{{question.name}}</div>
            <div class="product-tabs__question">
                <svg  viewBox="0 0 18 18">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__question'"></use>
                </svg>
                <div class="product-tabs__question-text">{{question.question}}</div>
            </div>
            <product-tabs-answer v-show="question.answer" :answer="question.answer">
            </product-tabs-answer>    
        </div>
        <div class="product-tabs__answers-all" @click="expand" v-if="!expanded && quantity > 3">
            Посмотреть все {{quantity}} 
            <span v-if="quantity < 5">вопроса</span>
            <span v-else>вопросов</span>
        </div>
    </div>
</template>

<script>
    import productTabsAnswer from './product-tabs-answer.vue'

    export default {
        name: "product-tabs-questions",
        props: {
            questions: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                expanded: false,
                formExpanded: false,
                error: false,
                newQuestion: '',
                newBadge: null,
                email: 'moymir@mail.ru',
                newItem: {
                    'name': null,
                    'question': null,
                    'answer': null
                },
                quantity: 4
            }
        },
        components: {
            productTabsAnswer
        },
        methods: {
            expand() {
                this.expanded = true;
            },        
            addQuestion() {
                if (this.email && this.newQuestion) {
                    this.newBadge = 0;
                    this.error = false;
                    if (this.expanded) {
                        this.questions.unshift({...this.newQuestionItem});
                    } else {
                        this.qAs.unshift({...this.newQuestionItem});
                        this.questions.unshift({...this.newQuestionItem});
                    }
                    this.quantity = this.questions.length
                } else {
                    this.newBadge = null;
                    this.error = true
                }
            }
        },
        computed: {
            qAs() {
                if (this.expanded) {
                    return this.questions
                } else {
                    return this.questions.slice(0, 3)
                }
            },
            questionsQuantity() {
                return this.quantity = this.questions.length
            },
            newQuestionItem() {
                if (this.email == 'moymir@mail.ru') {
                    this.newItem.name = 'Роман Сычев'
                } else {
                    this.newItem.name = null
                }
                this.newItem.question = this.newQuestion;
                return this.newItem
            }
        },
        created() {
            this.questionsQuantity;
            this.qAs;
            this.addQuestion()
        }
    }
</script>

<style scoped>
    .demo {
        position: relative;
    }
</style>