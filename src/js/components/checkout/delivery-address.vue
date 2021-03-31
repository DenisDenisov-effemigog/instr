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
                    v-model="city"
                >
                </autocomplete-input>

                <autocomplete-input
                    :itemsArray="streets"
                    :labelName="$tc('title.street')"
                    :itemName="'street'"
                    :getValue="getValue"
                    v-model="street"
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
                        v-model.trim="building"
                        @focusout="buildAddress"
                    >
                    <span class="form__label-text"
                          :class="{'form__label-text--up': !!building}"
                    >{{ $tc('title.building') }}</span>
                    <svg viewBox="0 0 24 24"
                         class="form__label-icon"
                         v-if="!!building"
                         @click="building = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                </label>

                <label name="floor" class="form__label form__label--column">
                    <input
                        name="floor"
                        type="text"
                        class="form__input"
                        v-model.trim="floor"
                        @focusout="buildAddress"
                    >
                    <span class="form__label-text"
                          :class="{'form__label-text--up': !!floor}"
                    >{{ $tc('title.floor') }}</span>
                    <svg viewBox="0 0 24 24"
                         class="form__label-icon"
                         v-if="!!floor"
                         @click="floor = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                </label>

                <label name="apart" class="form__label form__label--column">
                    <input
                        name="apart"
                        type="text"
                        class="form__input"
                        v-model.trim="apart"
                        @focusout="buildAddress"
                    >
                    <span class="form__label-text"
                          :class="{'form__label-text--up': !!apart}"
                    >{{ $tc('title.apart') }}</span>
                    <svg viewBox="0 0 24 24"
                         class="form__label-icon"
                         v-if="!!apart"
                         @click="apart = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
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
            currentCity:{
                type: Object,
                default: {
                    id: '',
                    name: ''
                }
            },
            addresses:{
                type:Array,
                required: true
            },
            user:{
                type:Object,
                required: true
            },
            cities:{
                type:Array,
                required: true
            },
            streets:{
                type:Array,
                required: true
            },
        },
        data(){
            return{
                city: this.currentCity.name,
                street: '',
                house: '',
                building: '',
                floor: '',
                apart: '',
            }
        },
        validations:{
            house:{
                required
            },
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
                    this.city = data.value.name
                } else if (data.itemName == 'street') {
                    this.street = data.value.name
                }
                this.buildAddress();
            },
            addressError() {
                let vm = this
                vm.$v.$touch();
                if (window.innerWidth > 767) {
                    this.scrollTop('.checkout__content', 150);
                } else {
                    this.scrollTop('.checkout__content', 70);
                }
            }
        }
    }
</script>
