<template>
    <div class="favorites-listing">
        <div class="favorites-listing__header">
            <h1 class="favorites-listing__title">{{ $tc('favorites.title') }}</h1>
            <component is="listing-items-quantity"
                       :itemsQuantity="itemsQuantity"
            ></component>
            <div class="favorites-listing__delete-button" @click="deleteFavorites">
                <svg><use xlink:href="/images/sprite.svg#icons__del"></use></svg>
                {{ $tc('button.delete-all') }}
            </div>
        </div>
        <div class="favorites-listing__content">
            <div class="favorites-listing__sidebar">
                <favorites-listing-category :favoriteCategories="favoriteCategories"></favorites-listing-category>
                <slot name="filters"></slot>
            </div>
            <div class="favorites-listing__products">
                <slot name="actions"></slot>
                <component is="listing-content"
                           :pagination="pagination"
                           :hash="hash"
                >
                    <div class="listing__card" v-for="product in favorites">
                        <card
                            :change-icon="false"
                            :card-grid="'grid'"
                            :product="product"
                        ><template v-slot:code>
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
        </div>
    </div>
</template>

<script>
import FavoritesListingCategory from './favorites-listing-category.vue';

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
                favorites: []
            }
        },
        mounted() {
            this.$store.dispatch('favoritesUpdateProducts');
            let vm = this
            setTimeout(function () {
                vm.favorites = vm.products
            }, 300)
        },
        computed: {
            products(){
                return this.$store.state.listing.favorites.filter(item => item.is_favorite === true)
            }
        },
        created() {
            this.$eventBus.$on('change-favorite', this.changeFav)
        },
        methods:{
            changeCategory(index) {
                this.categoryActive = index
                /*TODO api change cat*/
            },
            deleteFavorites() {
                /*TODO api for delete*/
            },
            changeFav() {
                this.favorites = this.$store.state.listing.favorites.filter(item => item.is_favorite === true)
                /*todo динамика отображения в избранном реализована немного не правильно. Обговорить с бэком и сделать по аналогии с товарами в корзине*/
            }
        },
    }
</script>