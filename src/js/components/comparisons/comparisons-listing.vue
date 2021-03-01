<template>
    <section class="comparisons">
        <div class="container">
            <div class="comparisons__header">
                <h2 class="comparisons__title">{{ $tc('comparisons.title') }}</h2>
                <a class="comparisons__delete-all" v-if="comparingItems.length > 0"
                    @click="deleteAll"
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
        <div class="container" v-else>
            <div>{{ $tc('comparisons.is_empty') }}</div>
            <a :href="catalogLink" class="profile__catalogue-btn">{{ $tc('button.move_to_catalog') }}</a>
        </div>
        
    </section>
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
                comparingItems: [],
            }
        },
        
        computed: {
            comparisons() {
                return this.$store.state.listing.comparisons.filter(item => item.is_favorite === true)
            },
        },

        methods: {
            deleteAll() {
                this.comparingItems.splice(0, this.comparingItems.length)
            }
        },
        
        mounted () {
            this.$store.dispatch('comparisonsUpdateProducts');
            let vm = this
            setTimeout(function () {
                vm.comparingItems = vm.comparisons
                console.log(vm.comparingItems)
            }, 300)
            
        }

    }
</script>

<style>

</style>