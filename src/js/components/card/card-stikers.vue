<template>
    <div class="card__stickers-wrap"
        @mouseenter="openTooltip"
        @mouseleave="closeTooltip"
        @click="openTooltipClick"
         ref="stickers"
    >
        <div
            class="card__stickers-sticker"
            :class="'card__stickers-sticker--' + tooltip.status"
            
        >
            <span>{{ tooltip.title }}</span>
        </div>
        <div class="card__sticker-tooltip" 
             :class="{'card__sticker-tooltip-open': open, 
             'card__sticker-tooltip--rigth': moveTooltip,
             'card__sticker-tooltip--left': moveTooltipLeft,
             'card__sticker-tooltip--right-desc': moveTooltipRight,}"
             ref="tooltip"
        >
            <div>
                <div>{{ tooltip.text }}</div>
                <a :href="tooltip.link">{{ $tc('link.details') }}</a>
            </div>
            <svg @click.stop="closeTooltip" viewBox="0 0 12 12">
                <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name:"card-stikers",
    data(){
        return{
            tooltipId: 0,
            currentIndex: 0,
            open: false,
            moveTooltip: false,
            moveTooltipLeft: false,
            moveTooltipRight: false,
        }
    },
    props:{
        tooltip:{
            type: Object,
            required: true,
        },
        cardPosition:{
            type: Number
        }
    },
    methods:{
        openTooltip(){
            this.open = true
            let tooltip = this.$refs.stickers
            let c = tooltip.getBoundingClientRect()
            let tooltipX = c.left + c.width
            if (tooltipX < 350) {
                this.moveTooltipLeft = true
                this.moveTooltipRight = false
            } else if (tooltipX > 1490) {
                this.moveTooltipLeft = false
                this.moveTooltipRight = true
            }
            
        },
        closeTooltip(){
            this.open = false
            this.moveTooltip = false
            this.moveTooltipLeft = false
            this.moveTooltipRight = false
        },
        openTooltipClick() {
            this.open = true
            let tooltip = this.$refs.tooltip
            let c = tooltip.getBoundingClientRect()
            let tooltipX = c.left + c.width
            let windowWidth = window.screen.availWidth
            if(windowWidth < tooltipX){
                this.moveTooltip = true
            }
        },
    }
}
</script>