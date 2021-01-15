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
                    <use xlink:href="/images/sprite.svg#arrows__arrow-down"></use>
                </svg>
            </div>
        </div>
        <div v-show="sownSubcategory || main && sownSubcategory"> <!--TODO надо обдумать как скрыть подкатегории остальных категорий по умолчанию-->
            <slot name="subcategories-content"></slot> 
        </div>
    </div>
</template>

<script>
    export default {
        name: 'listing-subcategories',
        data(){
            return{
                sownSubcategory: true
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