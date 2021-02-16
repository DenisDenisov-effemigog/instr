<template>
    <div class="filters">
        <template v-for="(filter, index) in internal.filters">
            <filter-block v-model="internal.filters[index]" 
                :key="filter.code" 
                @change="onFiltersChange" 
                :collapsed="filter.type != 'switch' && index > 2"
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
                },
                _debounce_timer: null
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
        },
        methods: {

            getPayloadParams() {
                return {
                    sort: this.internal.sort,
                    view: this.internal.view,
                    page_count: this.internal.page_count
                }
            },

            applyExternalData(data, add) {
                let vm = this;

                if(!add) {
                    this.internal.sort = data.sort;
                    this.internal.view = data.view;
                    this.internal.page_count = data.page_count;
                }

                this.internal.hash = data.hash;
                this.internal.match = data.match;
                
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
                api.listingFilter(this.payload.hash, this.payload.filters).then((newFilters) => {
                    vm.applyExternalData(newFilters, true);
                    this.$eventBus.$emit('show-clear-filters-btn')
                    window.dispatchEvent(new Event('click'));
                    this.applyFilters(true);
                }).catch(errors => {
                    console.error(errors);
                });
            },

            applyFilters(changeState) {
                let vm = this;
                let params = vm.getPayloadParams();

                api.catalogUpdate(this.internal.hash, params).then(() => {
                    api.catalogGet(this.internal.hash, params).then(answer => {

                        vm.$eventBus.$emit('apply-listing', answer.output);
                        if (changeState) {
                            window.history.pushState({
                                output: answer.output
                            }, '', answer.url);

                            if (window.innerWidth > 767) {
                                this.scrollTop('.breadcrumbs');
                            } else {
                                this.scrollTop('.listing__actions');
                            }
                        }
                    }).catch(errors => {
                        console.error(errors);
                    });
                }).catch(errors => {
                    console.error(errors);
                });
            },
            changeSort(value) {
                this.internal.sort = value;
                this.applyFilters(false);
            },
            changeView(value) {
                this.internal.view = value;
                this.applyFilters(false);
            },
            loadListing(){
                this.internal.page_count = this.internal.page_count + this.filters.page_count
                this.applyFilters(false);
            },
            scrollTop(element) {
                let topScroll = document.querySelector(element).offsetTop
                if (window.innerWidth > 767) {
                    topScroll = topScroll - 171
                }
                window.scroll({ top: topScroll, behavior: 'smooth'})
            }
        },
    }
</script>