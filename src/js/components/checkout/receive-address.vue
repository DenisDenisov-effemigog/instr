<template>
    <div class="receive-address">
        <div class="receive-address__tow">
            <autocomplete-input
                :labelName="$tc('title.city')"
                :itemName="'city'"
                :getValue="getValue"
                v-model="city"
            ></autocomplete-input>
        </div>
        <div v-show="city" class="receive-address__select">
            <select-list
                :points="deliveryPoints"
                :selectopenSelect="deliveryPoints[0]"
                :selectName="'receive-address'"
            ></select-list>
        </div>
    </div>
</template>

<script>
    import selectList from "../partials/select-list.vue"
    import AutocompleteInput from './autocomplete-input.vue'

    export default {
        name:"receive-address",
        components:{ selectList, AutocompleteInput},
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
            }
        },
        created() {
            if (this.currentCity && this.currentCity.name) this.city = this.currentCity.name
        },
        methods:{
            getValue(data){
                this.$emit('getCity', data)
            },
        },
    }
</script>