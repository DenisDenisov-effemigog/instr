<template>
    <div class="finance__layout" v-if="financeCharges.length">
        <h4 class="finance__subtitle" v-if="arrears">{{ $tc('profile_finance.title.arrears') }}</h4>
        <h4 class="finance__subtitle" v-else>
            {{ $tc('profile_finance.title.charges', financeCharges.length) }} {{ currency(sum) }} {{ $tc('text.currency') }}
        </h4>
        <ul class="finance-charges"
            :class="{'finance-charges--arrears': arrears, 'finance-charges--expanded': expanded}"
        >
            <li class="finance-charges__item">
                <div class="profile__table-header finance-charges__sum"><span>{{ $tc('profile_finance.head.sum') }}</span></div>
                <div class="profile__table-header finance-charges__date"><span>{{ $tc('profile_finance.head.date') }}</span></div>
                <div class="profile__table-header finance-charges__left-days"><span>{{ $tc('profile_finance.head.left_days') }}</span></div>
            </li>
            <li class="finance-charges__item"
                v-for="(item, index) in charges"
                :key="index"
                v-if="arrears && financeCharges.length"
            >
                <div class="finance-charges__sum"><span>{{ currency(item.sum) }} {{ $tc('text.currency') }}</span></div>
                <div class="finance-charges__date"><span>{{ item.date }}</span></div>
                <div class="finance-charges__left-days finance-charges__left-days--arrears">
                    <span>- {{ $tc('profile_finance.days', item.days) }}</span>
                </div>
            </li>
            <li class="finance-charges__item"
                v-for="(item, index) in charges"
                :key="index"
                v-if="!arrears && financeCharges.length"
            >
                <div class="finance-charges__sum"><span>{{ currency(item.sum) }} {{ $tc('text.currency') }}</span></div>
                <div class="finance-charges__date"><span>{{ item.date }}</span></div>
                <div class="finance-charges__left-days">
                    <span>{{ $tc('profile_finance.days', item.days) }}</span>
                </div>
            </li>
        </ul>
        <a v-if="arrears && !expanded && financeCharges.length > 3" 
            class="profile__link" 
            @click.prevent="expanded = true"
        >
            {{ $tc('profile_finance.deploy_fees') }}
            <svg viewBox="-7 -6 20 20">
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
            </svg>
        </a>
        <a v-else-if="!arrears && !expanded && financeCharges.length > 3"
            class="profile__link" 
            @click.prevent="expanded = true"
        >
            {{ $tc('profile_finance.deploy_fees') }}
            <svg viewBox="-7 -6 20 20">
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
            </svg>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'finance-charges',
        props: {
            financeCharges: {
                type: Array
            },
            arrears: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                expanded: false,
            }
        },
        computed: {
            charges() {
                return this.financeCharges
            },
            sum() {
                let sum = 0;
                this.charges.forEach(item => {
                    sum += item.sum
                })
                return sum
            },
        }
    }
</script>

<style>

</style>