<template>
    <div class="filter-block">
        <div class="filter-block__header"
            :class="{'filter-block__header--open': openFilter}"
            @click='openFilter = !openFilter'
            v-if="filterInternal.title"
        >
            <div class="filter-block__title">{{ filterInternal.title }}</div>
            <div class="filter-block__arrow" :class="{'filter-block__arrow--rotate': openFilter}">
                <svg viewBox="0 0 12 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                </svg>
            </div>
        </div>
        <div class="filter-block__content" v-if="filterInternal.type === 'range'" v-show="openFilter">
            <div class="filter-block__subtitle">{{ $tc('text.price_base') }}</div>
            <filter-control-range v-model="filterInternal"></filter-control-range>
        </div>
        <div class="filter-block__content"  v-else-if="filterInternal.type === 'switch'" v-show="openFilter">
            <filter-controls-switch v-model="filterInternal"></filter-controls-switch>
        </div>
        <div class="filter-block__content" v-else-if="filterInternal.type === 'checkbox'" v-show="openFilter">
            <filter-controls-checkbox v-model="filterInternal"></filter-controls-checkbox>
        </div>
    </div>
</template>

<script>
    import FilterControlRange from './filter-control-range.vue'
    import FilterControlsCheckbox from './filter-controls-checkbox.vue'
    import FilterControlsSwitch from './filter-controls-switch.vue'

    export default {
        name: "filter-block",
        components: {
                FilterControlRange,
                FilterControlsCheckbox,
            FilterControlsSwitch,
        },
        props: {
            value: {
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
        model: {
            prop: 'value',
            event: 'change'
        },
        computed: {
            filterInternal: {
                get: function () {
                    return this.value;
                },
                set: function (newValue) {
                    this.$emit('change', newValue);
                }
            },
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