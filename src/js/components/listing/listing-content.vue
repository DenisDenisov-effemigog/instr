<template>
    <div class="listing__grid"
         :class="{'listing__grid--horiz': activeDisplaying === 'horizview'}">
        <slot></slot>
        {{ output }}
    </div>
</template>

<script>
    export default {
        name: "listing-content",
        data() {
            return {
                output: null,
            };
        },
        computed: {
            activeDisplaying() {
                return this.$store.state.listing.view_mode
            },
        },
        created() {
            this.$eventBus.$on('apply-listing', this.applyListing);
        },
        beforeDestroy() {
            this.$eventBus.$off('apply-listing');
        },
        methods: {
            applyListing(contents) {
                this.output = contents;
            },
        },
    }
</script>