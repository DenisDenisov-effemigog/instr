<template>
    <div class="order-modal">
        <div class="order-modal__title">Повторить заказ #325214</div>
        <div class="order-modal__text">Все товары из этого заказа автоматически добавятся в корзину.</div>
        <div class="order-modal__special">
            <div class="order-modal__special_title">К сожалению этих товаров в данный момент нет в наличии:</div>
            <ul class="order-modal__special_list">
                <li class="order-modal__special_item">
                    <div class="order-modal__special_img">
                        <img src="./demo_images/product/image_52.png" alt="">
                    </div>
                    <div class="order-modal__special_info">
                        <div class="order-modal__special_article">Артикул: 325214</div>
                        <div class="order-modal__special_desc">Триммер бензиновый DT 52, 52 см3, 3 л. с...</div>
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
    
}
</script>