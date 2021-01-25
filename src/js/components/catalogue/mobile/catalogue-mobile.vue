<template>
    <div class="catalogue_mobile">
        <div class="container">
            <div class="catalogue_mobile__close" @click="closeCategory">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
            </div>
            <div 
                class="breadcrumbs" 
                v-if="subcategory || subcategories" 
                @click="goBack"
            >
                <svg class="breadcrumbs__back" viewBox="0 0 18 15">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
                </svg>
                <span>{{ $tc('link.back') }}</span>
            </div>
            <h3 class="catalogue__title">{{ $tc(title)}}</h3>
            <ul class="catalogue__categories" v-if="!subcategory && !subcategories">
                <li 
                    class="catalogue__category" 
                    v-for="category in allCategories" 
                    @click="openSubcategory(category)"
                >
                    <a href="#" class="catalogue__category-link">
                        {{category.title}}
                        <svg class="" viewBox="0 0 6 10">
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                        </svg>
                    </a>
                </li>
            </ul>
            <ul class="catalogue__categories" v-if="!subcategories">
                <li 
                    class="catalogue__category" 
                    v-for="subcategory in currentCategory.subcategories"
                    @click="openSubSubcategory(subcategory)"
                >
                    <a href="#" class="catalogue__subcategory-link_mobile">
                        {{subcategory.title}}
                        <svg class="" viewBox="0 0 6 10">
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                        </svg>
                    </a>
                </li>
            </ul>
            <ul class="catalogue__further-subcategories" v-if="subcategories">
                <li 
                    v-for="category in currentSubategory.subcategories"
                    @click="selectCategory(category.title)"
                >
                    <a 
                        href="#" 
                        class="catalogue__further-subcategory"
                        :class="{'catalogue__further-subcategory_active': selectedCategory === category.title}"
                    >{{category.title}}</a>
                    <svg v-if="selectedCategory === category.title">
                        <use :xlink:href="templatePath + 'images/sprite.svg#check'"></use>
                    </svg>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'catalogue-mobile',
        data() {
            return {
                title: 'header.catalogue',
                prevTitle: '',
                subcategory: false,
                subcategories: false,
                currentCategory: false,
                currentSubategory: false,
                selectedCategory: '',
                items:1010
            }
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
                if (this.subcategory) {
                    this.subcategory = false;
                    this.title = 'header.catalogue';
                    this.currentCategory = false;
                    this.$eventBus.$emit("hide-button");
                } else {
                    this.subcategories = false;
                    this.subcategory = true;
                    this.title = this.prevTitle;
                    this.currentSubategory = false;
                    this.$eventBus.$emit("sow-button", 'text.show', 2, 'text.product');
                }
            },
            openSubcategory(item) {
                this.subcategory = true;
                this.title = item.title;
                this.prevTitle = this.title;
                this.currentCategory = item;
                this.$eventBus.$emit("sow-button", 'text.show', item.subcategories.length, 'text.product');
            },
            openSubSubcategory(item) {
                this.subcategories = true;
                this.subcategory = false;
                this.title = item.title;
                this.currentSubategory = item;
                this.$eventBus.$emit("sow-button", 'text.show', item.subcategories.length, 'text.product');
            },
            selectCategory(category) {
                this.selectedCategory = category;
                this.$eventBus.$emit("sow-button", 'text.show', 1, 'text.product');
            },
            closeCategory() {
                this.$eventBus.$emit('toggle-catalog', false); //закрываем мобильный каталог
                this.$eventBus.$emit("hide-button");
                this.$eventBus.$emit('notActiveButton');
            }
        }
    }
</script>