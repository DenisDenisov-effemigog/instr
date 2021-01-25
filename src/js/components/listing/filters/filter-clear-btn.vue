<template>
    <div class="filter-clear-btn" 
         :class="{'filter-clear-btn--mobile': mobileFlag}"
         @click="clearFilters"
         v-if="dirty"
    >
        <div class="filter-clear-btn__icon">
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
            </svg>
        </div>
        <div v-if="!mobileFlag" class="filter-clear-btn__text">{{ $tc('filters.clear_filters') }}</div>
        <div v-else class="filter-clear-btn__text">{{ $tc('filters.clear') }}</div>
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
    data() {
      return {
          dirty: false,
      }  
    },
    created() {
        this.$eventBus.$on('show-clear-filters-btn', this.showButton)
    },
    methods: {
        clearFilters() {
            this.dirty = false;
            this.$eventBus.$emit('clear-filters')
        },
        showButton() {
            this.dirty = true;
        }
    }
}
</script>