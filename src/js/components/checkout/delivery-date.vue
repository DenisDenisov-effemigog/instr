<template>
    <div class="delivery-date">
        <h3 class="delivery-date__title">{{ $tc('checkout.title.date') }}</h3>
        <div class="delivery-date__info">{{ $tc('checkout.text.date') }}</div>
        <div class="delivery-date__calendar">
            <date-picker 
                v-model="newDate"
                :disabled-date="disabledTodayAfterAWeek"
                :format='format'
                :formatter="momentFormat"
                :lang="lang"
            >
                <template v-slot:icon-calendar>
                    <dir></dir>
                </template>
                <template v-slot:input>
                    <div class="delivery-date__input-wrap">
                        <input class="delivery-date__input"  v-model="changeInput" :placeholder="$tc('checkout.date_placeholder')" @keydown="validDate">
                    </div>
                </template>
            </date-picker>
            <div @click.stop="clearInput" v-if="changeInput" class="delivery-date__icon">
                <svg viewBox="0 0 12 12">
                    <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
            </div>
            <div v-else class="delivery-date__icon delivery-date__icon--arrow">
                <svg viewBox="0 0 12 10">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import moment, {Moment} from 'moment';


export default{
    name:"delivery-date",
    components: { DatePicker },
    props: {
      value: {required: true}  
    },
    data(){
        return {
            format:'DD.MM.YYYY',
            momentFormat: {
                stringify: (date) => {
                    return date ? moment(date).format('DD.MM.YYYY') : ''
                },
            },
            lang:{
                formatLocale: {
                    firstDayOfWeek: 1,
                },
                monthFormat: 'MMMM',
                dayFormat: 'D',
            },
        }
    },
    model: {
        prop: 'value',
        event: 'change',
    },
    computed: {
        newDate: {
            get: function () {
                return this.value;
            },
            set: function (newValue) {
                this.$emit('change', newValue);
            },
        },
        changeInput(){
                return this.newDate ? moment(this.newDate).format('DD.MM.YYYY') : ''
            }
    },
    methods:{
        disabledTodayAfterAWeek(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return date < today
        },
        clearInput(){
            this.newDate =''
            console.log(this.newDate)
        },
        validDate(e){
            if(e.key >= 0 || e.key <= 9 || e.key == 'Backspace'  || e.key == 'ArrowLeft' || e.key == 'ArrowRight'){
                    
            }else{
                e.preventDefault()
            }
        }
    },
}
</script>