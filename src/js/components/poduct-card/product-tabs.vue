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
                    Вопросы&nbsp;и&nbsp;ответы&nbsp;({{questions.quantity}})
                </div>
            </div>
            <div class="product-tabs__content">
                <div v-show="currentTab === 'features'" class="product-tabs_content__container">
                    <slot name="features"></slot>
                </div>
                <div v-show="currentTab === 'description'" class="product-tabs_content__container">
                    <slot name="description"></slot>
                </div>
                <div v-show="currentTab === 'questions'">
                    <slot name="questions"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "product-tabs",
        components: {},
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
                    if (window.innerWidth < 768) {
                        this.$el.scrollIntoView({ behavior: 'smooth', block: 'start'})
                    }
                } else {
                    if (window.innerWidth < 768) {
                        this.currentTab = '';
                    }
                }
                window.addEventListener('resize', () => {
                    if (window.innerWidth >= 768) {
                        this.currentTab = code;
                    }
                })
            },
            scroll(){
                this.$refs.tabs.scrollIntoView({block: "center", behavior: "smooth"});
                this.showTab('features')
            }
        },
        created(){
            this.$eventBus.$on("click", this.scroll)
        }
    }
</script>
