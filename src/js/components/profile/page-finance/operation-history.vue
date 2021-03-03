<template>
    <div class="finance__layout">
        <h4 class="finance__subtitle">{{ $tc('profile_finance.title.history') }}</h4>
        <ul class="finance-history" :class="{'finance-history--expanded': expanded}">
            <li class="finance-history__item finance-history__item--head">
                <div class="finance-history__sum">{{ $tc('profile_finance.head.sum') }}</div>
                <div class="finance-history__date">{{ $tc('profile_finance.head.date_time') }}</div>
                <div class="finance-history__operation">{{ $tc('profile_finance.head.operation') }}</div>
                <div class="finance-history__code finance-history__code--head">{{ $tc('profile_finance.head.operation_code') }}</div>
            </li>
            <li v-for="item in operations" class="finance-history__item">
                <div class="finance-history__sum" 
                        :class="{'finance-history__sum--red': item.status}" 
                ><span v-if="item.status">-</span><span v-else>+</span>{{ currency(item.sum) }} {{ $tc('text.currency') }}</div>
                <div class="finance-history__date">{{item.date}} {{ $tc('text.in') }} {{item.time}}</div>
                <div class="finance-history__operation">
                    <span>{{ $tc(item.operation) }}</span>
                    <span 
                        class="finance-history__operation-number"
                        v-show="item.order && $tc(item.operation) === $tc('profile_finance.purchasing')"
                    >
                        #{{item.order}}
                    </span>
                </div>
                <div class="finance-history__code">{{item.code}}</div>
                <div class="finance-history__order" 
                     v-show="item.order && $tc(item.operation) === $tc('profile_finance.purchasing')"
                >#{{item.order}}</div>
            </li>
        </ul>
        <a v-if="!expanded && operations.length > 4" 
            class="profile__link profile__link--center" 
            @click.prevent="expanded = true"
        >
            {{ $tc('profile_finance.deploy') }}
            <svg viewBox="-7 -6 20 20">
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
            operations() {
                return this.financeHistory
            }
        }
    }
</script>

<style>

</style>