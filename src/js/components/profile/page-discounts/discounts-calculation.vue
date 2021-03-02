<template>
    <div class="discounts-calculation">
        <div class="discounts-calculation__head">
            <h3 class="discounts-calculation__title">{{ $tc('profile.discounts.calculation_title') }}</h3>
        </div>
        <div class="discounts-calculation__main">
            <ul class="discounts-calculation__list">
                <li class="discounts-calculation__item" v-for="item in calculationArr">
                    <div class="discounts-calculation__subtitle">{{$tc(item.title)}}</div>
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
        discounts: {
            type: Array,
            required: true
        }
    },
    data(){
        return{
            calculationArr: [
                {
                    title: 'profile.discounts.calculation_item_1',
                    desc: this.discounts[0].level.current.turnover,
                },
                {
                    title: 'profile.discounts.calculation_item_2',
                    desc: this.discounts[0].level.current.percent,
                    discount: true
                },
                {
                    title: 'profile.discounts.calculation_item_3',
                    desc: this.discounts[0].level.next.turnover,
                },
                {
                    title: 'profile.discounts.calculation_item_4',
                    desc: this.discounts[0].level.next.percent,
                    discount: true,
                    green: true
                }
            ]
        }
    },
    created() {
        this.$eventBus.$on('current-discount', this.changeTab)
    },
    methods: {
        changeTab(index) {
            this.calculationArr[0].desc = this.discounts[index].level.current.turnover
            this.calculationArr[1].desc = this.discounts[index].level.current.percent
            this.calculationArr[2].desc = this.discounts[index].level.next.turnover
            this.calculationArr[3].desc = this.discounts[index].level.next.percent
        }
    }
}
</script>