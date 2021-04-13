<template>
    <div class="listing__subcategory"
         :class="{'listing__subcategory--opened': sownSubcategory && subcatTotal}"
    >
        <div class="listing__subcategory-head">
            <slot name="listing-subcategory-title"></slot>
            <div class="listing__subcategory-icon"
                 :class="{'listing__subcategory-icon--open': sownSubcategory}"
                 @click="sownSubcategory = !sownSubcategory"
                 v-if="subcatTotal"
            >
                <svg viewBox="0 0 16 7">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                </svg>
            </div>
        </div>
        <div v-show="sownSubcategory">
            <slot name="subcategories-content"></slot> 
        </div>
    </div>
</template>

<script>
    export default {
        name: 'listing-subcategories',
        data(){
            return{
                sownSubcategory: this.main
            }
        },
        props:{
            subcatTotal:{
                type: Number,
                required: true
            },
            main:{
                type: Boolean,
                required: true
            },
        },
    }
</script>