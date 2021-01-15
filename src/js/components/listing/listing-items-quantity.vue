<template>
    <span class="listing__items-cont">{{ itemsQuantity }} товар{{ ending(itemsQuantity) }}</span>
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