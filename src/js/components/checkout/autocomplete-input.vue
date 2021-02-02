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
                    v-model.trim="$v.value.$model"
                    :name="itemName"
                    :class="[
                        'form__input',
                        'autocomplete-input'
                    ]"
                >
                <ul v-bind="resultListProps" v-on="resultListListeners" class="autocomplete-result-list">
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
                    :class="{'form__label-text--up': $v.value.required}"
                >{{ labelName }}</span>
                <svg viewBox="-4 -4 24 24" class="form__label-icon-mag" v-if="!$v.value.required">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__mag'"></use>
                </svg>
                <svg viewBox="0 0 24 24" class="form__label-icon" v-if="$v.value.required" @click="$v.value.$model = ''">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                </svg>
                <div class="form__error-text form__error-text--invalid" v-if="$v.value.$error">
                    {{ $tc('text.error') }}
                </div>
            </div>
        </template>
    </autocomplete>
</template>

<script>
    import Autocomplete from '@trevoreyre/autocomplete-vue';
    import {required} from "vuelidate/lib/validators";

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
            getValue: {
                type: Function
            }
        },
        data() {
            return {
                results: [],
                value: '',
            }
        },
        validations:{
            value:{
                required
            }
        },
        computed: {
            items() {
                return this.itemsArray
            }
        },
        methods: {
            submitItem(item) {
                this.value = item.name;
                console.log(this.value, 'submit');
                this.getValue({
                    value: this.value,
                    itemName: this.itemName
                })
            },
            setLabel(item) {
                console.log(item.name, 'setlabel')
                return item.name;
            },
            search(input) {
                this.value = input
                if (input.length < 1) {
                    this.results = []
                } else {
                    this.results = this.items.filter(item => {
                    return item.name.toLowerCase()
                        .startsWith(input.toLowerCase())
                    })
                }
                return this.results
            }
        },
    }
</script>
