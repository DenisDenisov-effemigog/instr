<template>
    <div class="filters">
        <template v-for="(filter, index) in internal.filters">
            <filter-block v-model="internal.filters[index]" :key="filter.code" @change="onFiltersChange" :collapsed="index > 3"></filter-block>
        </template>
        <filter-clear-btn v-if="dirty"></filter-clear-btn>
    </div>
</template>

<script>
    import filterBlock from './filter-block.vue';
    import FilterClearBtn from './filter-clear-btn.vue';
    import * as Api from '../../../api';

    let api = Api.getInstance();
    
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
                dirty: false,
                internal: {
                    filters: []
                },
                _debounce_timer: null
            }
        },
        mounted() {
            this.applyExternalData(this.filters);
        },
        created() {
          this.$eventBus.$on('clear-filters', this.clearFilters)  
        },
        methods: {

            applyExternalData(data, add) {
                let vm = this;
                
                let filters = data.filters;
                filters.forEach((item, index) => {
                    if (item.type === 'range') {
                        if (!('from' in item.values)) {
                            filters[index].values.from = item.values.min;
                        }
                        if (!('to' in item.values)) {
                            filters[index].values.to = item.values.max;
                        }

                        if(item.title.toLowerCase().includes('price')) {
                            filters[index].is_price = true;
                        }
                    }
                });

                if(add) {
                    filters.forEach((item, index) => {
                        if(item.type === 'range') {
                            let oldFilter = vm.internal.filters.find(element => element.code === item.code);
                            if(oldFilter) {
                                if(oldFilter.values.min < item.values.min) {
                                    item.values.min = oldFilter.values.min;
                                }
                                if(oldFilter.values.max > item.values.max) {
                                    item.values.max = oldFilter.values.max;
                                }
                                filters[index].min = item.values.min;
                                filters[index].max = item.values.max;
                            }
                        }
                    });
                }

                this.internal.filters = filters;
                this.checkFiltersApplied();
            },

            checkFiltersApplied() {
                let filtersApplied = false;
                this.internal.filters.every((filter) => {
                    if (filter.type === 'range') {
                        if (filter.values.min !== filter.values.from || filter.values.max !== filter.values.to) {
                            filtersApplied = true;
                            return false;
                        }
                    } else if (filter.type === 'checkbox') {
                        filter.values.every((value) => {
                            if (value.checked) {
                                filtersApplied = true;
                                return false;
                            }
                        });
                        if (filtersApplied) {
                            return false;
                        }
                    }
                    return true;
                });
            },

            clearFilters() {
                this.dirty = false;
                /*TODO очистить фильтры*/
            },

            onFiltersChange() {
                let vm = this;
                if (vm._debounce_timer) {
                    clearTimeout(vm._debounce_timer);
                    vm._debounce_timer = null;
                }
                this._debounce_timer = setTimeout(function () {
                    vm.lookupFilters();
                }, 300);
                // this.scrollTop('.filter-modal')
            },
            
            lookupFilters() {
                let vm = this;
                
                api.listingFilter(this.payload).then((newFilters) => {
                    vm.applyExternalData(newFilters, true);
                    vm.dirty = true;
                    window.dispatchEvent(new Event('click'));
                    /*TODO подгрузить новый листинг*/
                });
            },
        },
    }
</script>