<template>
    <div class="favorites-listing">
        <div class="favorites-listing__header">
            <h1 class="favorites-listing__title">{{ $tc('favorites.title') }}</h1>
            <component is="listing-items-quantity" v-show="favorites.length > 0"
                       :itemsQuantity="itemsQuantity"
            ></component>
            <div v-show="favorites.length > 0" class="favorites-listing__delete-button" @click="clearFavorites">
                <svg><use xlink:href="/images/sprite.svg#icons__del"></use></svg>
                {{ $tc('button.delete-all') }}
            </div>
        </div>
        <div class="favorites-listing__content">
            <div class="favorites-listing__sidebar"  v-if="favorites.length > 0">
                <favorites-listing-category :favoriteCategories="favoriteCategories"></favorites-listing-category>
                <slot name="filters"></slot>
            </div>
            <div class="favorites-listing__products"  v-if="favorites.length > 0">
                <slot name="actions"></slot>
                <component is="listing-content"
                    :pagination="pagination"
                    :hash="hash"
                >
                    <div class="listing__card" v-for="product in favorites" :key="product.id">
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
                </component>
            </div>
            <div class="favorites-listing__empty" v-else>
                <div class="text-5">{{ $tc('favorites.is_empty') }}</div>
                <a :href="catalogLink" class="favorites-listing__catalogue-btn">{{ $tc('button.move_to_catalog') }}</a>
            </div>
        </div>
    </div>
</template>

<script>
import FavoritesListingCategory from './favorites-listing-category.vue';
import config from "../../config";

    export default {
        name: "favorites-listing",
        components: {
             FavoritesListingCategory
        },
        props: {
            favoriteCategories: {
                type: Array,
                required: true
            },
            itemsQuantity: {
                type: Number,
                required: true
            },
            pagination: {
                required: true,
                type: Object
            },
            hash: {
                type: String,
                required: true
            }
        },
        data(){
            return{
                categoryActive: 0,
                catalogLink: config.links.catalog,
            }
        },
        computed: {
            favorites(){
                return this.$store.state.listing.favorites.filter(item => item.is_favorite === true)
            }
        },
        methods:{
            clearFavorites() {
                this.$store.dispatch('favoritesClearAll');
            },
        },
    }
</script>