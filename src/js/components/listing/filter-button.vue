<template>
    <div class="filter-button filter-button--active" @click="openModal">
    <!-- TODO добавление класса .filter-button--active при применении фильтров -->
        <svg class="filter-button__icon filter-button__icon_active">
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
                this.$eventBus.$emit("sow-button", 'Посмотреть', 0, 'товар' + this.ending(0));
                /*TODO передать кол-во итемов*/
            },
        },
    }
</script>