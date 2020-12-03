<template>
    <div class="sticky-mobile-button" v-if="showButton">
        <a href="" class="sticky-mobile-button__button">Показать <span>{{ items }}&nbsp;товаров</span></a>
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
        }
    },
    created() {
        this.$eventBus.$on("sow-button", this.sowButton);
        this.$eventBus.$on("hide-button", this.hideButton);
    },
    methods:{
        sowButton(items) {
            this.showButton = true
            this.items = items
        },
        hideButton() {
            this.showButton = false
        }
    },
}
</script>