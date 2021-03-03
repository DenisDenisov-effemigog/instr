<template>
    <div class="finance__layout">
        <h4 class="finance__subtitle">{{ $tc('profile_finance.title.product_limit') }}</h4>
        <div class="columns">
            <div class="finance__progress-bar finance__progress-bar--limit">
                <component is="finance-progress"
                           :finance="financeCharges.statistic"
                           :financeCharges="financeCharges.charges"
                           :financeSchedule="financeCharges.schedule"
                           :dashboard="false"
                           :productLimit="true"
                           :contract="contract"
                ></component>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'product-limit',
        props: {
            financeCharges: {
                type: Object
            },
            contract: {
                required: true
            }
        },
    }
</script>

<style>

</style>