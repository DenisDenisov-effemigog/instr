<template>
    <div class="creditor-debt">
        <div class="creditor-debt__head">
            <h3 class="creditor-debt__title">{{ $tc('profile.credit_debt.title') }}</h3>
        </div>
        <div class="creditor-debt__main">
            <div class="creditor-debt__progress">
                <div  class="creditor-debt__progress-line">
                    <div @mouseleave="closeTooltip" v-if="creditorData.expired" @mouseenter="showExpiredTooltip" class="creditor-debt__progress-expired" :style="{width:setExpiredWidth + '%'}">
                        <div v-show="expiredTooltip" class="creditor-debt__progress-tooltip creditor-debt__progress-tooltip--expired">{{currency(creditorData.expired)}} {{ $tc('text.currency') }}</div>
                    </div>
                    <div @mouseleave="closeTooltip" @mouseenter="showCurrentTooltip" class="creditor-debt__progress-current" :style="{width:setCurrentWidth + '%'}">
                        <div v-show="currentTooltip" class="creditor-debt__progress-tooltip creditor-debt__progress-tooltip--current">{{currency(totalPay)}} {{ $tc('text.currency') }}</div>
                    </div>
                </div>
                <div class="creditor-debt__progress-price">
                    <div class="creditor-debt__progress-start-price"> {{creditorData.start}} {{ $tc('text.currency') }}</div>
                    <div class="creditor-debt__progress-finish-price"> {{currency(creditorData.finish)}} {{ $tc('text.currency') }}</div>
                </div>
            </div>
            <div class="creditor-debt__list">
                <div class="creditor-debt__item creditor-debt__item--total">
                    <div class="creditor-debt__text">
                        {{ $tc('profile.credit_debt.total') }}
                    </div>
                    <div class="creditor-debt__price">
                        {{currency(totalPay)}} {{ $tc('text.currency') }}
                    </div>
                </div>
                <div class="creditor-debt__item creditor-debt__item--expired">
                    <div class="creditor-debt__text">
                        {{ $tc('profile.credit_debt.expired') }}
                    </div>
                    <div class="creditor-debt__price">
                        {{currency(creditorData.expired)}} {{ $tc('text.currency') }}
                    </div>
                </div>
                <div class="creditor-debt__item creditor-debt__item--next_payment">
                    <div class="creditor-debt__text">
                        {{ $tc('profile.credit_debt.next_payment') }}
                    </div>
                    <div class="creditor-debt__price">
                       {{currency(creditorData.expired)}} {{ $tc('text.currency') }}
                    </div>
                </div>
            </div>
            <div class="creditor-debt__payment">
                <div class="creditor-debt__payment-link">
                     {{ $tc('profile.credit_debt.payment') }}
                </div>
                <div class="creditor-debt__payment-price">
                    {{currency(creditorData.payment[0].pay)}} {{ $tc('text.currency') }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"creditor-debt",
    data(){
        return{
            creditorData:{
                start: 0,
                finish: 100000,
                payment:[
                    {pay:20000},
                    {pay:20000},
                    {pay:10000}
                ],
                expired:20000
            },
            currentTooltip: false,
            expiredTooltip: false
        }
    },
    methods:{
        showExpiredTooltip(){
            this.expiredTooltip = true
        },
        showCurrentTooltip(){
            this.currentTooltip = true
        },
        closeTooltip(){
            if(this.expiredTooltip){
                this.expiredTooltip = false
            }else{
                this.currentTooltip = false
            }
        }
    },
    computed:{
        totalPay(){
            let total = 0
            for(let i = 0; i < this.creditorData.payment.length; i++){
                total += this.creditorData.payment[i].pay
            }
            return total
        },
        setCurrentWidth(){
            return this.totalPay * 100 / this.creditorData.finish
        },
        setExpiredWidth(){
            if(this.creditorData.expired){
                return (this.totalPay + this.creditorData.expired) * 100 / this.creditorData.finish
            }
        }
    }
}
</script>