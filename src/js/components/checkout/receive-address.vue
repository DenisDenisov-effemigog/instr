<template>
    <form action="" class="receive-address">
        <autocomplete-input
            :labelName="$tc('title.city')"
            :itemName="'city'"
            :getValue="getValue"
            v-model="city"
        ></autocomplete-input>
        <!-- <div class="receive-address__tow">
        </div> -->
        <div v-show="city && !!deliveryPoints && deliveryPoints.length == 0">
            идет загрузка городов
        </div>
        <div v-if="city && deliveryPoints.length > 0" class="receive-address__select">
            <!-- <select-list
                :points="deliveryPoints"
                :selectopenSelect="{}"
                :selectName="'receive-address'"
            ></select-list> -->
            <input-select
                :points="deliveryPoints"
                v-model="address"
                :city="city"
            >
            </input-select>
        </div>
    </form>
</template>

<script>
    import selectList from "../partials/select-list.vue";
    import AutocompleteInput from './autocomplete-input.vue';
    import inputSelect from './input-select.vue';
    import {required} from "vuelidate/lib/validators";

    export default {
        name:"receive-address",
        components:{ selectList, AutocompleteInput, inputSelect},
        props: {
            deliveryPoints: {
                required: true,
                type: Array
            },
            currentCity:{
                type: Object,
                default: {
                    id: '',
                    name: ''
                }
            },
            deliveryId:{
                type: String,
                required: true
            }
        },
        data(){
            return{
                city: '',
                address: ''
            }
        },
        validations:{
            city: { required }, address: { required },
        },
        created() {
            if (this.currentCity && this.currentCity.name) this.city = this.currentCity.name;
            this.$eventBus.$on('pickup-address-error', this.addressError);
        },
        methods:{
            getValue(data){
                this.$emit('getCity', data)
            },
            addressError() {
                let vm = this
                vm.$v.$touch();
                if (window.innerWidth > 767) {
                    vm.scrollTop('.receive-address', 150);
                } else {
                    vm.scrollTop('.receive-address', 70);
                }
            }
        },
        watch: {
            currentCity(value) {
                address: ''
            }
        }
    }
</script>