<template>
    <ul :class="className + '__further-subcategories'" v-if="subcategories">
        <li v-if="subcategoryFlag || className != 'listing'" v-for="category in subcategories">
            <a href="#" :class="className + '__further-subcategory'">{{category}}</a>
        </li>
        <li  v-for="(category, index) in subcategories" v-show="index < 5 && !subcategoryFlag">
            <a href="#" :class="className + '__further-subcategory'">{{category}}</a>
        </li>
        <li v-show="!subcategoryFlag && className =='listing'" class="listing__subcategory-btn">
            <a href="#" @click="subcategoryFlag = true">Показать еще</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "further-subcategories",
        data(){
            return{
                subcategoryFlag: false
            }
        },
        props: {
            categories: {
                //type: Array,
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
