<template>
    <span class="listing__items-cont">{{ itemsQuantity }} {{ $tc(text.product) }}{{ ending(itemsQuantity) }}</span>
</template>

<script>
    export default {
        name: "listing-items-quantity",
        props: {
            itemsQuantity: {
                type: String,
                required: true
            },
        },
    }
</script>