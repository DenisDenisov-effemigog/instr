<template>
    <ul :class="className + '__further-subcategories'" 
        v-if="subcategories.length > 0">
        <slot v-if="className === 'listing' && !subcategoryShowAll" name="subcategory-listing-part"></slot>
        <slot v-else-if="className === 'listing' && subcategoryShowAll" name="subcategory-listing-all"></slot>
        <li v-else v-for="category in subcategories">
            <a href="#" class="catalogue__further-subcategory">{{category.title}}</a>
        </li>
        <li v-if="!subcategoryShowAll && className ==='listing' && subcategories.length > 5" class="listing__subcategory-btn">
            <a href="" @click.prevent="subcategoryShowAll = true">{{ $tc('header.catalogue.show_more') }}</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "further-subcategories",
        data(){
            return{
                subcategoryShowAll: false,
            }
        },
        props: {
            categories: {
                type: Array,
                required: true
            },
            className:{
                type: String,
                default: 'catalogue',
                required: false
            },
        },
        computed: {
            subcategories() {
                return this.categories
            },
        },
    }
</script>
