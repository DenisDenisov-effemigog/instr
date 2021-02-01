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

                <label :name="city" class="form__label form__label--column">
                    <input
                        :name=city
                        type="text"
                        class="form__input"
                        :class="{'form__input--error': $v.city.$error}"
                        v-model.trim="$v.city.$model"
                        @focusout="buildAddress"
                    >
                    <span class="form__label-text"
                          :class="{'form__label-text--up': $v.city.required}"
                    >{{ $tc('title.city') }}</span>
                    <svg viewBox="0 0 24 24"
                         class="form__label-icon"
                         v-if="$v.city.required"
                         @click="$v.city.$model = ''"
                    >
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                    </svg>
                    <div class="form__error-text form__error-text--invalid"
                         v-if="$v.city.$error">{{ $tc('text.error') }}</div>
                </label>

                <label :name="street" class="form__label form__label--column">
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
                </label>

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

    export default {
        name:"delivery-address",
        components: { selectList, AddAddressBtn },
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
            buildAddress() {
                this.$eventBus.$emit('push-address',  this.city, this.street, this.house, this.build, this.floor, this.apart)
            }
        }
    }
</script>