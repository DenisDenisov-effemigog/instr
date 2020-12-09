<template>
    <div class="sticky-mobile-button" v-if="showButton">
        <a v-if="flag" href="" class="sticky-mobile-button__button">{{ titlePartFirst }} <span>{{ items }}&nbsp;{{ titlePartSecond }}</span></a>
        <a v-else href="" class="sticky-mobile-button__button">{{ titlePartFirst }}</a>
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
            flag: true
        }
    },
    created() {
        this.$eventBus.$on("sow-button", this.sowButton);
        this.$eventBus.$on("hide-button", this.hideButton);
        this.$eventBus.$on("openStickyButton", this.sowButton);
        this.$eventBus.$on("closeStickyButton", this.hideButton);
    },
    methods:{
        sowButton(firstPart, items, secondPart) {
            if(items || secondPart){
                this.flag = true
            }else{
                this.flag = false
            }
            this.showButton = true
            this.items = items
            this.titlePartFirst = firstPart
            this.titlePartSecond = secondPart
        },
        hideButton() {
            this.showButton = false
        }
    },
}
</script>