<template>
    <section class="comparisons" v-if="loaded">
        <div class="container">
            <div class="comparisons__header">
                <h2 class="comparisons__title">{{ $tc('comparisons.title') }}</h2>
                <a class="comparisons__delete-all" v-if="comparingItems.length > 0"
                    @click="clearAll"
                >
                    <svg>
                        <use xlink:href="/images/sprite.svg#icons__delete"></use>
                    </svg>
                    {{ $tc('button.delete-all') }}
                </a>
            </div>
        </div>

        <comparison-content v-if="comparingItems.length > 0"
            :comparingItems="comparingItems"
        ></comparison-content>
        <div class="comparisons__empty" v-else>
            <div class="text-5">{{ $tc('comparisons.is_empty') }}</div>
            <a :href="catalogLink" class="comparisons__catalogue-btn">{{ $tc('button.move_to_catalog') }}</a>
        </div>
        
    </section>

    <div v-else class="preloader">
        <svg viewBox="0 0 145 145">
            <use :xlink:href="templatePath + 'images/sprite.svg#preloader'"></use>
        </svg>
        <div class="preloader__loading preloader__loading--first"></div>
        <div class="preloader__loading preloader__loading--second"></div>
    </div>
</template>

<script>
    import comparisonContent from './partials/comparison-content.vue';
    import config from "../../config";

    export default {
        name: 'comparisons-listing',
        components: { comparisonContent },
        data() {
            return {
                catalogLink: config.links.catalog,
                loaded: false,
            }
        },
        
        computed: {
            comparingItems() {
                return this.$store.state.listing.comparisons.filter(item => item.is_compare === true)
            },
        },

        methods: {
            loading(){
                let vm = this
                setTimeout(function () {
                    vm.loaded = true
                }, 500)
            },
            clearAll() {
                this.$store.dispatch('comparisonsClearAll');
            }
        },

        created() {
            this.loading()
        },
        
        mounted () {
            this.$store.dispatch('comparisonsUpdateProducts');
        }

    }
</script>

<style>

</style>