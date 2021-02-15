<template>
    <div class="finance__layout">
        <h4 class="finance__subtitle">{{ $tc('profile_finance.history') }}</h4>
        <ul class="finance__list" :class="{'finance__list--expanded': expanded}">
            <li class="finance__item finance__item--head">
                <div class="finance__sum">{{ $tc('profile_finance.sum') }}</div>
                <div class="finance__date">{{ $tc('profile_finance.date') }}</div>
                <div class="finance__operation">{{ $tc('profile_finance.operation') }}</div>
                <div class="finance__code finance__code--head">{{ $tc('profile_finance.operation_code') }}</div>
            </li>
            <li v-for="item in operationHistory" class="finance__item">
                <div class="finance__sum" 
                        :class="{'finance__sum--red': item.status}" 
                ><span v-if="item.status">-</span><span v-else>+</span>{{item.sum}} {{ $tc('text.currency') }}</div>
                <div class="finance__date">{{item.date}} {{ $tc('text.in') }} {{item.time}}</div>
                <div class="finance__operation">
                    <span>{{ item.operation }}</span>
                    <span 
                        class="finance__operation-number"
                        v-show="item.operationNumber && item.operation === $tc('profile_finance.purchasing')"
                    >
                        #{{item.operationNumber}}
                    </span>
                </div>
                <div class="finance__code">{{item.code}}</div>
                <div class="finance__order">#{{item.order}}</div>
            </li>
        </ul>
        <a v-if="!expanded && operationHistory.length > 4" 
            class="profile__link profile__link--center" 
            @click.prevent="expanded = true"
        >
            {{ $tc('profile_finance.deploy') }}
            <svg viewBox="-7 -6 20 20" class="finance__expand-arrow">
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
            </svg>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'operation-history',
        props: {
            financeHistory: {
                type: Array
            }
        },
        data() {
            return {
                expanded: false,
            }
        },
        computed: {
            operationHistory() {
                return this.financeHistory
            }
        }
    }
</script>

<style>

</style>