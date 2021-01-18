<template>
    <div class="listing__pagination-btn"
         @click="loadMore"
    >Загрузить еще</div>
</template>

<script>
    import * as Api from '../../api';
    
    let api = Api.getInstance();

    export default {
        name: "pagination-btn",
        data(){
            return {
            }
        },
        methods:{
            loadMore() {
                let vm = this;
                api.getMoreListing().then(answer => {
                    vm.$eventBus.$emit('load-listing', answer.content);
                });
            },
        },
    }
</script>