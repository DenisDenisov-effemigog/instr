<template>
    <div class="finance">
        <h2 class="profile__title">{{ $tc('link.finance') }}</h2>
        <div class="profile__empty-content" v-if="!financeDataAll">
            <p class="finance__text">{{ $tc('profile_finance.empty_text') }}</p>
            <a href="" class="profile__catalogue-btn">{{ $tc('button.move_to_catalog') }}</a>
        </div>
        <div v-else>
            <operation-history :financeHistory="financeDataAll"></operation-history>
        </div>
    </div>
</template>

<script>
    import operationHistory from './page-finance/operation-history.vue';

    export default {
        name:"page-finance",
        components: { operationHistory},
        data() {
            return {
            }
        },
        mounted() {
            this.$store.dispatch('personalUpdateFinanceData');
            this.$eventBus.$emit('hideMenu')
        },
        computed: {
            financeDataAll() {
                return this.$store.state.personal.financeData;
            },
        }
    }
</script>