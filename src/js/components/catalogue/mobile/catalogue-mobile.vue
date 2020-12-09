<template>
    <div class="catalogue_mobile">
        <div class="container">
            <div 
                class="breadcrumbs" 
                v-if="subcategory || subcategories" 
                @click="goBack"
            >
                <svg class="breadcrumbs__array">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
                </svg>
                <span>Назад</span>
            </div>
            <h3 class="catalogue__title">{{title}}</h3>
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
                    v-for="category in currentSubategory.categories"
                    @click="selectCategory(category)"
                >
                    <a 
                        href="#" 
                        class="catalogue__further-subcategory"
                        :class="{'catalogue__further-subcategory_active': selectedCategory === category}"
                    >{{category}}</a>
                    <svg v-if="selectedCategory === category">
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
                title: 'Каталог',
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
                    this.title = 'Каталог';
                    this.currentCategory = false;
                    this.$eventBus.$emit("hide-button");
                } else {
                    this.subcategories = false;
                    this.subcategory = true;
                    this.title = this.prevTitle;
                    this.currentSubategory = false;
                    this.$eventBus.$emit("sow-button", 'Показать', 2, 'товар' + this.ending(2));
                }
            },
            openSubcategory(item) {
                this.subcategory = true;
                this.title = item.title;
                this.prevTitle = this.title;
                this.currentCategory = item;
                this.$eventBus.$emit("sow-button", 'Показать', item.subcategories.length, 'товар' + this.ending(item.subcategories.length));
            },
            openSubSubcategory(item) {
                this.subcategories = true;
                this.subcategory = false;
                this.title = item.title;
                this.currentSubategory = item;
                this.$eventBus.$emit("sow-button", 'Показать', item.categories.length, 'товар' + this.ending(item.categories.length));
            },
            selectCategory(category) {
                this.selectedCategory = category;
                this.$eventBus.$emit("sow-button", 'Показать', 1, 'товар' + this.ending(1));
            },
            ending(value) {
                let end = '';
                
                if (value % 10 > 4 || value % 10 == 0 || value > 10 && value < 15) {
                    end = 'ов'
                } else if ((value % 10) === 1) {
                    end = ''
                } else {
                    end = 'а'
                }

                return end
            },
        }
    }
</script>