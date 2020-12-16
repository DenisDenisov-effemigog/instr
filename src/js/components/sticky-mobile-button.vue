<template>
    <div class="sticky-mobile-button" v-if="showButton">
        <a v-if="flag" href="" class="sticky-mobile-button__button">{{ titlePartFirst }} <span>{{ items }}&nbsp;{{ titlePartSecond }}</span></a>
        <component v-else is="add-to-cart" 
                   :text="'В корзине'"
                   :button-title="'Добавить в корзину'"
                   :size="'big'"
                   :productId="productId"
                   :maxAmount="maxAmount"
        ></component>
    </div>
    
</template>

<script>
import addToCart from './card/add-to-cart.vue'

export default {
    name: "sticky-mobile-button",
    components: {
        addToCart
    },
    props: {
        productId: {
            type: Number,
        },
        maxAmount: {
            type: Number,
        },
    },
    data(){
        return{
            showButton: false,
            items: 0,
            titlePartFirst: '',
            titlePartSecond: '',
            flag: true
        }
    },
    created() {
        this.$eventBus.$on("sow-button", this.sowButton);
        this.$eventBus.$on("hide-button", this.hideButton);
        this.$eventBus.$on("openStickyButton", this.sowButton);
        this.$eventBus.$on("closeStickyButton", this.hideButton);
    },
    methods:{
        sowButton(firstPart, items, secondPart) {
            if(items || secondPart){
                this.flag = true
            }else{
                this.flag = false
            }
            this.showButton = true
            this.items = items
            this.titlePartFirst = firstPart
            this.titlePartSecond = secondPart
        },
        hideButton() {
            this.showButton = false
        }
    },
}
</script>