<template>
    <div class="finance__layout">
        <h4 class="finance__subtitle">{{ $tc('profile_finance.title.payable') }}</h4>
        <div class="finance-prgs-crcl">
            <vue-ellipse-progress
                :progress="progressBar"
                :angle="angle"
                :color="color"
                empty-color="#D0D6DC"
                :size="184"
                :thickness="24"
                :empty-thickness="24"
                :gap="2"
                animation="reverse 700 1000"
                :legend="false"
                line="butt"
            >
                <div class="finance-prgs-crcl__days"
                    :class="{'finance-prgs-crcl__days--error': arrears}"
                    slot="legend-caption"
                >
                    <span v-if="arrears">- </span>
                    {{ $tc('profile_finance.days', leftDays) }}
                </div>
            </vue-ellipse-progress>
            <div class="finance-prgs-crcl__text"
                :class="{'finance-prgs-crcl__text--error': arrears}"
                v-if="arrears"
            >
                Поставки временно заблокированы до погашения просроченной дебиторской задолженности!
            </div>
            <div class="finance-prgs-crcl__text" v-else>
                <span>Осталось до даты погашения задолженности.</span>
                <span>Оплатить до: <span class="finance-prgs-crcl__payment-date">22.12.2020</span></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'accounts-payable',
        props: {
            financeCharges: {
                type: Array
            }
        },
        data() {
            return {
                angle: -90,
                color: '#357ADE',
                limit: 30,
                arrears: false
            }
        },
        computed: {
            charges() {
                return this.financeCharges
            },
            latestArrears() {
                let latest = {}
                this.charges.forEach(item => {
                    if (!!item.latest) latest = {...item}
                })
                return latest
            },
            progressBar() {
                return (Math.abs(this.latestArrears.days) / this.limit) * 100
            },
            changeColor() {
                if (this.latestArrears.days < 1) {
                    this.color = '#FF0000';
                    this.arrears = true;
                } else {
                    this.color = '#357ADE';
                    this.arrears = false;
                }
            },
            leftDays() {
                return Math.abs(this.latestArrears.days)
            }
        },
        created() {
            this.changeColor
        }
    }
</script>
