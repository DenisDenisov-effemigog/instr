<template>
    <div class="listing__pagination-btn"
         @click="loadMore"
    >{{ $tc('link.load_more') }}</div>
</template>

<script>
    export default {
        name: "pagination-btn",
        data(){
            return {
            }
        },
        methods:{
            loadMore() {
                let vm = this;
                vm.$eventBus.$emit('load-listing');
                window.scroll({ top: document.querySelector('body').offsetTop, behavior: 'smooth'})
            },
        },
    }
</script>