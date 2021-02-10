<template>
    <span class="listing__items-cont">{{ currency(itemsQuantity) }} {{ $tc('text.product', itemsQuantity) }}</span>
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
    }
</script>