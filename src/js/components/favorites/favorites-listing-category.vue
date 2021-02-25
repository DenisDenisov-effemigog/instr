<template>
    <div class="favorites-listing__sidebar-wrap">
        <div class="favorites-listing__sidebar_head">
            <div class="favorites-listing__sidebar_title">{{ $tc('favorites.text.category') }}</div>
            <div class="favorites-listing__sidebar_hide" :class="{'favorites-listing__sidebar_hide--rotate': openFlag}" @click="openFlag = !openFlag">
                <svg viewBox="0 -3 14 14">
                    <use xlink:href="/images/sprite.svg#arrows__arrow-down"></use>
                </svg>
            </div>
        </div>
        <div v-show="openFlag" class="favorites-listing__sidebar_category" v-for="(category, index) in favoriteCategories" @click="changeCategory(index)">
            <svg viewBox="-2 -1 12 12">
                <use xlink:href="/images/sprite.svg#check" v-show="categoryActive === index"></use>
            </svg>
            {{ category }}
        </div>
        <slot name="filters"></slot>
    </div>
</template>

<script>
export default {
    name:"favorites-listing-category",
    props: {
        favoriteCategories: {
            type: Array,
            required: true
        },
    },
    data(){
        return{
            categoryActive: 0,
            openFlag: true
        }
    },
    methods:{
        changeCategory(index) {
            this.categoryActive = index
            /*TODO api change cat*/
        },
    }
}
</script>