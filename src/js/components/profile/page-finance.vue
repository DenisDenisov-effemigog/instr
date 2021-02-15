<template>
    <div class="finance">
        <h2 class="profile__title">{{ $tc('link.finance') }}</h2>
        <operation-history></operation-history>
    </div>
</template>

<script>
    import operationHistory from './page-finance/operation-history.vue';

    export default {
        name:"page-finance",
        components: { operationHistory},
        mounted() {
            this.$eventBus.$emit('hideMenu')
        }
    }
</script>