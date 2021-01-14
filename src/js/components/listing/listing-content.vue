<template>
    <div class="listing__grid"
         :class="{'listing__grid--horiz': activeDisplaying === 'horizview'}">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        name: "listing-content",
        computed: {
            activeDisplaying() {
                return this.$store.state.listing.view_mode
            },
        },
    }
</script>