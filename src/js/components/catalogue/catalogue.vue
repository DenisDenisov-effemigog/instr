<template>
    <div class="catalogue" v-if="active" v-click-outside="closeCatalog">

        <catalogue-mobile :categories="categories"></catalogue-mobile>

        <div ref="tablet" class="catalogue_tablet">
            <div class="container">
                <ul ref="catList" class="catalogue__categories">
                    <div class="catalogue__categories-bg"></div>
                    <li 
                        class="catalogue__category"
                        v-for="(category, index) in categories"
                        :key="index"
                        @mouseover="catMouseOver(index)"
                        :class="{'catalogue__category_hovered': hovered === index}"
                    >
                        <div>
                            <a :href="category.url" class="catalogue__category-link">
                                {{category.title}}
                                <svg class="" viewBox="0 0 6 10">
                                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                                </svg>
                            </a>
                            
                        </div>
                    </li>
                </ul>
                <catalogue-subcategories
                    v-for="(category, index) in categories"
                    :key="index"
                    v-show="index === hovered"
                    :categories="category.subcategories"
                    :openFlag ="index === hovered"
                    @catHeight="catHeight"
                >
                </catalogue-subcategories>
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
            this.$eventBus.$on("toggle-catalog", this.toggleCatalog);
        },
        methods: {
            catMouseOver(index){
                this.hovered = index
                this.$eventBus.$emit("catMouseOver")
            },
            catHeight(height){
                this.$refs.tablet.style.height = height + 'px'
            },
            toggleCatalog(state) {
                this.active = state;
                this.hovered = 0;
                
                if (!this.active) {
                    this.toggleHtmlOverflow('initial')
                } else {
                    this.toggleHtmlOverflow('hidden')
                }
            },
            closeCatalog(event) {
                let vm = this;
                if(window.innerWidth > 760) {
                    if(event.target.className !== 'header__catalog-btn' && 
                        event.target.className !=='header__catalog-btn-line') {
                        vm.$eventBus.$emit('close-catalog'); // закрываем деск.каталог по клику снаружи
                    }
                }
            }
        }
    }
</script>


