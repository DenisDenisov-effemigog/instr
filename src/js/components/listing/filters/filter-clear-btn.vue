<template>
    <div class="filter-clear-btn" 
         :class="{'filter-clear-btn--mobile': mobileFlag}"
         @click="clearFilters"
    >
        <div class="filter-clear-btn__icon">
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
            </svg>
        </div>
        <div v-if="!mobileFlag" class="filter-clear-btn__text">
            Сбросить все фильтры
        </div>
        <div v-else class="filter-clear-btn__text">
            Сбросить все
        </div>
    </div>
</template>

<script>
export default {
    name: 'filter-clear-btn',
    props:{
        mobileFlag:{
            type: Boolean,
            default: false
        }
    },
    methods: {
        clearFilters() {
            this.$eventBus.$emit('clear-filters')
        }
    }
}
</script>