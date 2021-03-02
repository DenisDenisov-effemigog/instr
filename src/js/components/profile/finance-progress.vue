<template>
    <div class="finance-progress" @click="passIndex">
        <div class="finance-progress__head">
            <h3 class="finance-progress__title">{{ $tc('profile_finance.title.payable') }}</h3>
        </div>
        <div class="finance-progress__main"
            :class="{'finance-progress__main--no-debt': !dashboard && finance.arrears === 0}"
             v-if="contract.length"
        >
            <!-- Progress Bar -->
            <div class="finance-progress__progress">
                <div  class="finance-progress__progress-line">
                    <!-- for Product Limit -->
                    <div @mouseleave="closeTooltip" v-if="productLimit"
                        @mouseenter="showBgTooltip" 
                        class="finance-progress__progress-bg" 
                    >
                        <div v-show="bgTooltip" 
                            class="finance-progress__progress-tooltip finance-progress__progress-tooltip--current"
                        >
                            {{currency(bgTooltipDesc)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                    <div @mouseleave="closeTooltip" v-if="productLimit" 
                        @mouseenter="showCurrentTooltip" 
                        class="finance-progress__progress-current" 
                        :style="{width:setTotalWidth + '%'}"
                    >
                        <div v-show="currentTooltip" 
                            class="finance-progress__progress-tooltip finance-progress__progress-tooltip--current"
                        >
                            {{currency(finance.debt)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                    <!-- end of Product Limit -->
                    <div @mouseleave="closeTooltip" v-if="!productLimit"
                        @mouseenter="showBgTooltip" 
                        class="finance-progress__progress-bg" 
                    >
                        <div v-show="bgTooltip" 
                            class="finance-progress__progress-tooltip finance-progress__progress-tooltip--current"
                        >
                            {{currency(bgTooltipDesc)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                    <div @mouseleave="closeTooltip" v-if="!productLimit && finance.arrears > 0" 
                        @mouseenter="showLongerTooltip" 
                        class="finance-progress__progress-expired" 
                        :style="{width:setExpiredWidth + '%'}"
                    >
                        <div v-show="expiredTooltip" 
                            class="finance-progress__progress-tooltip finance-progress__progress-tooltip--expired"
                        >
                            {{currency(finance.arrears)}} {{ $tc('text.currency') }}
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
                            {{currency(finance.debt - finance.arrears)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                </div>
                <div class="finance-progress__progress-price">
                    <div class="finance-progress__progress-start-price"> 
                        0 {{ $tc('text.currency') }}
                    </div>
                    <div class="finance-progress__progress-finish-price"> 
                        {{currency(finance.limit)}} {{ $tc('text.currency') }}
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
                            {{currency(finance.debt)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                    <div class="finance-progress__item finance-progress__item--processing">
                        <div class="finance-progress__text">
                            {{ $tc('profile_finance.limit.processing_orders') }}
                        </div>
                        <div class="finance-progress__price">
                            {{currency(finance.debt - shippedOrders)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                    <div class="finance-progress__item"
                        :class="{'finance-progress__item--expired':finance.arrears > 0}"
                    >
                        <div class="finance-progress__text">
                            {{ $tc('profile_finance.credit_debt.expired') }}
                            <span class="finance-progress__date-text" v-if="!dashboard && finance.arrears > 0"> ({{ nextPayment.date }})</span>
                        </div>
                        <div class="finance-progress__price">
                            {{currency(finance.arrears)}} {{ $tc('text.currency') }}
                        </div>
                    </div>
                    <div class="finance-progress__item finance-progress__item--next-payment" 
                        v-if="finance.arrears === 0"
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
                        {{currency(finance.limit - finance.debt)}} {{ $tc('text.currency') }}
                    </div>
                </div>
                <!-- end of Product Limit balance -->
                <div class="finance-progress__payment finance-progress__payment--next-payment" v-if="!dashboard && finance.arrears === 0">
                    <div class="finance-progress__payment-text">
                        {{ $tc('profile_finance.credit_debt.next_payment_sum') }}
                        <span class="finance-progress__date-text"> ({{ nextPayment.date }})</span>
                    </div>
                    <div class="finance-progress__payment-price">
                        {{currency(nextPayment.sum)}} {{ $tc('text.currency') }}
                    </div>
                </div>
                <div class="finance-progress__payment">  
                    <span class="finance-progress__payment-link"> {{ $tc('profile_finance.title.charges', leftCharges) }}</span>
                    <div class="finance-progress__payment-text" v-if="!dashboard && finance.arrears > 0">{{ $tc('profile_finance.credit_debt.delay') }}</div>
                    <div class="finance-progress__payment-text" v-else-if="!dashboard && finance.arrears === 0">{{ $tc('profile_finance.credit_debt.left_days') }}</div>
                    <div class="finance-progress__payment-price finance-progress__payment-price--bold" v-if="dashboard">
                        {{currency(finance.debt - finance.arrears)}} {{ $tc('text.currency') }}
                    </div>
                    <div class="finance-progress__payment-price finance-progress__payment-price--expired"
                        :class="{'finance-progress__payment-price--expired': finance.arrears > 0,
                            'finance-progress__payment-price--next-payment': finance.arrears === 0
                        }" 
                        v-else
                    >
                        <span v-if="finance.arrears > 0">- </span>{{ $tc('profile_finance.days', Math.abs(nextPayment.days)) }}
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="dashboard-contract__item dashboard-contract__item--info">
            <span>{{ $tc('profile.dashboard.contract_item_info') }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:"finance-progress",
        props: {
            finance: {
                type: Object,
                required: true
            },
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
            },
            contract: {
                required: true
            }
        },
        data(){
            return{
                currentTooltip: false,
                expiredTooltip: false,
                bgTooltip: false,
                shippedOrders: 0,
                nextPayment: {},
                leftCharges: 0,
                bgDesc: 0
            }
        },
        methods:{
            showLongerTooltip(){
                this.expiredTooltip = true
            },
            showCurrentTooltip(){
                this.currentTooltip = true
            },
             showBgTooltip(){
                this.bgTooltip = true
            },
            closeTooltip(){
                if(this.expiredTooltip){
                    this.expiredTooltip = false
                }else if(this.currentTooltip){
                    this.currentTooltip = false
                }else{
                    this.bgTooltip = false
                }
            },
            passIndex(){
                this.$eventBus.$emit("passIndex", 4)
            }
        },
        computed:{
            count(){
                let arrearsQty = 0
                this.financeCharges.forEach(item => {
                    if (item.shipped) {
                        this.shippedOrders += item.sum
                    }
                    if (item.days < 0) {
                        arrearsQty++
                    }
                    if (item.latest) this.nextPayment = {...item};
                })
                this.leftCharges = this.financeCharges.length - arrearsQty
            },
            bgTooltipDesc(){
                return this.finance.limit - this.finance.debt
            },
            setCurrentWidth(){
                let width = (this.finance.debt - this.finance.arrears) * 100 / this.finance.limit
                if (width >= 100) width = 100
                return width
            },
            setExpiredWidth(){
                if(this.finance.arrears > 0){
                    return this.finance.debt * 100 / this.finance.limit
                }
            },
            setTotalWidth(){
                return this.finance.debt * 100 / this.finance.limit
            }
        },
        created() {
            this.count;
        }
    }
</script>