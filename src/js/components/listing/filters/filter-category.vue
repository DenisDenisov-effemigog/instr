<template>
    <ul class="listing__further-subcategories">
        <slot v-if="!subcategoryShowAll" name="subcategory-listing-part"></slot>
        <slot v-else-if="subcategoryShowAll" name="subcategory-listing-all"></slot>
        <li v-if="!subcategoryShowAll" class="listing__subcategory-btn">
            <a href="" @click.prevent="subcategoryShowAll = true">{{ $tc('header.catalogue.show_more') }}</a>
        </li>
        <li v-else-if="subcategoryShowAll" class="listing__subcategory-btn">
            <a href="" @click.prevent="subcategoryShowAll = false">{{ $tc('header.catalogue.hide_more') }}</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "filter-category",
        data(){
            return{
                subcategoryShowAll: false,
            }
        },
    }
</script>
