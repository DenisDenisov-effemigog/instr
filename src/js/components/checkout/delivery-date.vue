<template>
    <div class="delivery-date">
        <div class="delivery-date__title">{{ $tc('checkout.title.date') }}</div>
        <div class="delivery-date__info">{{ $tc('checkout.text.date') }}</div>
        <div class="delivery-date__calendar">
            <date-picker 
                v-model="newDate"
                :placeholder="$tc('checkout.date_placeholder')"
                :disabled-date="disabledTodayAfterAWeek"
                :format='format'
                :formatter="momentFormat"
                :lang="lang"
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
import moment, {Moment} from 'moment';


export default{
    name:"delivery-date",
    components: { selectList, DatePicker },
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
            }
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
            }
        },
    },
    methods:{
        disabledTodayAfterAWeek(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return date < today
        }
    },
}
</script>