<template>
    <div v-show="amountOrders > 0" class="discounts-calculation">
        <div class="discounts-calculation__head">
            <h3 class="discounts-calculation__title">{{ $tc('profile.discounts.calculation_title') }}</h3>
        </div>
        <div class="discounts-calculation__main">
            <ul class="discounts-calculation__list">
                <li class="discounts-calculation__item" v-for="item in calculationArr">
                    <div class="discounts-calculation__subtitle">{{item.title}}</div>
                    <div class="discounts-calculation__desc" :class="{'discounts-calculation__desc--green': item.green}">
                        <span>{{item.desc}}</span>
                        <span v-if="item.discount">
                            %
                        </span>
                        <span v-else>{{ $tc('text.currency') }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:"discounts-calculation",
    props:{
        amountOrders:{
            type: Number,
            required: true
        }
    },
    data(){
        return{
            calculationArr:[
                {
                    title: 'Фактический оборот в декабре:',
                    desc: 50000,
                },
                {
                    title: 'Расчетная скидка в декабре:',
                    desc: 5,
                    discount: true
                },
                {
                    title: 'Необходимый оборот для сохранения скидки:',
                    desc: 150000,
                },
                {
                    title: 'Прогнозируемая скидка в январе:',
                    desc: 10,
                    discount: true,
                    green: true
                }
            ]
        }
    }
}
</script>