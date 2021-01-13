<template>
    <div class="filter-section">
        <template v-for="(filter, index) in filters.filters">
            <filter-block :filter="filter" :collapsed="index > 2"></filter-block>
        </template>
        <filter-clear-btn></filter-clear-btn>
    </div>
</template>

<script>
    import filterBlock from './filter-block.vue';
import FilterClearBtn from './filter-clear-btn.vue';
    export default {
        name: "filters",
        components: {
            filterBlock,
                FilterClearBtn
        },
        props: {
            filters: {
                type: Object,
                required: true
            },
        },
        data(){
            return {
                internalView: 'gridview',
            }
        },
        created() {
            // this.$eventBus.$on(config.bus.applyView, this.applyView);
        },
        beforeDestroy() {
            this.$eventBus.$off(config.bus.applyView);
        },
        methods:{
            applyFilters(changeState) {
                let vm = this;
                let params = vm.getPayloadParams();

                vm.dirty = false;

                api.listingContents(this.internal.hash, params).then(answer => {

                    let contents = base64.decode(answer.output);
                    vm.$eventBus.$emit(config.bus.applyListing, contents);
                    if(changeState) {
                        /*window.history.pushState({ пока пришло false
                            output: contents
                        },'', answer.url);

                        this.toggleBodyClass('page_sort-modal-closed', true);
                        setTimeout(() => {
                            this.toggleBodyClass('page_filter-modal-shown', false);
                            this.toggleBodyClass('page_sort-modal-closed', false);
                            document.querySelector('html').style.overflow = 'auto';
                        }, 300)

                        this.scrollTop('.breadcrumbs');*/
                    }
                });
            },
            applyView(value) {
                this.internalView = value;
                this.applyFilters(false);
            },
        },
    }
</script>