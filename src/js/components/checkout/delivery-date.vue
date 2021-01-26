<template>
    <div class="delivery-date">
        <div class="delivery-date__title">{{ $tc('checkout.title.date') }}</div>
        <div class="delivery-date__info">{{ $tc('checkout.text.date') }}</div>
        <div class="delivery-date__calendar">
            <date-picker 
                v-model="time1"
                placeholder="Не выбрано (не обязательно)"
                :disabled-date="disabledTodayAfterAWeek"
                :format='format'
                :formatter="momentFormat"
                :lang="lang"
                @change='inputVal'
            >
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
import 'vue2-datepicker/locale/ru';
import moment from 'moment';


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
            time1: '',
            format:'DD.MM.YYYY',
            momentFormat: {
                //[optional] Date to String
                stringify: (date) => {
                    return date ? moment(date).format('DD.MM.YYYY') : ''
                }
            },
            lang:{
                formatLocale: {
                    firstDayOfWeek: 1,
                },
                monthFormat: 'MMMM',
            }
        }
    },
    methods:{
        disabledTodayAfterAWeek(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return date < today
        },
    },
    inputVal(){
        console.log('1')
    }
}
</script>