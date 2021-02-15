<template>
    <div class="finance">
        <h2 class="profile__title">{{ $tc('link.finance') }}</h2>
        <div class="finance__main">
            <ul class="finance__list">
                <li class="finance__item finance__item--head">
                    <div class="finance__sum">{{ $tc('profile_finance.sum') }}</div>
                    <div class="finance__date">{{ $tc('profile_finance.date') }}</div>
                    <div class="finance__operation">{{ $tc('profile_finance.operation') }}</div>
                    <div class="finance__code finance__code--head">{{ $tc('profile_finance.operation_code') }}</div>
                </li>
                <li v-for="item in checkDataAll" class="finance__item">
                    <div class="finance__sum" 
                         :class="{'finance__sum--red': item.status}" 
                    ><span v-if="item.status">-</span><span v-else>+</span>{{item.sum}} {{ $tc('text.currency') }}</div>
                    <div class="finance__date">{{item.date}} {{ $tc('text.in') }} {{item.time}}</div>
                    <div class="finance__operation">
                        <span>{{item.operation}}</span>
                        <span v-if="item.operationNumber">#{{item.operationNumber}}</span>
                    </div>
                    <div class="finance__code">{{item.code}}</div>
                    <div class="finance__order">#{{item.order}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:"page-finance",
    mounted() {
        this.$store.dispatch('personalUpdateCheckData');
        this.$eventBus.$emit('hideMenu')
    },
    computed: {
        checkDataAll() {
            return this.$store.state.personal.checkData;
        },
    }
}
</script>