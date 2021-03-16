<template>
    <section class="product-tabs">
        <div 
            class="container">
            <div class="product__tabs-wrapper">
                <div ref="tabs" class="product-tabs__tabs"
                    :class="{'product-tabs__tabs--center': currentTab === 'description',
                             'product-tabs__tabs--end': currentTab === 'questions'}"
                    @touchmove="scrollTabs"
                    @touchstart="touchStart"
                    @touchend="touchEnd"
                >
                    <div
                        v-if="features"
                        class="product-tabs__tab"
                        :class="{'product-tabs__tab--active': currentTab === 'features'}"
                        @click.prevent="showTab('features')"
                    >
                        {{ $tc('product_card.tabs.features') }}
                    </div>
                    <div
                        v-if="description"
                        class="product-tabs__tab"
                        :class="{'product-tabs__tab--active': currentTab === 'description'}"
                        @click.prevent="showTab('description')"
                    >
                        {{ $tc('product_card.tabs.description') }}
                    </div>
                    <div
                        v-if="questions && !!user.authorized"
                        class="product-tabs__tab"
                        :class="{'product-tabs__tab--active': currentTab === 'questions'}"
                        @click.prevent="showTab('questions')"
                    >
                        {{ $tc('product_card.tabs.questions') }}&nbsp;({{questions.length}})
                    </div>
                </div>
            </div>
            <div class="product-tabs__content">
                <div v-if="currentTab === 'features'" class="product-tabs_content__container">
                    <slot name="features"></slot>
                </div>
                <div v-else-if="currentTab === 'description'" class="product-tabs_content__container">
                    <slot name="description"></slot>
                </div>
                <product-tabs-questions 
                    v-else-if="currentTab === 'questions' && !!user.authorized"
                    :questions="questionsAnswers"
                    :user="user"
                    :productId="productId">
                </product-tabs-questions>
            </div>
        </div>
    </section>
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
                startTouch:0,
                moveTouch:0,
                scrollDigit: 1,
                currentTab: this.description ? 'features' : 'description',
                lastTabPosition: 0
            }
        },
        methods: {
            showTab(code) {
                if (this.currentTab !== code) {
                    this.currentTab = code;
                }
            },
            scroll(){
                if (window.innerWidth > 767) {
                    this.scrollTop('.product-tabs__tabs', 80);
                } else {
                    this.scrollTop('.product-tabs__tabs', 10);
                } 
                this.showTab('features')
            },
            touchStart(e){
                let tabs = this.$refs.tabs.children
                let lastTab = tabs[tabs.length - 1]
                this.lastTabPosition = lastTab.clientWidth + lastTab.getBoundingClientRect().left
                this.startTouch = e.changedTouches[0].pageX
            },
            
            touchEnd(){
            },
            scrollTabs(e){
                let windowW = window.innerWidth
                if(this.startTouch > e.changedTouches[0].pageX){
                    if(windowW < this.lastTabPosition){
                        if(this.scrollDigit >= this.lastTabPosition - windowW){
                            this.scrollDigit = this.lastTabPosition - windowW
                        }else{
                            this.scrollDigit +=3
                        }
                    }
                }else{
                    if(this.scrollDigit <= 1){
                        this.scrollDigit = 1
                    }else{
                        this.scrollDigit -=3
                    }
                }
                this.$refs.tabs.style.transform = `translateX(-${this.scrollDigit}px)`
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
