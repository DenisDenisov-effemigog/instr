<template>
    <div class="delivery-date">
        <div class="delivery-date__title">{{ $tc('checkout.title.date') }}</div>
        <div class="delivery-date__info">{{ $tc('checkout.text.date') }}</div>
        <div class="delivery-date__calendar">
            <date-picker v-model="time1">
                <template v-slot:icon-calendar>
                    <svg>
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                    </svg>
                </template>
            </date-picker>
        </div>
    </div>
</template>

<script>
import selectList from "../partials/select-list.vue"
import DatePicker from 'vue2-datepicker';

export default{
    name:"delivery-date",
    components: { selectList, DatePicker },
    data(){
        return{
            points:[
                {
                    label:"Не выбрано (не обязательно)",
                    value:"none"
                },
                {
                    label:"31.12.1999",
                    value:"999"
                },
            ],
            setPoint:{
                    label:"Не выбрано (не обязательно)",
                    value:"none"
                },
            time1: 'Не выбрано (не обязательно)',
        }
    }
}
</script>