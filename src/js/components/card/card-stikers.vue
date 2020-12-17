<template>
    <div class="card__stickers">
        <div 
            class="card__stickers_sticker-wrap" 
            v-for="tooltip in product.tooltips"
            @mouseenter="openTooltipMouse(product.id, tooltip.id)"
            @mouseleave="closeTooltip"
            @click="openTooltipClick(product.id, tooltip.id)"
            
        >   
            <div 
                class="card__stickers_sticker card__stickers_sticker--new"
                :class="'card__stickers_sticker--' + tooltip.status"
            >
                <span>{{ tooltip.title }}</span>
            </div>
            <div class="card__stickers_sticker-tooltip"
                :class="{'card__stickers_sticker-tooltip-open': productId == product.id && tooltipId == tooltip.id}">
                <div>
                    <div>{{ tooltip.text }}</div>
                    <a :href="tooltip.link">Подробнее</a>
                </div>
                <svg @click.stop="clickCloseTooltip" viewBox="0 0 12 12">
                    <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"card-stikers",
    data(){
        return{
            productId: 0,
            tooltipId: 0
        }
    },
    props:{
        product:{
            type: Object,
            required: true,
        }
    },
    methods:{
        openTooltipClick(id, id2){
            this.productId = id
            this.tooltipId = id2
            let tooltip = document.querySelector('.card__stickers_sticker-tooltip-open')
            console.log(id)
            console.log(id2)
            let c = tooltip.getBoundingClientRect()
            let tooltipX = c.left + c.width
            let windowWidth = window.screen.availWidth
            if(windowWidth < tooltipX){
                tooltip.classList.add('card__stickers_sticker-tooltip--rigth')
            }
        },
        openTooltipMouse(id, id2){
            this.productId = id
            this.tooltipId = id2
        },
        closeTooltip(){
            this.productId = 0
            this.tooltipId = 0
        },
        clickCloseTooltip(){
            this.productId = 0
            this.tooltipId = 0
        },
    }
}
</script>