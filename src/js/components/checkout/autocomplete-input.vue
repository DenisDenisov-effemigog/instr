<template>
    <autocomplete 
        class="form__label form__label--column"
        :search="search"
        :name="itemName"
        :get-result-value="setLabel"
        @submit="submitItem"
        auto-select
        ref="autocomplete"
    >
        <template #default="{
            rootProps,
            inputProps,
            inputListeners,
            resultListProps,
            resultListListeners,
            results,
            resultProps}"
        >
            <div v-bind="rootProps">
                <input
                    v-bind="inputProps"
                    v-on="inputListeners"
                    v-model.trim="$v.valueInput.$model"
                    :name="itemName"
                    :class="[
                        'form__input',
                        'autocomplete-input',
                        { 'form__input--error': $v.valueInput.$error }
                    ]"
                >
                <ul 
                    v-bind="resultListProps" 
                    v-on="resultListListeners" 
                    class="autocomplete-result-list"
                >
                    <li
                        v-for="(result, index) in results"
                        :key="resultProps[index].id"
                        v-bind="resultProps[index]"
                        class="autocomplete-result"
                    >
                        {{ result.name }}
                    </li>
                </ul>

                <span class="form__label-text form__label-text--with-mag"
                    :class="{'form__label-text--up': $v.valueInput.required}"
                >{{ labelName }}</span>

                <svg viewBox="-4 -4 24 24" class="form__label-icon-mag" v-if="!$v.valueInput.required">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__mag'"></use>
                </svg>
                <svg viewBox="0 0 24 24" class="form__label-icon" v-if="$v.valueInput.required" @click="$v.valueInput.$model = ''">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                </svg>

                <div class="form__error-text form__error-text--invalid" v-if="noResults && itemName == 'city'">
                    {{ $tc('checkout.delivery-address.city.error') }}
                </div>
                <!-- <div class="form__error-text form__error-text--invalid" v-if="noResults && itemName == 'street'">
                    {{ $tc('checkout.delivery-address.street.error') }}
                </div> -->

                <div class="form__error-text form__error-text--invalid" v-if="$v.valueInput.$error">
                    {{ $tc('text.error') }}
                </div>
            </div>
        </template>
    </autocomplete>
</template>

<script>
    import Autocomplete from '@trevoreyre/autocomplete-vue';
    import {required} from "vuelidate/lib/validators";
    import * as Api from '../../api';

    let api = Api.getInstance();

    export default {
        name: 'autocomplete-input',
        components: { Autocomplete },
        props: {
            labelName: {
                type: String,
                required: true
            },
            itemName: {
                type: String,
                required: true
            },
            getValue: {
                type: Function
            },
            value: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                results: [],
            }
        },
        validations:{
            valueInput: {
                required
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        computed: {
            valueInput : {
                get: function() {
                    return this.value;
                },
                set: function(newValue) {
                    this.$emit('change', newValue);
                }
            },
            noResults() {
                return this.valueInput && this.results.length === 0
            }
        },
        created() {
            this.$eventBus.$on('autocomplete-error', this.autocompleteError);
            if (!!this.value) {
                this.search(this.value);
            }
        },
        methods: {
            autocompleteError() {
                let vm = this
                if (vm.itemName === 'city') {
                    vm.$v.valueInput.$touch();
                }
            },
            submitItem(item) {
                if (!this.noResults) {
                    this.valueInput = item.name;
                    this.getValue({
                        value: item,
                        itemName: this.itemName,
                    })
                    this.$refs.autocomplete.value = ''
                }
            },
            setLabel(item) {
                return item.name;
            },
            search(input) {
                this.valueInput = input;
                this.results = [];
                if (this.itemName === 'city' && input.length > 0) {
                    return api.finedCity(input).then(answer => {
                        this.results = answer.list.filter(item => {
                            return item.name.toLowerCase()
                                .startsWith(input.toLowerCase())
                        })
                        return this.results
                    }).catch(errors => {
                        console.log(errors);
                    })
                } else if (this.itemName === 'street' && input.length > 0) {
                    return api.finedStreet(input).then(answer => {
                        this.results = answer.list.filter(item => {
                            return item.name.toLowerCase()
                                .startsWith(input.toLowerCase())
                        })
                        return this.results
                    }).catch(errors => {
                        console.log(errors);
                    })
                } else return this.results
            }
        },
    }
</script>
