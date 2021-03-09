<template>
    <div class="comparisons__top" :class="{'comparisons__top--fixed': fixed}">
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sticky-comparisons-top',
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
                windowPosition > this.scrollOffset ? this.fixed = true : this.fixed = false
            },
            getPosition() {
                let element = this.$el;
                let bottomElement = document.querySelector('.comparisons__bottom');
                let yPosition = 0;
                while(bottomElement) {
                    yPosition += (bottomElement.offsetTop - bottomElement.scrollTop + bottomElement.clientTop);
                    bottomElement = bottomElement.offsetParent;
                }
                this.scrollOffset = yPosition - element.offsetHeight
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