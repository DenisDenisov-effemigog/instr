<template>
    <div class="delivery-payment">
        <div class="delivery-payment__title">Способ оплаты</div>
        <form action="" class="delivery-payment__form">
            <label name="pay" class="delivery-payment__radio">
                <input name="pay" type="radio" value="advance" v-model="payMethod">
                <span class="delivery-payment__check"></span>
                <div class="delivery-payment__radio-label">
                    <span class="delivery-payment__radio-title">Предоплата</span>
                    <span class="delivery-payment__radio-text">Скидка 5% при оплате онлайн</span>
                </div>
            </label>
            <label name="pay" class="delivery-payment__radio">
                <input name="pay" type="radio" value="receipt" v-model="payMethod">
                <span class="delivery-payment__check"></span>
                <div class="delivery-payment__radio-label">
                    <span class="delivery-payment__radio-title">Оплата при получении</span>
                    <span class="delivery-payment__radio-text">Скидка 5% при оплате онлайн</span>
                </div>
            </label>
            <label name="pay" class="delivery-payment__radio">
                <input name="pay" type="radio" value="contract" v-model="payMethod">
                <span class="delivery-payment__check"></span>
                <div class="delivery-payment__radio-label">
                    <span class="delivery-payment__radio-title">Оплата по договору</span>
                    <span class="delivery-payment__radio-text">Способ оплаты для существующих клиентов. Оплата OP, BO (заказной билет), чек, оплата наличными по квитанции продавца.</span>
                </div>
            </label>
        </form>
    </div>
</template>

<script>
export default {
    name:"delivery-payment",
    data(){
        return{
            payMethod:'advance'
        }
    }
}
</script>