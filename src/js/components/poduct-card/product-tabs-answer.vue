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
        // methods: {
        //     textHeight() {
        //         if (this.$refs.text.clientHeight <= this.$refs.textBlock.clientHeight) {
        //             console.log(this.$refs.text.clientHeight, this.$refs.textBlock.clientHeight)
        //             this.expanded = true
        //         }
        //     }
        // },
        mounted() {
            this.textHeight;
            window.addEventListener("resize", function(event) {
                this.textHeight
            })
        },
        computed: {
            textHeight() {
                const text = this.$refs.text
                const textBlock = this.$refs.textBlock
                if (text.offsetHeight <= textBlock.clientHeight) {
                    console.log(text.clientHeight, textBlock.clientHeight)
                    return this.expanded = true
                }
            }
        }
    }
</script>
