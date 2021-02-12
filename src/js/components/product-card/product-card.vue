<template>
    <div v-if="loaded">
        <slot></slot>
    </div>
    <div v-else class="preloader">
        <svg viewBox="0 0 145 145">
            <use :xlink:href="templatePath + 'images/sprite.svg#preloader'"></use>
        </svg>
        <div class="preloader__loading preloader__loading--first"></div>
        <div class="preloader__loading preloader__loading--second"></div>
    </div>
</template>

<script>
    export default {
        name: 'product-card',
        data() {
            return {
                loaded: false
            }
        },
        methods: {
            loading(){
                let vm = this
                setTimeout(function () {
                    vm.loaded = true
                }, 1000)
            },
        },
        created() {
            this.loading()
        }
    }
</script>

<style>

</style>