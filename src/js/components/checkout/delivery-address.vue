<template>
    <div class="delivery-address">
        <div v-if="currentTab === 'corporate' && addresses.length && user.authorized" class="delivery-address__corporate">
            <div class="delivery-address__select">
                <select-list
                    :points="addresses"
                    :selectopenSelect="addresses[0]"
                    :selectName="'delivery-address'"
                ></select-list>
                <add-address-btn></add-address-btn>
                <div class="delivery-address__add-address">

                </div>
            </div>
        </div>
        <div v-else class="delivery-address__individual">
            <form action="" class="delivery-address__form">

                <autocompleteInput
                    :itemsArray="cities",
                    :label="''"
                >
                </autocompleteInput>

                <!-- <autocomplete 
                    class="form__label form__label--column"
                    :search="searchCity"
                    :name="city"
                    :get-result-value="setLabel"
                    @submit="submitCity"
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
                                :name="city"
                                v-model.trim="$v.city.$model"
                                :class="[
                                    'form__input',
                                    'autocomplete-input',
                                    { 'autocomplete-input-focused': focused }
                                ]"
                                @focusout="buildAddress"
                            />
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
                                :class="{'form__label-text--up': $v.city.required}"
                            >{{ $tc('title.city') }}</span>
                            <svg viewBox="-4 -4 24 24" class="form__label-icon-mag" v-if="!$v.city.required">
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__mag'"></use>
                            </svg>
                            <svg viewBox="0 0 24 24" class="form__label-icon"  v-if="$v.city.required" @click="$v.city.$model = ''">
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                            </svg>
                        </div>
                    </template>
                </autocomplete> -->

                <!-- <autocomplete 
                    class="form__label form__label--column"
                    :search="items"
                    v-model="street"
                    :name="street"
                    v-model.trim="$v.street.$model"
                    :setLabel="setLabel"
                    :itemTemplate="itemTemplate"
                    @changed="inputStreet"
                    @selected="itemSelected"
                    :inputClasses="'form__input'"
                >
                    <template slot="searchSlot">
                        <span class="form__label-text form__label-text--with-mag"
                            :class="{'form__label-text--up': $v.street.required}"
                        >{{ $tc('title.street') }}</span>
                        <svg viewBox="-4 -4 24 24" class="form__label-icon-mag" v-if="!$v.street.required">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__mag'"></use>
                        </svg> -->
                        <!-- <svg viewBox="0 0 24 24" class="form__label-icon">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg> -->
                    <!-- </template>
                </autocomplete> -->

                <!-- <label :name="street" class="form__label form__label--column">
                    <input
                        :name="street"
                        type="text"
                        class="form__input"
                        :class="{'form__input--error': $v.street.$error}"
                        v-model.trim="$v.street.$model"
                        @focusout="buildAddress"
                    >
                    <span class="form__label-text"
                          :class="{'form__label-text--up': $v.street.required}"
                    >{{ $tc('title.street') }}</span>
                    <svg viewBox="0 0 24 24"
                         class="form__label-icon"
                         v-if="$v.street.required"
                         @click="$v.street.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="form__error-text form__error-text--invalid"
                         v-if="$v.street.$error">{{ $tc('text.error') }}</div>
                </label> -->

                <label :name="house" class="form__label form__label--column">
                    <input
                        :name="house"
                        type="text"
                        class="form__input"
                        :class="{'form__input--error': $v.house.$error}"
                        v-model.trim="$v.house.$model"
                        @focusout="buildAddress"
                    >
                    <span class="form__label-text"
                          :class="{'form__label-text--up': $v.house.required}"
                    >{{ $tc('title.house') }}</span>
                    <svg viewBox="0 0 24 24"
                         class="form__label-icon"
                         v-if="$v.house.required"
                         @click="$v.house.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="form__error-text form__error-text--invalid"
                         v-if="$v.house.$error">{{ $tc('text.error') }}</div>
                </label>

                <label :name="build" class="form__label form__label--column">
                    <input
                        :name="build"
                        type="text"
                        class="form__input"
                        :class="{'form__input--error': $v.build.$error}"
                        v-model.trim="$v.build.$model"
                        @focusout="buildAddress"
                    >
                    <span class="form__label-text"
                          :class="{'form__label-text--up': $v.build.required}"
                    >{{ $tc('title.build') }}</span>
                    <svg viewBox="0 0 24 24"
                         class="form__label-icon"
                         v-if="$v.build.required"
                         @click="$v.build.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="form__error-text form__error-text--invalid"
                         v-if="$v.build.$error">{{ $tc('text.error') }}</div>
                </label>

                <label :name="floor" class="form__label form__label--column">
                    <input
                        :name="floor"
                        type="text"
                        class="form__input"
                        :class="{'form__input--error': $v.floor.$error}"
                        v-model.trim="$v.floor.$model"
                        @focusout="buildAddress"
                    >
                    <span class="form__label-text"
                          :class="{'form__label-text--up': $v.floor.required}"
                    >{{ $tc('title.floor') }}</span>
                    <svg viewBox="0 0 24 24"
                         class="form__label-icon"
                         v-if="$v.floor.required"
                         @click="$v.floor.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="form__error-text form__error-text--invalid"
                         v-if="$v.floor.$error">{{ $tc('text.error') }}</div>
                </label>

                <label :name="apart" class="form__label form__label--column">
                    <input
                        :name="apart"
                        type="text"
                        class="form__input"
                        :class="{'form__input--error': $v.apart.$error}"
                        v-model.trim="$v.apart.$model"
                        @focusout="buildAddress"
                    >
                    <span class="form__label-text"
                          :class="{'form__label-text--up': $v.apart.required}"
                    >{{ $tc('title.apart') }}</span>
                    <svg viewBox="0 0 24 24"
                         class="form__label-icon"
                         v-if="$v.apart.required"
                         @click="$v.apart.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="form__error-text form__error-text--invalid"
                         v-if="$v.apart.$error">{{ $tc('text.error') }}</div>
                </label>
            </form>
        </div>
    </div>
</template>

<script>
    import AddAddressBtn from '../add-address-btn.vue'
    import selectList from "../partials/select-list.vue"
    import {required} from "vuelidate/lib/validators";
    import Autocomplete from '@trevoreyre/autocomplete-vue';
    import autocompleteInput from './autocomplete-input.vue'

    export default {
        name:"delivery-address",
        components: { selectList, AddAddressBtn, Autocomplete, autocompleteInput },
        props:{
            currentTab:{
                type:String,
                required: true
            },
            addresses:{
                type:Array,
                required: true
            },
            user:{
                type:Object,
                required: true
            },
        },
        data(){
            return{
                city: '',
                street: '',
                house: '',
                build: '',
                floor: '',
                apart: '',
                cities: [
                    { id: 1, name: 'Киев'},
                    { id: 2, name: 'Харьков'},
                    { id: 3, name: 'Одесса'},
                    { id: 4, name: 'Днепр'},
                    { id: 5, name: 'Запорожье'},
                    { id: 6, name: 'Львов'},
                    { id: 7, name: 'Кривой Рог'},
                ],
                streets: [
                    { id: 1, name: 'Ленина'},
                    { id: 2, name: 'Советская'},
                    { id: 3, name: 'Тенистая'},
                    { id: 4, name: 'Тихая'},
                    { id: 5, name: 'Школьная'},
                    { id: 6, name: 'Киевская'},
                    { id: 7, name: 'Московская'},
                ],
                items: [],
            }
        },
        validations:{
            city:{
                required
            },
            street:{
                required
            },
            house:{
                required
            },
            build:{
            },
            floor:{
            },
            apart:{
                required
            }
        },
        methods: {
            // submitCity(item) {
            //     this.city = item.name;
            //     console.log(this.result, 'selected')
            // },
            // setLabel(item) {
            //     console.log(item.name, 'setlabel')
            //     return item.name;
            // },
            // searchCity(input) {
            //     this.city = input
            //     if (input.length < 1) { return [] }
            //         return this.cities.filter(item => {
            //             return item.name.toLowerCase().startsWith(input.toLowerCase())
            //         })
            // },
            // searchStreet(input) {
            //     this.street = input
            //     if (input.length < 1) { return [] }
            //         return this.streets.filter(item => {
            //             return item.name.toLowerCase().startsWith(input.toLowerCase())
            //         })
            // },
            buildAddress() {
                this.$eventBus.$emit('push-address',  this.city, this.street, this.house, this.build, this.floor, this.apart)
            },
        }
    }
</script>
