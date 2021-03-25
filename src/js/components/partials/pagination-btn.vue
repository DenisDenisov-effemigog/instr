<template>
    <div class="listing__pagination-btn"
         @click="loadMore(currentPage)"
    >{{ $tc('link.load_more') }}</div>
</template>

<script>
    import * as Api from '../../api';
    let api = Api.getInstance();

    export default {
        name: "pagination-btn",
        props:{
            currentPage: {
                type: Number
            },
            hash: {
                type: String
            },
            placement: {
                type: String,
                default: '.listing'
            }
        },
        data(){
            return {
            }
        },
        methods:{
            loadMore(page) {
                let vm = this;
                vm.$eventBus.$emit('load-listing', page);
            },
        },
    }
</script>