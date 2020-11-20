<template>
    <div class="catalogue__subcategories">
        <div class="catalogue__subcategory" v-for="subcategory in subcategories">
            <a href="#" class="catalogue__subcategory-link" @click="getCategories(subcategory)">{{subcategory}}</a>
            <furtherSubcategories :categories="furtherSubcategories"></furtherSubcategories>
            <!-- <ul>
                <li v-for="further-subcategory in subcategory">
                    <a href="#" class="catalogue__further-subcategory">{{furtherSubcategory}}</a>
                </li>
            </ul> -->
        </div>
    </div>
    
</template>

<script>
    import furtherSubcategories from './catalogue-further-subcategories.vue';

    export default {
        name: "catalogue-subcategories",
        props: {
            categories: {
                type: Object,
                default: () => ({}),
                required: true
            }
        },
        components: {
            furtherSubcategories
        },
        computed: {
            furtherSubcategories() {
                return this.categories
            },
            subcategories() {
                return Object.keys(this.categories)
            },
        },
        methods: {
            getCategories(key) {
                console.log(furtherSubcategories[key])
                return furtherSubcategories[key]
            }
        }
    }
</script>
