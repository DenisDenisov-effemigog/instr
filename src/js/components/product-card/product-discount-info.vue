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
            <div class="discount-info__progress-bar">
                <vue-ellipse-progress 
                    :progress="progressPrice"
                    :color="'#049004'"
                    empty-color="rgba(145, 148, 152, 0.16)"
                    :size="48"
                    :thickness="2"
                    :empty-thickness="2"
                    animation="default 700 1000"
                    :legend="false"
                    line="round"
                >
                    <span class="discount-info__progress-discount"
                        slot="legend-caption"
                    >
                        {{ discount }}%
                    </span>
                </vue-ellipse-progress>
            </div>
            <div class="discount-info__progress-text">Добавьте в корзину товары категории <span>Силовое</span> на сумму 
                <span>{{ currency(sum) }} {{ $tc('text.currency') }}</span> и скидка увеличится на <span class="discount-info__progress-text--discount">{{ discount }}%</span>
            </div>
        </div>
        <div class="discount-info__link" @click="openModal">
            <svg viewBox="0 0 13 13">
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
        },
        rightPrice: {
            Type: Number,
            required: true
        }
    },
    data() {
        return {
            progress: 0
        }
    },
    methods: {
        openModal() {
            
        }
    },
    computed: {
        progressPrice() {
            if (this.sum >= this.rightPrice) {
                this.progress = 100;
            } else {
                this.progress = this.sum/this.rightPrice*100;
            }
            return this.progress
        },
        sum() {
            const basketData = this.$store.getters.basketProductsSummary;
            return parseFloat((basketData.price).toFixed(3));
        }
    },
}
</script>
