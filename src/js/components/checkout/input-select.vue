<template>
    <div class="select"  @click="toggleSelect" v-click-outside="closeOutside">
        <div class="select__button"
            :class="{'select__button--active':openSelect,
                'form__input--error': $v.current.$error
            }"
        >
            <input type="text" v-model.trim="$v.current.$model" @keyup="search">
            <svg class="select__arrow">
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
            </svg>
        </div>
        <div v-show="openSelect" class="select__dropdown">
            <ul class="select__list">
                <li @click="clickPoint(point)"
                    class="select__item"
                    :class="{'select__item--active':currentPoint.id === point.id}"
                    v-for="point in results"
                    :key="point.id"
                >
                    <span>{{ point.address }}</span>
                    <svg viewBox="-4 -5 18 20">
                        <use :xlink:href="templatePath + `images/sprite.svg#check`"></use>
                    </svg>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ClickOutside from "vue-click-outside";
    import {required} from "vuelidate/lib/validators";

    export default {
        name: "input-select",
        data() {
            return {
                openSelect: false,
                currentPoint: {},
                results: {},
            }
        },
        props: {
            points:{ //массив пунктов в селекте
                type: Array,
                required: true,
            },
            value: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            }
        },
        validations:{
            current: {
                required
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        directives: { ClickOutside },
        mounted() {
            this.popupItem = this.$el;
            this.results = this.points;
        },
        computed: {
            current: {
                get: function() {
                    return this.value
                },
                set: function(newValue) {
                    this.$emit('change', newValue);
                }
            },

        },
        methods: {
            closeOutside() {
                this.openSelect = false;
                if (this.current !== this.$tc('checkout.receive-address.choose_address')) this.selectCurrent()
            },
            clickPoint(data){
                let vm = this;
                this.currentPoint = data
                this.current = this.currentPoint.short
                this.$eventBus.$emit('change-select-point', this.selectName, this.currentPoint);
            },
            toggleSelect() {
                this.openSelect = !this.openSelect;
                if (this.current === this.$tc('checkout.receive-address.choose_address')) {
                    this.current = ''
                } else this.selectCurrent()
            },
            search() {
                this.openSelect = true
                const search = this.current.replace(`${this.city}, `, '').replace(/,/g, '').toLowerCase()
                if (this.current.length > 0) {
                    return this.results = this.points.filter(item => {
                        return item.address.toLowerCase().replace(/,/g, '')
                            .includes(search)
                    })
                } else {
                    return this.results = this.points
                }
            },
            selectCurrent() {
                if (this.current === '') this.current = this.$tc('checkout.receive-address.choose_address')
                else if (!!this.currentPoint.short) this.current = this.currentPoint.short
            }
        },
        watch: {
            points() {
                this.current = this.$tc('checkout.receive-address.choose_address')
            },
        },
    }
</script>
