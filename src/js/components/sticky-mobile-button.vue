<template>
    <div class="sticky-mobile-button" v-if="showButton">
        <a href="" class="sticky-mobile-button__button">{{ titlePartFirst }} <span>{{ items }}&nbsp;{{ titlePartSecond }}</span></a>
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
        }
    },
    created() {
        this.$eventBus.$on("sow-button", this.sowButton);
        this.$eventBus.$on("hide-button", this.hideButton);
    },
    methods:{
        sowButton(firstPart, items, secondPart) {
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