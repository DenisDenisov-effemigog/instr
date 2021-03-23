<template>
    <div ref="sub" class="catalogue__subcategories" :class="{'catalogue__subcategories--open': openFlag}">
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
            openFlag:{
                type: Boolean,
                required: true
            }
        },
        components: {
            furtherSubcategories
        },
        computed: {
            subcategories() {
                return this.categories
            },
        },
        methods:{
            catHeight(){
                if(window.innerWidth > 990){
                    let category = this.$refs.sub.classList.contains('catalogue__subcategories--open')
                    let height = 0
                    if(category && window.innerWidth < 1275){
                        this.$refs.sub.children.forEach(function(item){
                            height += item.clientHeight + 26
                        })
                        if((height / 3) > 1014){
                            this.$emit("catHeight",( height / 3))
                        }
                    }else{
                        this.$emit("catHeight", 1014)
                    }
                }
            }
        },
        mounted(){
            this.catHeight()
        },
        created(){
            this.$eventBus.$on("catMouseOver", this.catHeight)
            window.addEventListener('resize', this.catHeight);
        }
    }
</script>
