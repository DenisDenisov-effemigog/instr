<template>
    <div class="catalogue__subcategories">
        <div class="catalogue__subcategory" v-for="subcategory in subcategories"
            :key="subcategory.title"
        >
            <a :href="subcategory.url" class="catalogue__subcategory-link">{{subcategory.title}}</a>
            <furtherSubcategories :categories="subcategory.subcategories"></furtherSubcategories>
        </div>
    </div>
</template>

<script>
    import furtherSubcategories from './catalogue-further-subcategories.vue';

    export default {
        name: "catalogue-subcategories",
        props: {
            categories: {
                type: Array,
                default: () => ({}),
                required: true
            },
        },
        components: {
            furtherSubcategories
        },
        computed: {
            subcategories() {
                return this.categories
            },
        }
    }
</script>
