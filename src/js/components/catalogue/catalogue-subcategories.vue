<template>
    <li v-for="subcategory in subcategories">
        <a href="#" class="catalogue__subcategory-link">{{subcategory}}</a>
        <!-- <furtherSubcategories :subcategory="subcategory"></furtherSubcategories> -->
        <!-- <ul>
            <li v-for="further-subcategory in subcategory">
                <a href="#" class="catalogue__further-subcategory">{{furtherSubcategory}}</a>
            </li>
        </ul> -->
    </li>
</template>

<script>
    // import furtherSubcategories from './catalogue-further-subcategories.vue';

    export default {
        name: "subcategories",
        props: {
            subcategories: {required: true}
        }
    }
</script>
