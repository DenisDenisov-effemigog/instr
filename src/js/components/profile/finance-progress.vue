<template>
    <div class="finance-progress">
        <div class="finance-progress__head">
            <h3 class="finance-progress__title">{{ $tc('profile_finance.title.payable') }}</h3>
        </div>
        <div class="finance-progress__main"
            :class="{'finance-progress__main--no-debt': !dashboard && arrears === 0}"
        >
            <!-- Progress Bar -->
            <div class="finance-progress__progress">
                <div  class="finance-progress__progress-line">
                    <!-- for Product Limit -->
                    <div @mouseleave="closeTooltip" v-if="productLimit" 
                        @mouseenter="showCurrentTooltip" 
                        class="finance-progress__progress-current" 
                        :style="{width:setTotalWidth + '%'}"
                    >
                        <div v-show="currentTooltip" 
                            class="finance-progress__progress-tooltip finance-progress__progress-tooltip--current"
                        >
                            {{currency(totalPay)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                    <!-- end of Product Limit -->

                    <div @mouseleave="closeTooltip" v-if="!productLimit && arrears > 0" 
                        @mouseenter="showLongerTooltip" 
                        class="finance-progress__progress-expired" 
                        :style="{width:setExpiredWidth + '%'}"
                    >
                        <div v-show="expiredTooltip" 
                            class="finance-progress__progress-tooltip finance-progress__progress-tooltip--expired"
                        >
                            {{currency(arrears)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                    <div @mouseleave="closeTooltip" v-if="!productLimit"
                        @mouseenter="showCurrentTooltip" 
                        class="finance-progress__progress-current" 
                        :style="{width:setCurrentWidth + '%'}"
                    >
                        <div v-show="currentTooltip" 
                            class="finance-progress__progress-tooltip finance-progress__progress-tooltip--current"
                        >
                            {{currency(totalPay - arrears)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                </div>
                <div class="finance-progress__progress-price">
                    <div class="finance-progress__progress-start-price"> 
                        {{limit.start}} {{ $tc('text.currency') }}
                    </div>
                    <div class="finance-progress__progress-finish-price"> 
                        {{currency(limit.limit)}} {{ $tc('text.currency') }}
                    </div>
                </div>
            </div>
            <!-- Progress Bar ending -->

            <div class="finance-progress__info">
                <div class="finance-progress__list">
                    <div class="finance-progress__item">
                        <div class="finance-progress__text" v-if="productLimit">
                            {{ $tc('profile_finance.limit.shipped_orders') }}
                        </div>
                        <div class="finance-progress__text" v-else>
                            {{ $tc('profile_finance.credit_debt.total') }}
                        </div>
                        <div class="finance-progress__price" v-if="productLimit">
                            {{currency(shippedOrders)}} {{ $tc('text.currency') }}
                        </div>
                        <div class="finance-progress__price" v-else>
                            {{currency(totalPay)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                    <div class="finance-progress__item finance-progress__item--processing">
                        <div class="finance-progress__text">
                            {{ $tc('profile_finance.limit.processing_orders') }}
                        </div>
                        <div class="finance-progress__price">
                            {{currency(totalPay - shippedOrders)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                    <div class="finance-progress__item"
                        :class="{'finance-progress__item--expired':arrears > 0}"
                    >
                        <div class="finance-progress__text">
                            {{ $tc('profile_finance.credit_debt.expired') }}
                            <span class="finance-progress__date-text" v-if="!dashboard && arrears > 0"> ({{ nextPayment.date }})</span>
                        </div>
                        <div class="finance-progress__price">
                            {{currency(arrears)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                    <div class="finance-progress__item finance-progress__item--next-payment" 
                        v-if="arrears === 0"
                    >
                        <div class="finance-progress__text">
                            {{ $tc('profile_finance.credit_debt.next_payment') }} 
                            <span class="finance-progress__date-text"> ({{ nextPayment.date }})</span>
                        </div>
                        <div class="finance-progress__price">
                        {{currency(nextPayment.sum)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                </div>
                <!-- After dash -->
                <!-- Product Limit balnce -->
                <div class="finance-progress__payment finance-progress__payment--balance">
                    <div class="finance-progress__payment-text">{{ $tc('profile_finance.limit.remains') }}</div>
                    <div class="finance-progress__payment-price">
                        {{currency(limit.limit - totalPay)}} {{ $tc('text.currency') }}
                    </div>
                </div>
                <!-- end of Product Limit balance -->
                <div class="finance-progress__payment finance-progress__payment--next-payment" v-if="!dashboard && arrears === 0">
                    <div class="finance-progress__payment-text">
                        {{ $tc('profile_finance.credit_debt.next_payment_sum') }}
                        <span class="finance-progress__date-text"> ({{ nextPayment.date }})</span>
                    </div>
                    <div class="finance-progress__payment-price">
                        {{currency(nextPayment.sum)}} {{ $tc('text.currency') }}
                    </div>
                </div>
                <div class="finance-progress__payment">
                    <a href="" class="finance-progress__payment-link">
                        {{ $tc('profile_finance.title.charges', leftCharges) }}
                    </a>
                    <div class="finance-progress__payment-text" v-if="!dashboard && arrears > 0">{{ $tc('profile_finance.credit_debt.delay') }}</div>
                    <div class="finance-progress__payment-text" v-else-if="!dashboard && arrears === 0">{{ $tc('profile_finance.credit_debt.left_days') }}</div>
                    <div class="finance-progress__payment-price finance-progress__payment-price--bold" v-if="dashboard">
                        {{currency(totalPay - arrears)}} {{ $tc('text.currency') }}
                    </div>
                    <div class="finance-progress__payment-price finance-progress__payment-price--expired"
                        :class="{'finance-progress__payment-price--expired': arrears > 0,
                            'finance-progress__payment-price--next-payment': arrears === 0
                        }" 
                        v-else
                    >
                        <span v-if="arrears > 0">- </span>{{ $tc('profile_finance.days', Math.abs(nextPayment.days)) }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name:"finance-progress",
        props: {
            financeCharges: {
                type: Array,
                required: true
            },
            dashboard: {
                type: Boolean,
                default: true
            },
            productLimit: {
                type: Boolean,
                default: false
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
                shippedOrders: 0,
                totalPay: 0,
                arrears: 0,
                nextPayment: {},
                leftCharges: 0
            }
        },
        methods:{
            showLongerTooltip(){
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
                    if (item.shipped) {
                        this.shippedOrders += item.sum
                    }
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
            },
            setTotalWidth(){
                return this.totalPay * 100 / this.limit.limit
            }
        },
        created() {
            this.count;
        }
    }
</script>