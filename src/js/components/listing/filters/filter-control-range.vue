<template>
    <div class="filters-range-slider">
        <div class="filters-range-slider__inputs">
            <div class="filters-range-slider__input-wrap">
                <input type="number" class="filters-range-slider__input" id="minPrice" v-model="rangeValueFrom">
                <label for="minPrice" class="filters-range-slider__label">{{ $tc('text.from') }}</label>
            </div>
            <div class="filters-range-slider__input-wrap">
                <input type="number" class="filters-range-slider__input" id="maxPrice" v-model="rangeValueTo">
                <label for="maxPrice" class="filters-range-slider__label">{{ $tc('text.to') }}</label>
            </div>
        </div>
        <div class="filters-range-slider">
            <iv-slider
                v-model="rangeValue"
                :min="filterInternal.values.min"
                :max="filterInternal.values.max"
                :step="rangeStep"
                range
                showTip="never"
                accordingToStep
            ></iv-slider>
        </div>
    </div>
</template>

<script>
    export default {
        name: "filter-controls-range",
        props: {
            value: {
                required: true,
                type: Object
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        computed:{
            filterInternal: {
                get: function () {
                    return this.value;
                },
                set: function (newValue) {
                    this.$emit('change', newValue);
                }
            },
            rangeValueFrom: {
                get: function () {
                    return this.filterInternal.values.from;
                },
                set: function(newValue) {
                    let filter = this.filterInternal;
                    filter.values.from = newValue;
                    this.filterInternal = filter;
                }
            },
            rangeValueTo: {
                get: function () {
                    return this.filterInternal.values.to;
                },
                set: function(newValue) {
                    let filter = this.filterInternal;
                    filter.values.to = newValue;
                    this.filterInternal = filter;
                }
            },
            rangeValue: {
                get: function () {
                    return [
                        this.filterInternal.values.from,
                        this.filterInternal.values.to
                    ];
                },
                set: function (newValue) {
                    let filter = this.filterInternal;
                    filter.values.from = newValue[0]; 
                    filter.values.to = newValue[1];
                    this.filterInternal = filter;
                }
            },
            rangeStep() {
                let delta = ((this.filterInternal.values.max - this.filterInternal.values.min)/ 100).toFixed(2);
                if(delta < 1.0) delta = 1;
                return Number(delta)
            }
        }
    }
</script>