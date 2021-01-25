<template>
    <div>
        <div class="listing__all-categories-ctrl" 
             @click="showAll = !showAll" 
             v-if="!showAll"
        >{{ $tc('categories.show_all') }}</div>
        <div v-if="showAll">
            <slot></slot>
        </div>
        <div class="listing__all-categories-ctrl" 
             @click="showAll = !showAll" 
             v-if="showAll"
        >{{ $tc('categories.hide_all') }}</div>
    </div>
</template>

<script>
export default {
    name: 'all-categories',
    data(){
        return{
            showAll: false,
        }
    },
}
</script>