<template>
    <div
        class="to-compare"
        :class="{'to-compare--active': inCompare, 'to-compare--mobile': mobile}"
        @click="inCompare = !inCompare"
    >
        <svg viewBox="0 0 14 18">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__graph'"></use>
        </svg>
        <span v-if="text">{{ $tc('link.to_compare') }}</span>
    </div>
</template>

<script>
export default {
    name: 'to-compare',
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
            inCompare: false,
        }
    },
    methods:{
    }
}
</script>