<template>
    <div class="order-modal">
        <div class="order-modal__title">Повторить заказ #{{ products.orderNumber }}</div>
        <div class="order-modal__text">Все товары из этого заказа автоматически добавятся в корзину.</div>
        <div class="order-modal__special"
             v-if="products.products.length"
        >
            <div class="order-modal__special_title">К сожалению этих товаров в данный момент нет в наличии:</div>
            <ul class="order-modal__special_list">
                <li class="order-modal__special_item"
                    v-for="product in products.products"
                >
                    <div class="order-modal__special_img">
                        <img :src="product.img" alt="">
                    </div>
                    <div class="order-modal__special_info">
                        <div class="order-modal__special_article">Артикул: {{ product.art }}</div>
                        <div class="order-modal__special_desc"> {{ product.desc }} </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="order-modal__btn">Перейти в корзину</div>
    </div>
</template>

<script>
export default {
    name:'repeat-order',
    props: {
        products: {
            required: true,
            type: Object
        }  
    },
}
</script>