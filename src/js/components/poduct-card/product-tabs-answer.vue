<template>
    <div class="product-tabs__answer-text"
        :class="{'product-tabs__answer-text_expanded': expanded}"
        ref="textBlock"
        v-show="answer">
        <div class="product-tabs__answer-full-text" ref="text">
            {{answer}}
        </div>
        <span class="product-tabs__text-prompt">
            … <span @click="expanded = true">Читать полностью</span>
        </span>
    </div>   
</template>

<script>
    export default {
        props: {
            answer: {
                required: true
            }
        },
        data() {
            return {
                expanded: false
            }
        },
        created() {
            window.addEventListener("resize", this.textHeight);
        },
        destroyed() {
            window.removeEventListener("resize", this.textHeight);
        },
        methods: {
            textHeight(e) {
                if (this.$refs.text.clientHeight <= this.$refs.textBlock.clientHeight) {
                    return this.expanded = true
                }
            }
        },
        mounted() {
            this.textHeight();
        },
    }
</script>
