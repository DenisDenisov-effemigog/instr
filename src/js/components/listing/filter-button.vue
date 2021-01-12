<template>
    <div class="filter-button" @click="openModal">
        filters
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
                this.$eventBus.$emit("sow-button", 'Посмотреть', 8, 'товар');
                /*TODO в компоненте catalogue-mobile есть функция окончаний, сделать её глобальной и вызвать тут + передать кол-во итемов*/
            },
        },
    }
</script>