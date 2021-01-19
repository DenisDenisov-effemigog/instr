<template>
    <div class="filter-button" @click="openModal">
        <svg class="filter-button__icon">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__filter'"></use>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "filter-button",
        components: {
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
            openModal(){
                this.$eventBus.$emit("openModal", 'filters', this.filters, false, true);
                this.$eventBus.$emit("sow-button", 'Посмотреть', this.filters.match, 'товар' + this.ending(this.filters.match));
            },
        },
    }
</script>