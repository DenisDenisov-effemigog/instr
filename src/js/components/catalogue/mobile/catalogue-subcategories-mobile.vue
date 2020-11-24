<template>
    <ul class="catalogue__categories">
        <li class="catalogue__category" v-for="subcategory in subcategories">
            <a href="#" class="catalogue__subcategory-link_mobile" v-if="!furtherSubcategory">
                {{subcategory.title}}
                <svg class="" viewBox="0 0 6 10">
                    <use :xlink:href="'./images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </a>
            <further-subcategories-mobile :categories="subcategory.categories" v-else></further-subcategories-mobile>
        </li>
        <div class="catalogue__button">Показать {{items}}&nbsp;товаров</div>
    </ul>
</template>

<script>
    import furtherSubcategoriesMobile from './catalogue-further-subcategories-mobile.vue';

    export default {
        name: "catalogue-subcategories-mobile",
        data() {
            return {
                furtherSubcategory: false,
                items: 0
            }
        },
        props: {
            categories: {
                type: Array,
                default: () => ({}),
                required: true
            }
        },
        components: {
            furtherSubcategoriesMobile
        },
        computed: {
            subcategories() {
                return this.categories
            }
        }
    }
</script>
