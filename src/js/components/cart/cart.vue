<template>
    <div class="cart">Реализовать сначала корзину без товаров, потом добавить условие и сверстать табличный вариант корзины
    </div>
</template>

<script>
    export default {
        name: "cart",
        components: {
        },
        props: {
            products: {
                type: Array,
                required: true
            },
        },
        data(){
            return{
            }
        },
        methods:{
        },
    }
</script>