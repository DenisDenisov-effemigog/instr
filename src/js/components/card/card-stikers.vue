<template>
    <div class="card__stickers">
        <div 
            class="card__stickers_sticker-wrap" 
            v-for="tooltip in tooltips"
            @mouseenter="openTooltipMouse(index, tooltip.id)"
            @mouseleave="closeTooltip"
            @click="openTooltipClick(index, tooltip.id)"
            
        >   
            <div 
                class="card__stickers_sticker card__stickers_sticker--new"
                :class="'card__stickers_sticker--' + tooltip.status"
            >
                <span>{{ tooltip.title }}</span>
            </div>
            <div class="card__stickers_sticker-tooltip" :class="{'card__stickers_sticker-tooltip-open': currentIndex == index && tooltipId == tooltip.id}"
                >
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
            tooltipId: 0,
            currentIndex: 0
        }
    },
    props:{
        tooltips:{
            type: Array,
            required: true,
        },
        index:{
            type: Number
        }
    },
    methods:{
        openTooltipClick(id, id2){
            this.currentIndex = id
            this.tooltipId = id2
            let tooltip = document.querySelector('.card__stickers_sticker-tooltip-open')
            let c = tooltip.getBoundingClientRect()
            let tooltipX = c.left + c.width
            let windowWidth = window.screen.availWidth
            if(windowWidth < tooltipX){
                tooltip.classList.add('card__stickers_sticker-tooltip--rigth')
            }
        },
        openTooltipMouse(id, id2){
            this.currentIndex = id
            this.tooltipId = id2
        },
        closeTooltip(){
            this.currentIndex = 0
            this.tooltipId = 0
        },
        clickCloseTooltip(){
            this.currentIndex = 0
            this.tooltipId = 0
        },
    }
}
</script>