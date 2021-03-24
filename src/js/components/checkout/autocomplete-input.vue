<template>
    <autocomplete 
        class="form__label form__label--column"
        :search="search"
        :name="itemName"
        :get-result-value="setLabel"
        @submit="submitItem"
        auto-select
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
            itemsArray: {
                type: Array,
                required: true
            },
            labelName: {
                type: String,
                required: true
            },
            itemName: {
                type: String,
                required: true
            },
            getId: {
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
                valueInput: '',
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
            valueId : {
                get: function() {
                    return this.value;
                },
                set: function(newValue) {
                    this.$emit('change', newValue);
                }
            },
            items() {
                return this.itemsArray
            },
            noResults() {
                return this.valueInput && this.results.length === 0
            }
        },
        created() {
            this.$eventBus.$on('autocomplete-error', this.autocompleteError)
        },
        methods: {
            autocompleteError() {
                let vm = this
                if (vm.itemName === 'city') {
                    vm.$v.$touch();
                }
            },
            submitItem(item) {
                if (!this.noResults) {
                    this.valueInput = item.name;
                    this.valueId = item.id;
                    this.getValue({
                        value: this.valueInput,
                        itemName: this.itemName,
                        valueId: this.valueId
                    })
                }
            },
            setLabel(item) {
                return item.name;
            },
            search(input) {
                let vm = this
                this.valueInput = input
                if (this.itemName === 'city') {
                    api.finedCity(input).then(answer => {
                        vm.results = answer.list.filter(item => {
                            if(item.name.toLowerCase() === vm.valueInput.toLowerCase()) {
                                console.log(item)
                                vm.valueId = item.id
                            }
                            return item.name.toLowerCase()
                                .startsWith(input.toLowerCase())
                        })
                    })
                } else {
                    api.finedStreet(input).then(answer => {
                        vm.results = answer.list.filter(item => {
                            if(item.name.toLowerCase() === vm.valueInput.toLowerCase()) {
                                console.log(item)
                                vm.valueId = item.id
                            }
                            return item.name.toLowerCase()
                                .startsWith(input.toLowerCase())
                        })
                    })
                }
                
                return this.results
            }
        },
    }
</script>
