<template>
    <div class="catalogue" v-if="active" v-click-outside="closeCatalogue">

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
                                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
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
    import ClickOutside from "vue-click-outside";

    export default {
        name: "catalogue",
        components: {
            catalogueMobile,
            catalogueSubcategories,
            headerMenuMobile
        },
        directives: {
            ClickOutside
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
            this.$eventBus.$on("open-catalogue", this.openCatalogue);
        },
        methods: {
            openCatalogue(state) {
                this.active = state;
                this.hovered = 0;
                document.querySelector('body').classList.add('body-fixed')
                document.querySelector('html').style.overflow = 'hidden';
            },
            closeCatalogue(event) {
                let vm = this;
                
                if(window.innerWidth > 760) {
                    if(event.toElement.className !== 'header__catalog-btn' && 
                        event.toElement.className.animVal !=='header__catalog-btn-icon') {
                        vm.active = false;
                        this.$eventBus.$emit('close-catalogue', vm.active);
                        document.querySelector('body').classList.remove('body-fixed')
                        document.querySelector('html').style.overflow = 'auto';
                    }
                }
            },
        },

    }
</script>


