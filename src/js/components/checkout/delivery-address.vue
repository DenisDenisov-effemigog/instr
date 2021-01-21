<template>
    <div class="delivery-address">
        <div v-if="currentTab == 'corporate'" class="delivery-address__corporate">
            <div class="delivery-address__select">
                <select-list
                    :points="[
                                {
                                    label:'Адрес №1: Будапешт 1062, V1 Бажаутса, 35',
                                    value:'1'    
                                },
                                {
                                    label:'Адрес №2: Будапешт 1062, V1 Бажаутса, 35',
                                    value:'2'    
                                },
                                {
                                    label:'Адрес №3: Будапешт 1062, V1 Бажаутса, 35',
                                    value:'3'    
                                }
                            ]"
                    :selectopenSelect=" {
                                            label:'Адрес №1: Будапешт 1062, V1 Бажаутса, 35',
                                            value:'1'    
                                        }"
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
    data(){
        return{
            inputArr:[
                {
                    title:"Город",
                    name:"town"
                },
                {
                    title:"Улица",
                    name:"street"
                },
                {
                    title:"Дом",
                    name:"house"
                },
                {
                    title:"Строение",
                    name:"str"
                },
                {
                    title:"Этаж",
                    name:"floor"
                },
                {
                    title:"Офис/Квартира",
                    name:"apart"
                }
            ]
        }
    },
    props:{
        currentTab:{
            type:String,
            required: true
        }
    },
}
</script>