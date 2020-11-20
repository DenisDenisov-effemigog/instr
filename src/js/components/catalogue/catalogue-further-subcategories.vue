<template>
    <ul class="catalogue__further-subcategories">
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
                type: Object,
                required: true,
                //default: () => ([])
                }
        },
        computed: {
            subcategories() {
                return this.categories
            }
        }
    }
</script>
