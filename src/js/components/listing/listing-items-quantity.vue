<template>
    <span class="listing__items-cont">{{ currency(quantity) }} {{ $tc('text.product', itemsQuantity) }}</span>
</template>

<script>
    export default {
        name: "listing-items-quantity",
        props: {
            itemsQuantity: {
                type: Number,
                required: true
            },
        },
        data(){
            return{
                quantity: this.itemsQuantity
            }
        },
        created(){
            this.$eventBus.$on('filter-match', this.quantityMatch);
        },
        methods:{
            quantityMatch(content){
                this.quantity = content
            }
        }
    }
</script>