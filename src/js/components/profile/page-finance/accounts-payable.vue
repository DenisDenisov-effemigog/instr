<template>
    <div class="finance__layout">
        <div class="columns">
            <div class="finance__progress-bar finance__progress-bar--payable">
                <h4 class="finance__subtitle">{{ $tc('profile_finance.title.payable') }}</h4>
                <component is="finance-progress"
                           :finance="finance"
                           :financeCharges="financeCharges"
                           :financeSchedule="financeSchedule"
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
                        {{ $tc('profile_finance.days', latestArrears.days) }}
                    </div>
                </vue-ellipse-progress>
                <div class="finance-prgs-crcl__text"
                    :class="{'finance-prgs-crcl__text--error': arrears}"
                    v-if="arrears"
                >
                    {{ $tc('profile_finance.progress_circle.delay-report') }}
                </div>
                <div class="finance-prgs-crcl__text" v-else>
                    <span>{{ $tc('profile_finance.progress_circle.report') }}&nbsp;
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
            finance: {
                type: Object,
                required: true
            },
            financeCharges: {
                type: Array,
                required: true
            },
            financeSchedule: {
                type: Array,
                required: true
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
                let vm = this
                if(vm.financeCharges.length){
                    return vm.financeCharges[0]
                } else {
                    return vm.financeSchedule[0]
                }
            },
            progressBar() {
                return (Math.abs(this.latestArrears.days) / this.limit) * 100
            },
            changeColor() {
                if (this.financeCharges.length) {
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
