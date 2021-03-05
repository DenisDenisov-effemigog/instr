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
                // vm.$eventBus.$emit('load-listing');
                api.goToPage(vm.hash, page).then((answer) => {
                    if (this.placement === '.listing') {
                        vm.$eventBus.$emit('apply-listing', answer.output);
                    } else if (this.placement === '.order__list') {

                    }

                    if (window.innerWidth > 767) {
                        this.scrollTop(this.placement, 130);
                    } else {
                        this.scrollTop(this.placement, 50);
                    }
                }).catch(errors => {
                    console.error(errors);
                });
            },
        },
    }
</script>