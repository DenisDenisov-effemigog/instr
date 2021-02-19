<template>
    <div class="finance__layout">
        <h4 class="finance__subtitle">{{ $tc('profile_finance.title.product_limit') }}</h4>
        <component is="creditor-debt" 
            :financeCharges="financeCharges"
            :dashboard="false"
        ></component>
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