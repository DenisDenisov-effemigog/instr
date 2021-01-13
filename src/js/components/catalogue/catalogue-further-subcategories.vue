<template>
    <ul :class="className + '__further-subcategories'" v-if="subcategories">
        <li v-if="subcategoryShowAll || className !== 'listing'" v-for="category in subcategories">
            <a href="#" :class="className + '__further-subcategory'">{{category.title}}</a>
        </li>
        <li  v-for="(category, index) in subcategories" v-show="index < 5 && !subcategoryShowAll">
            <a href="#" :class="className + '__further-subcategory'">{{category.title}}</a>
        </li>
        <li v-show="!subcategoryShowAll && className ==='listing' && subcategories.length > 5" class="listing__subcategory-btn">
            <a href="#" @click="subcategoryShowAll = true">Показать еще</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "further-subcategories",
        data(){
            return{
                subcategoryShowAll: false
            }
        },
        props: {
            categories: {
                type: Array,
                required: true
            },
            className:{
                type: String,
                required: false
            }
        },
        computed: {
            subcategories() {
                return this.categories
            }
        }
    }
</script>
