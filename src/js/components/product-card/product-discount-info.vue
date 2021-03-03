<template>
    <div class="discount-info" v-if="authorized">
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
                        {{ discount[0].more_percent }}%
                    </span>
                </vue-ellipse-progress>
            </div>
            <div class="discount-info__progress-text">{{ $tc('product_card.progress.text_start') }} <span>{{ discount[0].category_name }}</span> {{ $tc('product_card.progress.text_middle') }} 
                <span>{{ currency(discount[0].remainder) }} {{ $tc('text.currency') }}</span> {{ $tc('product_card.progress.text_end') }}&nbsp;<span class="discount-info__progress-text--discount">{{ discount[0].more_percent }}%</span>
            </div>
        </div>
        <a href="" class="discount-info__link" @click.prevent="openModal">
            <svg viewBox="0 0 13 13">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__link'"></use>
            </svg>
            {{ $tc('product_card.link') }}
        </a>
    </div>
    <div class="discount-info" v-else>
        <div class="discount-info__offer">
            <div class="discount-info__offer-text">{{ $tc('product_card.offer.text') }}</div>
            <a class="discount-info__offer-btn"
               href="" 
               @click.prevent="openModal('user', 'reg')"
            >{{ $tc('product_card.offer.button') }}</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'product-discount-info',
        props: {
            authorized: {
                Type: Boolean,
                required: true
            },
            productDiscounts: {
                Type: Array,
                required: true
            }
        },
        data() {
            return {
                progress: 0
            }
        },
        computed: {
            progressPrice() {
                if (this.sum >= this.discount[0].next) {
                    this.progress = 100;
                } else {
                    this.progress = this.sum/this.discount[0].next*100;
                }
                return this.progress
            },
            sum() {
                return this.discount[0].next - this.discount[0].remainder
            },
            discount(){
                return this.productDiscounts.filter(item => item.type === 'сategory')
            },
        },
        methods: {
            // openModal(){
                
            // },
            openModal(modal, props) {
                this.$eventBus.$emit("openModal", modal, props, false, true)
            },
        },
    }
</script>
