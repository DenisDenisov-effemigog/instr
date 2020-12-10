<template>
    <div class="product-tabs">
        <div 
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
            class="container">
            <div ref="tabs" class="product-tabs__tabs"
                :class="{'product-tabs__tabs_center': currentTab === 'description', 
                    'product-tabs__tabs_end': currentTab === 'questions'}">
                <div
                    transition ="a"
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
                startTouch:0,
                moveTouch:0,
                currentTab: this.description ? 'features' : 'description',
            }
        },
        methods: {
            showTab(code) {
                if (this.currentTab !== code) {
                    this.currentTab = code;
                }
            },
            scroll(){
                var target = this.$refs.tabs;
                let headerHeigth = document.querySelector('.header').offsetHeight
                let targetOffsetTop = target.offsetTop - headerHeigth;    
                window.scroll({top: targetOffsetTop, behavior: 'smooth'});
                this.showTab('features')
            },
            touchStart(e){
                this.startTouch = e.changedTouches[0].pageX
            },
            touchMove(e){
                this.moveTouch = e.changedTouches[0].pageX
            },
            touchEnd(){
                let a = document.querySelector('.product-tabs_content__container')
                console.log(a)
                if(this.startTouch > this.moveTouch){
                    switch(this.currentTab){
                        case 'features':
                            this.currentTab = 'description';
                            break;
                        case 'description':
                            this.currentTab = 'questions';
                            break;
                        case 'questions':
                            break;
                    }
                }else{
                    switch(this.currentTab){
                        case 'questions':
                            this.currentTab = 'description';
                            break;
                        case 'description':
                            this.currentTab = 'features';
                            break;
                        case 'features':
                            break;
                    }
                }
            }
        },
        computed: {
            questionsAnswers() {
                return this.questions
            }
        },
        created(){
            this.$eventBus.$on("click", this.scroll)
        }

    }
</script>
