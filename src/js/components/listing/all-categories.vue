<template>
    <div>
        <div @click="showAll = !showAll" v-if="!showAll">Все категории</div>
        <div v-if="showAll">
            <slot></slot>
        </div>
        <div @click="showAll = !showAll" v-if="showAll">Скрыть все категории</div>
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
    props:{
    },
    methods:{
    }
}
</script>