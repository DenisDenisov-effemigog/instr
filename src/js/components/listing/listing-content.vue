<template>
    <div class="listing__grid"
         :class="{'listing__grid--horiz': activeDisplaying === 'horizview'}">
        <div v-if="content !== null">{{ content }}</div>
        <slot v-else></slot>
        {{ output }}
    </div>
</template>

<script>
    export default {
        name: "listing-content",
        data() {
            return {
                output: null,
                content: null,
            };
        },
        computed: {
            activeDisplaying() {
                return this.$store.state.listing.view_mode
            },
        },
        created() {
            this.$eventBus.$on('load-listing', this.loadListing);
            this.$eventBus.$on('apply-listing', this.applyListing);
        },
        beforeDestroy() {
            this.$eventBus.$off('load-listing');
            this.$eventBus.$off('apply-listing');
        },
        methods: {
            loadListing(contents) {
                this.output = contents;
            },
            applyListing(contents) {
                this.content = contents;
            },
        },
    }
</script>