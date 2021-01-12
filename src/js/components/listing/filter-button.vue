<template>
    <div class="filter-button">
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
        },
        data(){
            return{
            }
        },
        methods:{
        },
    }
</script>