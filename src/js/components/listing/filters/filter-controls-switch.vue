<template>
    <div>
        <label class="filter-block__switch"
               v-for="checkbox in filteredValues"
               :key="value.code + '_' + checkbox.value"
        >
            <input
                class="filter-block__switch-input"
                type="checkbox"
                v-model="checked"
                @change="onCheckboxChanged"
                :value="checkbox.value"
            >
            <span class="filter-block__switch-slider"></span>
            <span class="filter-block__switch-label">{{ checkbox.title }}</span>
        </label>
    </div>
</template>

<script>
    export default {
        name: "filter-controls-switch",
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