<template>
    <ul class="catalogue__further-subcategories" v-if="subcategories.length > 0">
        <li v-for="category in subcategories">
            <a href="#" class="catalogue__further-subcategory">{{category}}</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "further-subcategories",
        props: {
            categories: {
                type: Array,
                required: true
            }
        },
        computed: {
            subcategories() {
                return this.categories
            }
        }
    }
</script>
