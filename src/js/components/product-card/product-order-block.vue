<template>
    <div ref="productOrderBlock" class="product-order__wrapper">
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
            this.productOrderPosition = 0
            this.productOrderPosition = this.$refs.productOrderBlock.offsetTop + this.$refs.productOrderBlock.clientHeight
        }else{
            this.productOrderPosition = 0
            this.productOrderPosition = this.$refs.productOrderBlock.offsetTop + this.$refs.productOrderBlock.clientHeight
        }
        this.$eventBus.$emit('productOrderBlockPosition', this.productOrderPosition)
    },
    methods:{
        resizeWidth(){
            if(window.innerWidth < 768){
                this.productOrderPosition = 0
                this.productOrderPosition = this.$refs.productOrderBlock.offsetTop + this.$refs.productOrderBlock.clientHeight
            }else{
                this.productOrderPosition = 0
                this.productOrderPosition = this.$refs.productOrderBlock.offsetTop + this.$refs.productOrderBlock.clientHeight
            }
            this.$eventBus.$emit('productOrderBlockPosition', this.productOrderPosition)
        }
    },
    created() {
        window.addEventListener('resize', this.resizeWidth);
    },
}
</script>