<template>
    <div class="finance" v-if="loaded">
        <div class="finance__header" :class="{'finance__header--download': !!financeDataAll}">
            <h2 class="profile__title">{{ $tc('link.finance') }}</h2>
            <a class="profile__link" :href="financeDataAll.invoice" download  v-if="!!financeDataAll">
                {{ $tc('profile_finance.download') }}
                <svg>
                    <use :xlink:href="templatePath + `images/sprite.svg#icons__download`"></use>
                </svg>
            </a>
        </div>
        <div class="profile__empty-content" v-if="!financeDataAll">
            <p class="finance__text">{{ $tc('profile_finance.empty_text') }}</p>
            <a :href="catalogLink" class="profile__catalogue-btn">{{ $tc('button.move_to_catalog') }}</a>
        </div>
        <div v-else>
            <product-limit :financeCharges="financeDataAll.charges"></product-limit>
            <accounts-payable :financeCharges="financeDataAll.charges"></accounts-payable>
            <finance-charges :financeCharges="financeDataAll.charges" :arrears="true"></finance-charges>
            <finance-charges :financeCharges="financeDataAll.charges"></finance-charges>
            <operation-history :financeHistory="financeDataAll.history"></operation-history>
        </div>
    </div>
    <div v-else class="preloader">
        <svg viewBox="0 0 145 145">
            <use :xlink:href="templatePath + 'images/sprite.svg#preloader'"></use>
        </svg>
        <div class="preloader__loading preloader__loading--first"></div>
        <div class="preloader__loading preloader__loading--second"></div>
    </div>
</template>

<script>
    import productLimit from './page-finance/product-limit.vue'
    import accountsPayable from './page-finance/accounts-payable.vue'
    import financeCharges from './page-finance/finance-charges.vue';
    import operationHistory from './page-finance/operation-history.vue';
    import config from "../../config";

    export default {
        name:"page-finance",
        components: { productLimit, accountsPayable, financeCharges, operationHistory},
        data() {
            return {
                loaded: false,
                catalogLink: config.links.catalog
            }
        },
        methods: {
            loading(){
                let vm = this
                setTimeout(function () {
                    vm.loaded = true
                }, 500)
            },
        },
        created() {
            this.loading()
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