<template>
    <div class="comparisons__top" :class="{'comparisons__top--fixed': fixed}">
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'comparisons-top',
        data() {
            return {
                fixed: false,
                scrollOffset: 0
            }
        },
        computed: {
        },
        methods: {
            mouseWheel(){
                let windowPosition = window.pageYOffset
                console.log(windowPosition, this.scrollOffset);
                windowPosition > this.scrollOffset ? this.fixed = true : this.fixed = false
            },
            getPosition() {
                let element = this.$el;
                let yPosition = 0;
                while(element) {
                    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                    element = element.offsetParent;
                }
                this.scrollOffset = yPosition
                this.mouseWheel()
                return this.scrollOffset
            }
        },
        created() {
            window.addEventListener('scroll', this.mouseWheel);
            window.addEventListener('resize', this.getPosition);
        },
        mounted() {
            this.getPosition()
        }
    }
</script>

<style>

</style>