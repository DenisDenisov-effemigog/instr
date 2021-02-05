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
            productOrderPosition: 0
        }
    },
    methods:{
    },
    mounted() {
        if(window.innerWidth < 768){
            this.productOrderPosition = this.$refs.productOrderBlock.getBoundingClientRect().bottom + this.$refs.productOrderBlock.clientHeight + 54 + 64
        }else{
            this.productOrderPosition = productOrderBlock.offsetTop + productOrderBlock.clientHeight
        }
        this.$eventBus.$emit('productOrderBlockPosition', this.productOrderPosition)
    },
    methods:{
        resizeWidth(){
            let productOrderBlock = this.$refs.productOrderBlock
            if(window.innerWidth < 768){
                this.productOrderPosition = this.$refs.productOrderBlock.getBoundingClientRect().bottom + this.$refs.productOrderBlock.clientHeight + 54 + 64
            }else{
                this.productOrderPosition = productOrderBlock.offsetTop + productOrderBlock.clientHeight
            }
            this.$eventBus.$emit('productOrderBlockPosition', this.productOrderPosition)
        }
    },
    created() {
        window.addEventListener('resize', this.resizeWidth);
    },
}
</script>