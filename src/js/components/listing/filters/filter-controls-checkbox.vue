<template>
    <div>
        <label class="filter-block__label"
               v-for="checkbox in filteredValues"
               :key="value.code + '_' + checkbox.value"
        >
            <input
                class="filter-block__checkbox"
                type="checkbox"
                v-model="checked"
                @change="onCheckboxChanged"
                :value="checkbox.value"
            >
            <span class="filter-block__checkbox-label">
                    <svg class="filter-block__checkbox-svg" viewBox="0 0 10 8">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__checked'"></use>
                    </svg>
                </span>
            <span class="filter-block__checkbox-text">{{ checkbox.title }}</span>
        </label>
    </div>
</template>

<script>
    export default {
        name: "filter-controls-checkbox",
        props: {
            value: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                checked: []
            }
        },
        model: {
            prop: 'value',
            event: 'change',
        },
        watch: {
            value(newValue) {
                this.parseFilter();
            }
        },
        mounted() {
            this.parseFilter();
        },
        computed: {
            filteredValues() {
                let values = this.cloneOverJson(this.value.values);
                return values.slice(0, 5);
            },
        },
        methods: {
            onCheckboxChanged() {
                let filter = this.cloneOverJson(this.value);
                let values = [];
                let vm = this;
                filter.values.forEach(item => {
                    item.checked = vm.checked.includes(item.value);
                    values.push(item);
                });
                filter.values = values;

                this.$emit('change', filter);
            },
            parseFilter() {
                let checked = [];
                this.value.values.forEach(item => {
                    if(item.checked) {
                        checked.push(item.value);
                    }
                });
                this.checked = checked;
            }
        }
    }
</script>