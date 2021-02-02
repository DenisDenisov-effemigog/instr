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

                <autocomplete-input
                    :itemsArray="cities"
                    :labelName="$tc('title.city')"
                    :itemName="'city'"
                    :getValue="getValue"
                    @focusout="buildAddress"
                >
                </autocomplete-input>

                <autocomplete-input
                    :itemsArray="streets"
                    :labelName="$tc('title.street')"
                    :itemName="'street'"
                    :getValue="getValue"
                    @focusout="buildAddress"
                >
                </autocomplete-input>

                <label name="house" class="form__label form__label--column">
                    <input
                        name="house"
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

                <label name="building" class="form__label form__label--column">
                    <input
                        name="building"
                        type="text"
                        class="form__input"
                        :class="{'form__input--error': $v.building.$error}"
                        v-model.trim="$v.building.$model"
                        @focusout="buildAddress"
                    >
                    <span class="form__label-text"
                          :class="{'form__label-text--up': !!building}"
                    >{{ $tc('title.building') }}</span>
                    <svg viewBox="0 0 24 24"
                         class="form__label-icon"
                         v-if="!!building"
                         @click="$v.building.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="form__error-text form__error-text--invalid"
                         v-if="$v.building.$error">{{ $tc('text.error') }}</div>
                </label>

                <label name="floor" class="form__label form__label--column">
                    <input
                        name="floor"
                        type="text"
                        class="form__input"
                        :class="{'form__input--error': $v.floor.$error}"
                        v-model.trim="$v.floor.$model"
                        @focusout="buildAddress"
                    >
                    <span class="form__label-text"
                          :class="{'form__label-text--up': !!floor}"
                    >{{ $tc('title.floor') }}</span>
                    <svg viewBox="0 0 24 24"
                         class="form__label-icon"
                         v-if="!!floor"
                         @click="$v.floor.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="form__error-text form__error-text--invalid"
                         v-if="$v.floor.$error">{{ $tc('text.error') }}</div>
                </label>

                <label name="apart" class="form__label form__label--column">
                    <input
                        name="apart"
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
    import autocompleteInput from './autocomplete-input.vue'

    export default {
        name:"delivery-address",
        components: { selectList, AddAddressBtn, autocompleteInput },
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
                building: '',
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
            building:{
            },
            floor:{
            },
            apart:{
                required
            }
        },
        created() {
            this.$eventBus.$on('address-error', this.addressError)
        },
        methods: {
            buildAddress() {
                this.$eventBus.$emit('push-address',  this.city, this.street, this.house, this.building, this.floor, this.apart)
            },
            getValue(data){
                if (data.itemName == 'city') {
                    this.city = data.value
                } else if (data.itemName == 'street') {
                    this.street = data.value
                }
            },
            addressError() {
                let vm = this
                vm.$v.$touch();
                window.scroll({ top: vm.$el, behavior: 'smooth'})
            }
        }
    }
</script>
