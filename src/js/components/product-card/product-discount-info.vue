<template>
    <div class="discount-info">
        <!-- <div class="">
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__info-square'"></use>
            </svg>
            <div></div>
        </div>
        <div>На товар не распространяется скидка по обороту</div> -->
        <div class="discount-info__progress">
            <vue-ellipse-progress
                :progress="progressPrice"
                :color="'#049004'"
                empty-color="rgba(145, 148, 152, 0.16)"
                :size="48"
                :thickness="2"
                :empty-thickness="2"
                animation="default 700 1000"
                fontSize="0.875rem"
                :legend="false"
                line="round"
            >
                {{ discount }}%
            </vue-ellipse-progress>
            <div class="discount-info__progress-text">Добавьте в корзину товары категории <span>Силовое</span> на сумму 
                <span>{{ currency(sum) }} RON</span> и скидка увеличится до <span class="discount-info__progress-text--discount">{{ discount }}</span>%
            </div>
        </div>
        <div class="discount-info__link" @click="openModal">
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__link'"></use>
            </svg>
            Подробнее о системе скидок
        </div>
    </div>
</template>

<script>
export default {
    name: 'product-discount-info',
    props: {
        discount: {
            Type: Number,
            required: true
        }
    },
    data() {
        return {
            sum: 0
        }
    },
    computed: {

    }
}
</script>
