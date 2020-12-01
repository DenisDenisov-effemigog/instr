<template>
    <div class="catalogue" :class="{'catalogue_active': active}">

        <catalogue-mobile :categories="categories"></catalogue-mobile>

        <div class="catalogue_tablet">
            <div class="container">
                <ul class="catalogue__categories">
                    <div class="catalogue__categories-bg"></div>
                    <li 
                        class="catalogue__category"
                        v-for="(category, index) in categories"
                        @mouseover="hovered = index"
                        :class="{'catalogue__category--hovered': hovered === index}"
                    >
                        <div>
                            <a href="#" class="catalogue__category-link">
                                {{category.title}}
                                <svg class="" viewBox="0 0 6 10">
                                    <use :xlink:href="'./images/sprite.svg#arrows__arrow-right'"></use>
                                </svg>
                            </a>
                            <catalogue-subcategories :categories="category.subcategories"></catalogue-subcategories>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import catalogueMobile from './mobile/catalogue-mobile.vue'
    import catalogueSubcategories from './catalogue-subcategories.vue';
    import headerMenuMobile from '../header/mobile/home-menu.vue';

    export default {
        name: "catalogue",
        components: {
            catalogueMobile,
            catalogueSubcategories,
            headerMenuMobile
        },
        props: {
            categories: {required: true} 
        },
        data() {
            return {
                active: false,
                hovered: 0,
            }
        },
        created() {
            this.$eventBus.$on("open-catalogue", this.openCatalogue)
        },
        methods: {
            openCatalogue(state) {
                this.active = state;
                this.hovered = 0;
            }
        },

    }
</script>


