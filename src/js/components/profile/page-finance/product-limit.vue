<template>
    <div class="finance__layout">
        <h4 class="finance__subtitle">{{ $tc('profile_finance.title.product_limit') }}</h4>
        <div class="columns">
            <div class="finance__progress-bar finance__progress-bar--limit">
                <component is="finance-progress" 
                    :financeCharges="financeCharges"
                    :dashboard="false"
                    :productLimit="true"
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
                type: Array
            }
        },
    }
</script>

<style>

</style>