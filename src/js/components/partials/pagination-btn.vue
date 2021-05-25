<template>
    <div class="listing__pagination-btn-wrap">
        <div v-if="btnLoaded" class="listing__pagination-btn"
        >
            <span>{{ $tc('link.load_more') }}</span> 
            <svg  xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="20px" height="20px" viewBox="0 0 128 128" xml:space="preserve"><g><path d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z" fill="#dc0000"/><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1800ms" repeatCount="indefinite"></animateTransform></g></svg>
        </div>
        <div v-else class="listing__pagination-btn"
            @click="loadMore(currentPage + 1)"
        >
            <span>{{ $tc('link.load_more') }}</span> 
        </div>
    </div>
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
            },
            btnLoaded:{
                type: Boolean,
                required: true
            }
        },
        data(){
            return {
            }
        },
        methods:{
            loadMore(page) {
                console.log(1);
                let vm = this;
                vm.loading()
                vm.$eventBus.$emit('load-listing', page, 'loadMore');
            },
            loading(){
                this.$emit('btnPreload')
            },
            
        },
        created(){
        }
    }
</script>