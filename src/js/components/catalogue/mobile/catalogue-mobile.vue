<template>
    <div class="catalogue_mobile">
        <div class="container">
            <div class="breadcrumbs" v-if="subcategory" @click="goBack">
                <svg class="breadcrumbs__array">
                    <use :xlink:href="'./images/sprite.svg#arrows__arr-long-left'"></use>
                </svg>
                <span>Назад</span>
            </div>
            <h3 class="catalogue__title">{{title}}</h3>
            <ul class="catalogue__categories">
                <li class="catalogue__category" v-for="category in allCategories" @click="openSubcategory(category.title)">
                    <a href="#" class="catalogue__category-link" v-if="!subcategory" >
                        {{category.title}}
                        <svg class="" viewBox="0 0 6 10">
                            <use :xlink:href="'./images/sprite.svg#arrows__arrow-right'"></use>
                        </svg>
                    </a>
                    <catalogue-subcategories-mobile :categories="category.subcategories" v-else></catalogue-subcategories-mobile>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import catalogueSubcategoriesMobile from './catalogue-subcategories-mobile.vue'

    export default {
        name: 'catalogue-mobile',
        data() {
            return {
                title: 'Каталог',
                subcategory: false
            }
        },
        components: {
            catalogueSubcategoriesMobile,
        },
        props: {
            categories: {
                type: Array,
                default: () => ({}),
                required: true
            }
        },
        computed: {
            allCategories() {
                return this.categories
            },
        },
        methods: {
            goBack() {
                this.subcategory = false,
                this.title = 'Каталог'
            },
            openSubcategory(title) {
                this.subcategory = true;
                this.title = title
            }
        }
    }
</script>