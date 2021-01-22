<template> <!--TODO не используется-->
    <div class="slider-promo__modal">
        <svg class="slider-promo__modal-icon">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__link'"></use>
        </svg>
        <p @click="openModal" class="slider-promo__modal-text">Подробнее об акции</p>
    </div>
</template>

<script>
export default {
    name:"slider-promo-modal",
    props:{
        tooltipFlag:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        openModal(){
            this.$eventBus.$emit("openModal", 'promo', '',false, true)
        },
    }
}
</script>