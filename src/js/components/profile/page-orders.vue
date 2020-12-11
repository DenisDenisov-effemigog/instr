<template>
    <div class="order">
        <div class="order__header">
            <h2 class="order__title">Список заказов</h2>
        </div>
        <div class="order__info">
            <div class="order__info-icon">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__wanted'"></use>
                </svg>
            </div>
            <div class="order__info-text">
                В этом разделе вы найдете информацию о заказах, сделанных на сайте
            </div>
        </div>
        <select-list></select-list>
        <div class="order__main">
            <ul class="order__list">
                <li class="order__item">
                    <div class="order__desc">
                        <div class="order__number">#325214</div>
                        <div class="order__date">31.12.2020</div>
                        <div class="order__status">Выполнен</div>
                        <div class="order__qty">1 000 000 товаров</div>
                        <div class="order__price">1 000 819.27 RON</div>
                        <div class="order__btn">
                            <div class="order__btn-icon">
                                <svg>
                                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__repeat'"></use>
                                </svg>
                            </div>
                            <div class="order__btn-text">
                                Повторить заказ
                            </div>
                        </div>
                        <div class="order__arrow">
                            <svg>
                                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                            </svg>
                        </div>
                    </div>
                </li>
                <li class="order__item">
                    <div class="order__desc">
                        <div class="order__number">#325214</div>
                        <div class="order__date">31.12.2020</div>
                        <div class="order__status">Выполнен</div>
                        <div class="order__qty">1 000 000 товаров</div>
                        <div class="order__price">1 000 819.27 RON</div>
                        <div class="order__btn">
                            <div class="order__btn-icon">
                                <svg>
                                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__repeat'"></use>
                                </svg>
                            </div>
                            <div class="order__btn-text">
                                Повторить заказ
                            </div>
                        </div>
                        <div class="order__arrow">
                            <svg>
                                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                            </svg>
                        </div>
                    </div>
                </li>
                <li class="order__item">
                    <div class="order__desc">
                        <div class="order__number">#325214</div>
                        <div class="order__date">31.12.2020</div>
                        <div class="order__status">Выполнен</div>
                        <div class="order__qty">4 товарa</div>
                        <div class="order__price">3 219.27 RON</div>
                        <div class="order__btn">
                            <div class="order__btn-icon">
                                <svg>
                                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__repeat'"></use>
                                </svg>
                            </div>
                            <div class="order__btn-text">
                                Повторить заказ
                            </div>
                        </div>
                        <div class="order__arrow">
                            <svg>
                                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                            </svg>
                        </div>
                    </div>
                    <ul class="order__product-list">
                        <li class="order__product-item">
                            <div class="order__product-number">325214</div>
                            <div class="order__product-desc">Trimmer pe benzina GT-52S...</div>
                            <div class="order__product-qty">12</div>
                            <div class="order__product-item-price">65 RON</div>
                            <div class="order__product-all-price">910.30 RON</div>
                            <div class="order__product-discount">10%</div>
                            <div class="order__product-total-price">810.30 RON</div>
                        </li>
                        <li class="order__product-item">
                            <div class="order__product-number">325214</div>
                            <div class="order__product-desc">Trimmer pe benzina GT-52S...</div>
                            <div class="order__product-qty">12</div>
                            <div class="order__product-item-price">65 RON</div>
                            <div class="order__product-all-price">910.30 RON</div>
                            <div class="order__product-discount">10%</div>
                            <div class="order__product-total-price">810.30 RON</div>
                        </li>
                        <li class="order__product-item">
                            <div class="order__product-number">325214</div>
                            <div class="order__product-desc">Trimmer pe benzina GT-52S...</div>
                            <div class="order__product-qty">12</div>
                            <div class="order__product-item-price">65 RON</div>
                            <div class="order__product-all-price">910.30 RON</div>
                            <div class="order__product-discount">10%</div>
                            <div class="order__product-total-price">810.30 RON</div>
                        </li>
                        <li class="order__product-item">
                            <div class="order__product-number">325214</div>
                            <div class="order__product-desc">Trimmer pe benzina GT-52S...</div>
                            <div class="order__product-qty">12</div>
                            <div class="order__product-item-price">65 RON</div>
                            <div class="order__product-all-price">910.30 RON</div>
                            <div class="order__product-discount">10%</div>
                            <div class="order__product-total-price">810.30 RON</div>
                        </li>
                    </ul>
                </li>
                <li class="order__item">
                    <div class="order__desc">
                        <div class="order__number">#325214</div>
                        <div class="order__date">31.12.2020</div>
                        <div class="order__status">Выполнен</div>
                        <div class="order__qty">1 000 000 товаров</div>
                        <div class="order__price">1 000 819.27 RON</div>
                        <div class="order__btn">
                            <div class="order__btn-icon">
                                <svg>
                                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__repeat'"></use>
                                </svg>
                            </div>
                            <div class="order__btn-text">
                                Повторить заказ
                            </div>
                        </div>
                        <div class="order__arrow">
                            <svg>
                                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                            </svg>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import selectList from './select-list.vue'
export default {
 components: { selectList },
    name:"page-orders",
    props:{
    }
}
</script>