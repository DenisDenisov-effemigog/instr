<template>
    <div class="listing__subcategory-head">
        <slot></slot>
        <div class="listing__subcategory-icon" :class="{'listing__subcategory-icon--open':catIndex === index}" @click="openSubcategory(catIndex)">
            <svg viewBox="0 0 16 7">
                <use xlink:href="/images/sprite.svg#arrows__arrow-down"></use>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: 'listing-subcategory-title',
    data(){
        return{
            index: 0
        }
    },
    props:{
        catIndex:{
            type: Number,
            required: true,
            default: 0,
        },
    },
    methods:{
        openSubcategory(index){
            this.$eventBus.$emit('openSubcategory', index)
            this.index = index
        }
    }
}
</script>