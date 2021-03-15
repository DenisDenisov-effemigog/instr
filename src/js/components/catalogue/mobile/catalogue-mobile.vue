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
            <h3 class="catalogue__title">{{ title }}</h3>
            <ul class="catalogue__categories" v-if="!subcategory && !subcategories">
                <li 
                    class="catalogue__category" 
                    v-for="category in allCategories" 
                    :key="category.title"
                    @click.prevent="openSubcategory(category)"
                >
                    <a :href="category.url" class="catalogue__category-link">
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
                    :key="subcategory.title"
                    @click.prevent="openSubSubcategory(subcategory)"
                >
                    <a :href="subcategory.url" class="catalogue__subcategory-link_mobile">
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
                    :key="category.title"
                    @click.prevent="selectCategory(category)"
                >
                    <a 
                        :href="category.url" 
                        class="catalogue__further-subcategory"
                        :class="{'catalogue__further-subcategory--active': selectedCategory === category.title}"
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
                title: this.$tc('header.catalogue'),
                prevTitle: '',
                prevLink: '',
                prevItems: null,
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
                    this.title = this.$tc('header.catalogue');
                    this.currentCategory = false;
                    this.$eventBus.$emit("hide-button");
                } else {
                    this.subcategories = false;
                    this.subcategory = true;
                    this.title = this.prevTitle;
                    this.currentSubategory = false;
                    this.selectedCategory = '';
                        this.$eventBus.$emit("sow-button", 'text.show', this.prevItems, 'text.product', this.prevLink);
                }
            },
            openSubcategory(item) {
                this.subcategory = true;
                this.title = item.title;
                this.prevTitle = this.title;
                this.prevLink = item.url;
                this.prevItems = item.items;
                this.currentCategory = item;
                this.$eventBus.$emit("sow-button", 'text.show', item.items, 'text.product', item.url);
            },
            openSubSubcategory(item) {
                this.subcategories = true;
                this.subcategory = false;
                this.title = item.title;
                this.currentSubategory = item;
                this.$eventBus.$emit("sow-button", 'text.show', item.items, 'text.product', item.url);
            },
            selectCategory(category) {
                this.selectedCategory = category.title;
                this.$eventBus.$emit("sow-button", 'text.show', category.items, 'text.product', category.url);
            },
            closeCategory() {
                this.$eventBus.$emit('toggle-catalog', false); //закрываем мобильный каталог
                this.$eventBus.$emit("hide-button");
                this.$eventBus.$emit('notActiveButton');
            }
        }
    }
</script>