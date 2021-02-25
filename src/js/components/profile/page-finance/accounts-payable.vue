<template>
    <div class="finance__layout">
        <div class="columns">
            <div class="finance__progress-bar finance__progress-bar--payable">
                <h4 class="finance__subtitle">{{ $tc('profile_finance.title.payable') }}</h4>
                <component is="finance-progress" 
                           :financeCharges="financeCharges"
                           :dashboard="false"
                           :contract="contract"
                ></component>
            </div>
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
                    :animation="animation"
                    :legend="false"
                    line="butt"
                >
                    <div class="finance-prgs-crcl__days"
                        :class="{'finance-prgs-crcl__days--error': arrears}"
                        slot="legend-caption"
                    >
                        <span v-if="arrears">- </span>
                        {{ $tc('profile_finance.days', Math.abs(this.latestArrears.days)) }}
                    </div>
                </vue-ellipse-progress>
                <div class="finance-prgs-crcl__text"
                    :class="{'finance-prgs-crcl__text--error': arrears}"
                    v-if="arrears"
                >
                    Поставки временно заблокированы до погашения просроченной дебиторской задолженности!
                </div>
                <div class="finance-prgs-crcl__text" v-else>
                    <span>Осталось до даты погашения задолженности. Оплатить до:&nbsp;
                        <span class="finance-prgs-crcl__payment-date">{{ this.latestArrears.date }}</span>
                    </span>
                </div>
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
            },
            contract: {
                required: true
            }
        },
        data() {
            return {
                angle: -90,
                color: '#357ADE',
                limit: 30,
                arrears: false,
                animation: 'reverse 700 400'
            }
        },
        computed: {
            latestArrears() {
                let latest = {}
                this.financeCharges.forEach(item => {
                    if (item.latest) latest = {...item}
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
                    this.animation = 'default 700 400'
                } else {
                    this.color = '#357ADE';
                    this.arrears = false;
                    this.animation = 'reverse 700 400'
                }
            },
        },
        created() {
            this.changeColor
        }
    }
</script>
