<template>
    <div :class="className + '__subcategories'">
        <div :class="className + '__subcategory'" v-for="subcategory in subcategories">
            <a href="#" :class="className + '__subcategory-link'">{{subcategory.title}}</a>
            <furtherSubcategories :className=className :categories="subcategory.subcategories"></furtherSubcategories>
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
            className:{
                type: String,
                default: 'catalogue',
                required: false
            }
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
