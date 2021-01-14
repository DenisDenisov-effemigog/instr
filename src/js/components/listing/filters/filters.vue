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
            }
        },
        methods:{
        },
    }
</script>