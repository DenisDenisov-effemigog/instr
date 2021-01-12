<template>
    <div class="displaying">
        <div class="displaying__button"
             :class="{'displaying__button--active': activeDisplaying === 'grid'}"
             @click="changeDisplaying('list')"
        >grid</div>
        <div class="displaying__button"
             :class="{'displaying__button--active': activeDisplaying === 'list'}"
             @click="changeDisplaying('grid')"
        >list</div>
    </div>
</template>

<script>
    export default {
        name: "displaying-cards",
        components: {
        },
        props: {
        },
        data(){
            return{
                activeDisplaying: 'grid',
            }
        },
        methods:{
            changeDisplaying(item){
                this.activeDisplaying = item
            },
        },
    }
</script>