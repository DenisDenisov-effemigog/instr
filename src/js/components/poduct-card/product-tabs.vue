<template>
    <div class="product-tabs">
        <div class="container">
            <div ref="tabs" class="product-tabs__tabs"
                :class="{'product-tabs__tabs_center': currentTab === 'description', 
                    'product-tabs__tabs_end': currentTab === 'questions'}">
                <div
                    v-if="features"
                    class="product-tabs__tab"
                    :class="{'product-tabs__tab_active': currentTab === 'features'}"
                    @click.prevent="showTab('features')"
                >
                    Характеристики
                </div>
                <div
                    v-if="description"
                    class="product-tabs__tab"
                    :class="{'product-tabs__tab_active': currentTab === 'description'}"
                    @click.prevent="showTab('description')"
                >
                    Описание
                </div>
                <div
                    v-if="questions"
                    class="product-tabs__tab"
                    :class="{'product-tabs__tab_active': currentTab === 'questions'}"
                    @click.prevent="showTab('questions')"
                >
                    Вопросы&nbsp;и&nbsp;ответы&nbsp;({{questions.length}})
                </div>
            </div>
            <div class="product-tabs__content">
                <div v-show="currentTab === 'features'" class="product-tabs_content__container">
                    <slot name="features"></slot>
                </div>
                <div v-show="currentTab === 'description'" class="product-tabs_content__container">
                    <slot name="description"></slot>
                </div>
                <product-tabs-questions 
                    v-show="currentTab === 'questions'"
                    :questions="questionsAnswers">
                </product-tabs-questions>
            </div>
        </div>
    </div>
</template>

<script>
    import productTabsQuestions from './product-tabs-questions.vue'

    export default {
        name: "product-tabs",
        components: {
            productTabsQuestions
        },
        props: {
            description: {},
            features: {},
            questions: {},
            },
        data() {
            return {
                currentTab: this.description ? 'features' : 'description',
            }
        },
        methods: {
            showTab(code) {
                if (this.currentTab !== code) {
                    this.currentTab = code;
                }
            },
        },
        computed: {
            questionsAnswers() {
                return this.questions
            }
        }
    }
</script>
