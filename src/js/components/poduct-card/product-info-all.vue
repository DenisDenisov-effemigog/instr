<template>
    <div @click="click" class="product-info__all">Все характеристики</div>
</template>

<script>
export default {
    name: 'product-info-all',
    methods:{
        click(){
            this.$eventBus.$emit("click")
        }
    }
}
</script>