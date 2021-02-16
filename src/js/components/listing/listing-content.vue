<template>
    <div v-if="loaded">
        <div class="listing__grid"
             :class="{'listing__grid--horiz': activeDisplaying === 'horizview'}">
            <template v-if="content !== null">
                <div class="listing__card" v-for="product in content.products">
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
                                <div class="card__old-price">{{ product.oldPrice }} {{ $tc('text.currency') }}</div>
                                <div class="card__current-price">{{ product.newPrice }} {{ $tc('text.currency') }}</div>
                            </div>
                        </template>
                    </card>
                </div>
            </template>
            <slot v-else></slot>
        </div>
        <div class="listing__pagination" v-if="internalPagination.current">
            <component is="pagination-btn"></component>
            <div class="pagination">
                <a  :href="internalPagination.url_previous" 
                    class="pagination__arrow pagination__arrow-prev"
                    @click.prevent="goToPage(internalPagination.current - 1)"
                ><!--TODO задизеблить кнопку, если активна первая страница-->
                    <svg>
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
                    </svg>
                </a>
                <ul class="pagination__list">
                    <li class="pagination__item"
                        v-for="link in internalPagination.urls"
                        :class="{'pagination__item--current': internalPagination.current == link.title}"
                    >
                        <a :href="link.url" 
                           class="pagination__link"
                           @click.prevent="goToPage(link.title)"
                        >{{ link.title }}</a>
                    </li>
                    <li class="pagination__item pagination__item--dots">
                        <div class="pagination__link">...</div>
                    </li>
                    <li class="pagination__item"
                        :class="{'pagination__item--current': internalPagination.current == internalPagination.total}"
                    >
                        <a :href="internalPagination.url_last" 
                           class="pagination__link"
                           @click.prevent="goToPage(internalPagination.total)"
                        >{{ internalPagination.total }}</a>
                    </li>
                </ul>
                <a  :href="internalPagination.url_next" 
                    class="pagination__arrow pagination__arrow_next"
                    @click.prevent="goToPage(internalPagination.current + 1)"
                ><!--TODO задизеблить кнопку, если активна последняя страница-->
                    <svg>
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </div>
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
    import * as Api from '../../api';

    let api = Api.getInstance();
    
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
            }  
        },
        data() {
            return {
                loaded: false,
                content: null,
                internalPagination: {}
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
            goToPage(page) {
                let vm = this
                api.goToPage(this.hash, page).then((answer) => {
                    vm.applyListing(answer.output);
                    window.scroll({ top: document.querySelector('body').offsetTop, behavior: 'smooth'})
                }).catch(errors => {
                    console.error(errors);
                });
            }
        },
    }
</script>