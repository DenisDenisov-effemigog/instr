<template>
    <div class="filter-block">
        <div class="filter-block__header" :class="{'filter-block__header--open': openFilter}" @click='openFilter = !openFilter'>
            <div class="filter-block__title">{{ filter.title }}</div>
            <div class="filter-block__arrow" :class="{'filter-block__arrow--rotate': openFilter}">
                <svg viewBox="0 0 12 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                </svg>
            </div>
        </div>
        <div class="filter-block__content" v-if="filter.type === 'range'" v-show="openFilter">
            <div>Базовая цена</div>
            <filter-control-range></filter-control-range>

            <!--TODO перебить классы, плюс в css рефактор-->
            <label name="bestsellers" class="filter-block__checkbox">
                <input
                    class="filter-block__checkbox-input"
                    type="checkbox"
                    name="bestsellers">
                <span class="filter-block__checkbox-slider"></span>
                <span class="filter-block__checkbox-label">Бестселлеры</span>
            </label>
            <label name="newItems" class="filter-block__checkbox">
                <input
                    class="filter-block__checkbox-input"
                    type="checkbox"
                    name="newItems">
                <span class="filter-block__checkbox-slider"></span>
                <span class="filter-block__checkbox-label">Новинки</span>
            </label>
        </div>
        <div class="filter-block__content" v-else-if="filter.type === 'checkbox'" v-show="openFilter">
            <div v-for="checkbox in filter.values"> 
                <!--TODO перебить классы, плюс в css чекбоксы и лэбл вынести в отдельные компоненты-->
                <label name="agreement" class="user__label user__label_row">
                    <input
                        class="user__checkbox-input"
                        type="checkbox"
                        name="agreement"
                        required
                        checked
                    >
                    <span class="user__checkbox-label">
                        <svg viewBox="0 0 10 8">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__checked'"></use>
                        </svg>
                    </span>
                    <span class="user__checkbox-text">{{ checkbox.title }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import FilterControlRange from './filter-control-range.vue'
    export default {
        name: "filter-block",
        components: {
                FilterControlRange,
        },
        props: {
            filter: {
                type: Object,
                required: true
            },
            collapsed: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data(){
            return{
                openFilter: true
            }
        },
        created() {
            if (this.collapsed) {
                this.openFilter = false;
            }
        },
        methods:{
        },
        
    }
</script>