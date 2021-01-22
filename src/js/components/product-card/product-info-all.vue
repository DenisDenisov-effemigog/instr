<template>
    <div @click="click" class="product-info__all">{{ $tc('product_card.link.all_specifications') }}</div>
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