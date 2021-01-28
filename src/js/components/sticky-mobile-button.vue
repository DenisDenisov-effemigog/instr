<template>
    <div class="sticky-mobile-button" v-if="showButton">
        <div class="sticky-mobile-button__bg"></div>
        <div class="sticky-mobile-button__button"
             :class="{'sticky-mobile-button__button--disabled': disabled}"
        >
            <a v-if="linkUrl=='#'" href="#" @click="closeFilter">
                {{ $tc(titlePartFirst) }} <span class="sticky-mobile-button__text-scnd">{{ items }}&nbsp;{{ $tc(titlePartSecond) }}{{ ends }}</span>
            </a>
            <a v-else :href="linkUrl" >
                {{ $tc(titlePartFirst) }} <span class="sticky-mobile-button__text-scnd">{{ items }}&nbsp;{{ $tc(titlePartSecond) }}{{ ends }}</span>
            </a>
        </div>
    </div>
    
</template>

<script>
export default {
    name: "sticky-mobile-button",
    props: {
    },
    data(){
        return{
            showButton: false,
            items: 0,
            titlePartFirst: '',
            titlePartSecond: '',
            disabled: false,
            linkUrl:'#'
        }
    },
    created() {
        this.$eventBus.$on("sow-button", this.sowButton);
        this.$eventBus.$on("hide-button", this.hideButton);
    },
    methods:{
        sowButton(firstPart, items, secondPart, url = '#') {
            this.showButton = true;
            this.linkUrl = url
            this.disabled = false;
            this.items = items //передаём количество товаров   
            this.titlePartFirst = firstPart //передаём текст кнопки, который пишется в первом ряду
            this.titlePartSecond = secondPart //передаём текст кнопки, который пишется во втором ряду
            if (this.items === 0) {
                this.disabled = true
            }
        },
        hideButton() {
            this.showButton = false
            this.items = 0
            this.titlePartFirst = ''
            this.titlePartSecond = ''
            this.disabled = false
        },
        closeFilter(){

        }
    },
    computed: {
        ends() {
            return this.ending(this.items)
        }
    }
}
</script>