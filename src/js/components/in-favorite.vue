<template>
    <div
        class="in-favorite"
        :class="{'in-favorite--active': inFavorite, 'in-favorite--mobile': mobile}"
        @click="inFavorite = !inFavorite"
    >
        <svg v-if="!inFavorite" viewBox="0 0 18 16">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__heart'"></use>
        </svg>
        <svg v-else viewBox="0 0 18 16">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__heart-full'"></use>
        </svg>
            <span v-if="text">{{ $tc('link.in_favorite') }}</span>
    </div>
</template>

<script>
export default {
    name: 'in-favorite',
    props: {
        text: {
            required: false,
            default: false,
            type: Boolean
        },
        mobile: {
            required: false,
            default: false,
            type: Boolean
        }  
    },
    data(){
        return{
            inFavorite: false,
        }
    },
    methods:{
    }
}
</script>