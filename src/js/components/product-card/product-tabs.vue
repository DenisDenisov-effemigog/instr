<template>
    <section class="product-tabs">
        <div class="product-tabs__wrapper">
            <div ref="tabs" class="product-tabs__tabs"
                @touchmove="scrollTabs"
                @touchstart="touchStart"
                @click="clickTabs(currentTab)"
            >
                <div
                    v-if="features"
                    class="product-tabs__tab"
                    :class="{'product-tabs__tab--active': currentTab === 'features'}"
                    @click.prevent="showTab('features')"
                >
                    <div >{{ $tc('product_card.tabs.features') }}</div>
                </div>
                <div
                    v-if="description"
                    class="product-tabs__tab"
                    :class="{'product-tabs__tab--active': currentTab === 'description'}"
                    @click.prevent="showTab('description')"
                >
                    <div >{{ $tc('product_card.tabs.description') }}</div>
                </div>
                <div
                    v-if="questions && !!user.authorized"
                    class="product-tabs__tab"
                    :class="{'product-tabs__tab--active': currentTab === 'questions'}"
                    @click.prevent="showTab('questions')"
                >
                    <div >{{ $tc('product_card.tabs.questions') }}&nbsp;({{questions.length}})</div>
                </div>
            </div>
        </div>
        <div class="container">
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
                moveTouch:0,
                scrollDigit: 1,
                currentTab: this.description ? 'features' : 'description',
                tabsListWidth: 0,
                tabsWidth: 0
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
                let tabs = this.$refs.tabs
                this.startTouch = e.changedTouches[0].pageX
                this.getTabsListCurrentWidth(tabs)
                this.getTabsListExplicitWidth(tabs)
            },
            
            clickTabs(currentTab){
                let vm = this
                if(window.innerWidth < 450){
                    if(currentTab == 'features'){
                        vm.scrollDigit = 0
                    }
                    if(currentTab == 'description'){
                        vm.scrollDigit = Math.round((vm.tabsWidth - vm.tabsListWidth) / 2)
                    }
                    if(currentTab == 'questions'){
                        vm.scrollDigit = Math.round(vm.tabsWidth - vm.tabsListWidth)
                    }
                    
                }else{
                    vm.scrollDigit = 0
                }
                vm.$refs.tabs.style.transform = `translateX(-${vm.scrollDigit}px)`
            },
            scrollTabs(e){
                if(window.innerWidth < 450){
                    let anchor = 15
                    if(this.startTouch > e.changedTouches[0].pageX){
                        this.startTouch = e.changedTouches[0].pageX
                        anchor = Math.round(anchor - (this.tabsWidth - this.tabsListWidth))
                        if(anchor <= this.$refs.tabs.getBoundingClientRect().left){
                            this.scrollDigit += 3
                        }
                    }else{
                        this.startTouch = e.changedTouches[0].pageX
                        if(anchor >= this.$refs.tabs.getBoundingClientRect().left){
                            this.scrollDigit -=3
                        }
                    }
                    this.$refs.tabs.style.transform = `translateX(-${this.scrollDigit}px)`
                }
            },
            getTabsListCurrentWidth(elem){
                const vm = this
                let digit = 0
                elem.children.forEach(function(item){
                        digit += item.getBoundingClientRect().width
                    })
                return vm.tabsWidth = digit
            },
            getTabsListExplicitWidth(elem){
                return this.tabsListWidth = elem.getBoundingClientRect().width
            }
        },
        computed: {
            questionsAnswers() {
                return this.questions
            },
        },
        created(){
            this.$eventBus.$on("click", this.scroll)
        },
    }
</script>
