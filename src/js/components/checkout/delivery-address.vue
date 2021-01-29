<template>
    <div class="delivery-address"><!--TODO адреса показываем если пользователь залогинен и у него есть сохранённые-->
        <div v-if="currentTab === 'corporate'" class="delivery-address__corporate">
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
                <custom-input 
                    v-for="item in inputArr"
                    :item="item"
                ></custom-input>
            </form>
        </div>
    </div>
</template>

<script>
import AddAddressBtn from '../add-address-btn.vue'
import CustomInput from '../custom-input.vue'
import selectList from "../partials/select-list.vue"

export default {
    name:"delivery-address",
    components: { selectList, AddAddressBtn, CustomInput },
    props:{
        currentTab:{
            type:String,
            required: true
        },
        addresses:{
            type:Array,
            required: true
        },
    },
    data(){
        return{
            inputArr:[
                {
                    title:"title.city",
                    name:"town"
                },
                {
                    title:"title.street",
                    name:"street"
                },
                {
                    title:"title.house",
                    name:"house"
                },
                {
                    title:"title.build",
                    name:"str"
                },
                {
                    title:"title.floor",
                    name:"floor"
                },
                {
                    title:"title.apart",
                    name:"apart"
                }
            ],
        }
    },
    computed: {
    },
}
</script>