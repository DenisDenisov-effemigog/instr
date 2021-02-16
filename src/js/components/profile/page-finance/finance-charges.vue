<template>
    <div class="finance__layout">
        <h4 class="finance__subtitle" v-if="arrears">{{ $tc('profile_finance.title.arrears') }}</h4>
        <h4 class="finance__subtitle" v-else>{{ $tc('profile_finance.title.charges', ) }}</h4>
        <ul class="finance-charges"
            :class="{'finance-charges--arrears': arrears, 'finance-charges--expanded': expanded}"
        >
            <li class="finance-charges__item finance-charges__item--head">
                <div class="finance-charges__sum">{{ $tc('profile_finance.head.sum') }}</div>
                <div class="finance-charges__date">{{ $tc('profile_finance.head.date') }}</div>
                <div class="finance-charges__left-days">{{ $tc('profile_finance.head.left_days') }}</div>
            </li>
            <li class="finance-charges__item" v-for="item in charges" v-if="arrears && item.days < 0">
                <div class="finance-charges__sum">{{ item.sum }} {{ $tc('text.currency') }}</div>
                <div class="finance-charges__date">{{ item.date }}</div>
                <div class="finance-charges__left-days finance-charges__left-days--arrears">
                    - {{ $tc('profile_finance.days', -item.days) }}
                </div>
            </li>
            <li class="finance-charges__item" v-for="item in charges" v-if="!arrears && item.days >= 0">
                <div class="finance-charges__sum">{{ item.sum }} {{ $tc('text.currency') }}</div>
                <div class="finance-charges__date">{{ item.date }}</div>
                <div class="finance-charges__left-days">
                    {{ $tc('profile_finance.days', item.days) }}
                </div>
            </li>
        </ul>
        <a v-if="arrears && !expanded && lengthOfArrears > 3" 
            class="profile__link" 
            @click.prevent="expanded = true"
        >
            {{ $tc('profile_finance.deploy_fees') }}
            <svg viewBox="-7 -6 20 20">
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
            </svg>
        </a>
        <a v-else-if="!arrears && !expanded && lengthOfNotArrears > 3"
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
                notArrearsLength: 0
            }
        },
        computed: {
            charges() {
                return this.financeCharges
            },
            lengthOfArrears() {
                let count=0
                for (let i=0; i<this.charges.length; i++) {
                    if (this.charges[i].days < 0) count++
                }
                return count
            },
            lengthOfNotArrears() {
                let count=0
                for (let i=0; i<this.charges.length; i++) {
                    if (this.charges[i].days >= 0) count++
                }
                return count
            },
        }
    }
</script>

<style>

</style>