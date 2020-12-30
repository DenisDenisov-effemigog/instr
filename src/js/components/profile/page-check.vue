<template>
    <div class="my-check">
        <h2 class="profile__title">Мой счет</h2>
        <div class="my-check__main">
            <ul class="my-check__list">
                <li class="my-check__item my-check__item--head">
                    <div class="my-check__sum">Сумма</div>
                    <div class="my-check__date">Время и дата</div>
                    <div class="my-check__operation">Операция</div>
                    <div class="my-check__code my-check__code--head">Код операции</div>
                </li>
                <li v-for="item in checkDataAll" class="my-check__item">
                    <div class="my-check__sum" 
                         :class="{'my-check__sum--red': item.status}" 
                    ><span v-if="item.status">-</span><span v-else>+</span>{{item.sum}} &#8381;</div>
                    <div class="my-check__date">{{item.date}} в {{item.time}}</div>
                    <div class="my-check__operation">
                        <span>{{item.operation}}</span>
                        <span v-if="item.operationNumber">#{{item.operationNumber}}</span>
                    </div>
                    <div class="my-check__code">{{item.code}}</div>
                    <div class="my-check__order">#{{item.order}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:"page-check",
    props:{
        /*profile: {
            required: true,
            type: Array,
        },*/
    },
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