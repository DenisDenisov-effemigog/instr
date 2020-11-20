<template>
    <ul>
        <li v-for="further-subcategory in subcategory">
            <a href="#" class="catalogue__further-subcategory">{{furtherSubcategory}}</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "further-subcategories",
        props: {
            subcategory: {required: true}
        }
    }
</script>
