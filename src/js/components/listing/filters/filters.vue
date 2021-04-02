<template>
    <div class="filters">
        <template v-for="(filter, index) in internal.filters">
            <filter-block v-model="internal.filters[index]" 
                :key="filter.code" 
                @change="onFiltersChange" 
                :collapsed="filter.type !== 'switch' && index > 2"
            >
            </filter-block>
        </template>
        <filter-clear-btn></filter-clear-btn>
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
                internal: {
                    page_count: 0,
                    filters: [],
                    match: 0,
                    hash: '',
                    sort: '',
                    view: '',
                    сategories: '',
                    only_diff: ''
                },
                _debounce_timer: null,
                page_count: null
            }
        },
        mounted() {
            this.applyExternalData(this.filters);
        },
        computed: {
            emptyPayload() {
                return {
                    filters: {},
                };
            },
            payload() {
                let result = {
                    hash: this.internal.hash,
                    filters: {},
                    params: this.getPayloadParams()
                };

                this.internal.filters.forEach((item, index) => {
                    if (item.type === 'range') {
                        if (item.values.from !== item.values.min || item.values.to !== item.values.max) {
                            result.filters[item.code] = {
                                min: item.values.from,
                                max: item.values.to,
                            };
                        }
                    } else {
                        let vals = [];
                        item.values.forEach((val) => {
                            if (val.checked) {
                                vals.push(val.value);
                            }
                        });
                        if (vals.length > 0) {
                            result.filters[item.code] = vals;
                        }
                    }
                });
                return result;
            },
        },
        created() {
          this.$eventBus.$on('clear-filters', this.clearFilters)  
          this.$eventBus.$on('add-sorting', this.changeSort)  
          this.$eventBus.$on('changed-view', this.changeView)  
          this.$eventBus.$on('load-listing', this.loadListing)  
          this.$eventBus.$on('changed-category', this.changeCategories)  
        },
        methods: {

            getPayloadParams() {
                return {
                    sort: this.internal.sort,
                    view: this.internal.view,
                    сategories: this.internal.сategories,
                    page_count: this.internal.page_count
                }
            },

            applyExternalData(data, add) {
                let vm = this;

                if(!add) {
                    this.internal.sort = data.sort;
                    this.internal.view = data.view;
                    this.internal.сategories = data.сategories;
                    this.internal.page_count = data.page_count;
                    this.page_count = data.page_count;
                }

                this.internal.hash = data.hash;
                this.internal.match = data.match;
                
                let filters = data.filters;
                if (!!filters) {
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
                }

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
                            }
                        }
                    });
                }

                this.internal.filters = filters;
            },

            clearFilters() {
                let vm = this;
                api.listingFilter(this.internal.hash, vm.emptyPayload).then((newFilters) => {
                    vm.applyExternalData(newFilters, true);
                    this.applyFilters(true);
                });
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
            },
            
            lookupFilters() {
                let vm = this;
                if(Object.keys(vm.payload.filters).length){
                    this.$eventBus.$emit('show-clear-filters-btn', true)
                } else {
                    this.$eventBus.$emit('show-clear-filters-btn', false)
                }
                api.listingFilter(vm.payload.hash, vm.payload.filters).then((newFilters) => {
                    newFilters.filters = vm.internal.filters
                    vm.applyExternalData(newFilters, true);
                    this.applyFilters(true);
                }).catch(errors => {
                    console.error(errors);
                });
            },

            applyFilters(changeState, location) {
                let vm = this;
                let params = vm.getPayloadParams();

                api.catalogGet(this.internal.hash, params).then(answer => {
                    console.log(answer);
                    if (!!location && location === 'comparison') {
                        vm.$eventBus.$emit('apply-comparison', answer.output);
                    } else if (!!location && location === 'loadListing') {
                        
                    } else {
                        vm.$eventBus.$emit('apply-listing', answer.output);
                    }
                    if (changeState) {
                        window.history.pushState({
                            output: answer.output
                        }, '', answer.url);

                        if (window.innerWidth > 767) {
                            this.scrollTop('.listing', 130);
                        } else {
                            this.scrollTop('.listing', 50);
                        }
                    }
                }).catch(errors => {
                    console.error(errors);
                });
            },
            changeSort(value) {
                this.internal.sort = value;
                this.applyFilters(false);
            },
            changeCategories(value, location) {
                this.internal.сategories = value;
                this.applyFilters(false, location);
            },
            changeView(value) {
                this.internal.view = value;
                let params = this.getPayloadParams();
                api.catalogUpdate(this.internal.hash, params).then(() => {
                }).catch(errors => {
                    console.error(errors);
                });
            },
            loadListing(page){
                this.page_count = this.page_count + this.filters.page_count;
                this.internal.page_count = this.page_count;
                this.applyFilters(false);
                api.goToPage(this.internal.hash, page).then((answer) => {
                }).catch(errors => {
                    console.log(errors);
                });
                this.internal.page_count = this.filters.page_count;
                this.applyFilters(false, 'loadListing');
            },
        },
    }
</script>