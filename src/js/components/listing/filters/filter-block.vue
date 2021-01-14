<template>
    <div class="filter-block">
        <div class="filter-block__header"
            :class="{'filter-block__header--open': openFilter}"
            @click='openFilter = !openFilter'
            v-if="filter.title"
        >
            <div class="filter-block__title">{{ filter.title }}</div>
            <div class="filter-block__arrow" :class="{'filter-block__arrow--rotate': openFilter}">
                <svg viewBox="0 0 12 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                </svg>
            </div>
        </div>
        <div class="filter-block__content" v-if="filter.type === 'range'" v-show="openFilter">
            <div class="filter-block__subtitle">Базовая цена</div>
            <filter-control-range></filter-control-range>
        </div>
        <div class="filter-block__content"  v-else-if="filter.type === 'switch'" v-show="openFilter">
            <div v-for="value in filter.values">
                <label :name=value.value class="filter-block__switch">
                    <input
                        class="filter-block__switch-input"
                        type="checkbox"
                        :name=value.value>
                    <span class="filter-block__switch-slider"></span>
                    <span class="filter-block__switch-label">{{ value.title }}</span>
                </label>
            </div>
        </div>
        <div class="filter-block__content" v-else-if="filter.type === 'checkbox'" v-show="openFilter">
                <!--TODO перебить классы, плюс в css чекбоксы и лэбл вынести в отдельные компоненты-->
            <label :name=checkbox.value class="filter-block__label" v-for="checkbox in filter.values">
                <input
                    class="filter-block__checkbox"
                    type="checkbox"
                    :name=checkbox.value
                    required
                    checked
                >
                <span class="filter-block__checkbox-label">
                    <svg viewBox="0 0 10 8">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__checked'"></use>
                    </svg>
                </span>
                <span class="filter-block__checkbox-text">{{ checkbox.title }}</span>
            </label>
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