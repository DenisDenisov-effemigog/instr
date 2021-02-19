<template>
    <div class="creditor-debt">
        <div class="creditor-debt__head" v-if="dashboard">
            <h3 class="creditor-debt__title">{{ $tc('profile_finance.title.payable') }}</h3>
        </div>
        <div class="creditor-debt__main"
            :class="{'creditor-debt__main--no-debt': !dashboard && arrears === 0}"
        >
            <!-- Progress Bar -->
            <div class="creditor-debt__progress">
                <div  class="creditor-debt__progress-line">
                    <div @mouseleave="closeTooltip" v-if="arrears > 0" 
                        @mouseenter="showExpiredTooltip" 
                        class="creditor-debt__progress-expired" 
                        :style="{width:setExpiredWidth + '%'}"
                    >
                        <div v-show="expiredTooltip" 
                            class="creditor-debt__progress-tooltip creditor-debt__progress-tooltip--expired"
                        >
                            {{currency(arrears)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                    <div @mouseleave="closeTooltip" 
                        @mouseenter="showCurrentTooltip" 
                        class="creditor-debt__progress-current" 
                        :style="{width:setCurrentWidth + '%'}"
                    >
                        <div v-show="currentTooltip" 
                            class="creditor-debt__progress-tooltip creditor-debt__progress-tooltip--current"
                        >
                            {{currency(totalPay - arrears)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                </div>
                <div class="creditor-debt__progress-price">
                    <div class="creditor-debt__progress-start-price"> 
                        {{limit.start}} {{ $tc('text.currency') }}
                    </div>
                    <div class="creditor-debt__progress-finish-price"> 
                        {{currency(limit.limit)}} {{ $tc('text.currency') }}
                    </div>
                </div>
            </div>
            <!-- Progress Bar ending -->

            <div class="creditor-debt__list">
                <div class="creditor-debt__item creditor-debt__item--total">
                    <div class="creditor-debt__text">
                        {{ $tc('profile_finance.credit_debt.total') }}
                    </div>
                    <div class="creditor-debt__price">
                        {{currency(totalPay)}} {{ $tc('text.currency') }}
                    </div>
                </div>
                <div class="creditor-debt__item"
                    :class="{'creditor-debt__item--expired':arrears > 0}"
                >
                    <div class="creditor-debt__text">
                        {{ $tc('profile_finance.credit_debt.expired') }}
                        <span class="creditor-debt__date-text" v-if="!dashboard && arrears > 0"> ({{ nextPayment.date }})</span>
                    </div>
                    <div class="creditor-debt__price">
                        {{currency(arrears)}} {{ $tc('text.currency') }}
                    </div>
                </div>
                <div class="creditor-debt__item creditor-debt__item--next-payment" 
                    v-if="dashboard && arrears === 0"
                >
                    <div class="creditor-debt__text">
                        {{ $tc('profile_finance.credit_debt.next_payment') }} 
                        <span class="creditor-debt__date-text"> ({{ nextPayment.date }})</span>
                    </div>
                    <div class="creditor-debt__price">
                       {{currency(nextPayment.sum)}} {{ $tc('text.currency') }}
                    </div>
                </div>
            </div>
            <div class="creditor-debt__payment creditor-debt__payment--next-payment" v-if="!dashboard && arrears === 0">
                <div class="creditor-debt__payment-text">
                    {{ $tc('profile_finance.credit_debt.next_payment_sum') }}
                    <span class="creditor-debt__date-text"> ({{ nextPayment.date }})</span>
                </div>
                <div class="creditor-debt__payment-price">
                    {{currency(nextPayment.sum)}} {{ $tc('text.currency') }}
                </div>
            </div>
            <div class="creditor-debt__payment">
                <a href="" class="creditor-debt__payment-link" v-if="dashboard">
                    {{ $tc('profile_finance.title.charges', leftCharges) }}
                </a>
                <div class="creditor-debt__payment-text" v-else-if="!dashboard && arrears > 0">{{ $tc('profile_finance.credit_debt.delay') }}</div>
                <div class="creditor-debt__payment-text" v-else>{{ $tc('profile_finance.credit_debt.left_days') }}</div>
                <div class="creditor-debt__payment-price" v-if="dashboard">
                    {{currency(totalPay - arrears)}} {{ $tc('text.currency') }}
                </div>
                <div class="creditor-debt__payment-price creditor-debt__payment-price--expired"
                    :class="{'creditor-debt__payment-price--expired': arrears > 0,
                        'creditor-debt__payment-price--next-payment': arrears === 0
                    }" 
                    v-else
                >
                    <span v-if="arrears > 0">- </span>{{ $tc('profile_finance.days', Math.abs(nextPayment.days)) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"creditor-debt",
        props: {
            financeCharges: {
                type: Array,
                required: true
            },
            dashboard: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return{
                limit: {
                    start: 0,
                    limit: 100000,
                },
                currentTooltip: false,
                expiredTooltip: false,
                totalPay: 0,
                arrears: 0,
                nextPayment: {},
                leftCharges: 0
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
            count(){
                let arrearsQty = 0
                this.financeCharges.forEach(item => {
                    this.totalPay += item.sum;
                    if (item.days < 0) {
                        this.arrears += item.sum;
                        arrearsQty++
                    }
                    if (item.latest) this.nextPayment = {...item};
                })
                this.leftCharges = this.financeCharges.length - arrearsQty
                
            },
            setCurrentWidth(){
                let width = (this.totalPay - this.arrears) * 100 / this.limit.limit
                if (width >= 100) width = 100
                return width
            },
            setExpiredWidth(){
                if(this.arrears > 0){
                    return this.totalPay * 100 / this.limit.limit
                }
            }
        },
        created() {
            this.count;
        }
    }
</script>