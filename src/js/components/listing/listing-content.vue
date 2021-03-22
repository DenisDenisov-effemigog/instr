<template>
    <div v-if="loaded">
        <div class="listing__grid"
             :class="{'listing__grid--horiz': activeDisplaying === 'horizview'}">
            <template v-if="content !== null">
                <div class="listing__card" v-for="product in content.products"
                    :key="product.id"
                >
                    <card
                        :change-icon="false"
                        :card-grid="'grid'"
                        :product="product"
                    >
                        <template v-slot:code>
                            <div class="card__code">{{ product.code }}</div>
                        </template>
                        <template v-slot:description>
                            <a :href="product.link" class="card__name">
                                {{ product.title }}
                            </a>
                        </template>
                        <template v-slot:price>
                            <div class="card__price-block">
                                <div class="card__old-price">{{ currency(product.oldPrice) }} {{ $tc('text.currency') }}</div>
                                <div class="card__current-price">{{ currency(product.newPrice) }} {{ $tc('text.currency') }}</div>
                            </div>
                        </template>
                    </card>
                </div>
            </template>
            <slot v-else></slot>
        </div>
        <div class="listing__pagination" v-if="internalPagination.current">
            <component is="pagination-btn"
                :hash="hash" 
                :currentPage="internalPagination.current"
            ></component>
            <component 
                is="pagination"
                :pagination="internalPagination"
                :hash="hash"
            >
            </component>
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
    export default {
        name: "listing-content",
        props: {
            pagination: {
                required: true,
                type: Object
            },
            hash: {
                required: true,
                type: String
            },
            pageMask: {
                required: true,
                type: String
            },
        },
        data() {
            return {
                loaded: false,
                content: null,
                internalPagination: {},
            };
        },
        mounted() {
            this.internalPagination = this.pagination;
        },
        computed: {
            activeDisplaying() {
                return this.$store.state.listing.view_mode
            },
        },
        created() {
            this.loading()
            this.$eventBus.$on('apply-listing', this.applyListing);
        },
        beforeDestroy() {
            this.$eventBus.$off('apply-listing');
        },
        methods: {
            loading(){
                let vm = this
                setTimeout(function () {
                    vm.loaded = true
                }, 500)
            },
            applyListing(contents) {
                this.content = contents;
                if(contents.pagination) {
                    this.internalPagination = contents.pagination;
                }
            },
        },
    }
</script>