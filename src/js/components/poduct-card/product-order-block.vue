<template>
    <div ref="productOrderBlock">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name:"product-order-block",
    props: {
    },
    data(){
        return{
        }
    },
    methods:{
    },
    mounted() {
        let productOrderBlock = this.$refs.productOrderBlock
        let productOrderPosition = productOrderBlock.offsetTop + productOrderBlock.clientHeight
        this.$eventBus.$emit('productOrderBlockPosition', productOrderPosition)
    }
}
</script>