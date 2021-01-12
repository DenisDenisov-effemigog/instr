<template>
    <div class="filter-section">
        <template v-for="(filter, index) in filters.filters">
            <filter-block :filter="filter"></filter-block>
        </template>
        <!--TODO сделать кнопку сброса фильтров-->
    </div>
</template>

<script>
    import filterBlock from './filter-block.vue';
    export default {
        name: "filters",
        components: {
            filterBlock
        },
        props: {
            filters: {
                type: Object,
                required: true
            },
        },
        data(){
            return{
            }
        },
        methods:{
        },
    }
</script>