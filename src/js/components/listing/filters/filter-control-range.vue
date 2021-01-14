<template>
    <div class="filters-range-slider">
        <div class="filters-range-slider__inputs">
            <div class="filters-range-slider__input-wrap">
                <input type="number" class="filters-range-slider__input" id="minPrice" v-model="rangeValueFrom">
                <label for="minPrice" class="filters-range-slider__label" >от</label>
            </div>
            <div class="filters-range-slider__input-wrap">
                <input type="number" class="filters-range-slider__input" id="maxPrice" v-model="rangeValueTo">
                <label for="maxPrice" class="filters-range-slider__label">до</label>
            </div>
        </div>
        <div class="filters-range-slider">
            <iv-slider
                v-model="rangeValue"
                :min="filterInternal.min"
                :max="filterInternal.max"
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
        data(){
            return{
                value: {
                    "min": 1,
                    "max": 100,
                    "from": 2,
                    "to": 98
                }
            }
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
                    return this.filterInternal.from;
                },
                set: function(newValue) {
                    let filter = this.filterInternal;
                    filter.from = newValue;
                    this.filterInternal = filter;
                }
            },
            rangeValueTo: {
                get: function () {
                    return this.filterInternal.to;
                },
                set: function(newValue) {
                    let filter = this.filterInternal;
                    filter.to = newValue;
                    this.filterInternal = filter;
                }
            },
            rangeValue: {
                get: function () {
                    return [
                        this.filterInternal.from,
                        this.filterInternal.to
                    ];
                },
                set: function (newValue) {
                    let filter = this.filterInternal;
                    filter.from = newValue[0]; 
                    filter.to = newValue[1];
                    this.filterInternal = filter;
                }
            },
            rangeStep() {
                let step = 1;
                let value = this.filterInternal.from;
                if (Math.floor(value * 100) === value * 100) {
                    step = 0.01
                } else if (Math.floor(value * 10) === value * 10) {
                    step = 0.1
                } else if (Math.floor(value) === value) {
                    step = 1
                }
                return step
            }
        }
    }
</script>