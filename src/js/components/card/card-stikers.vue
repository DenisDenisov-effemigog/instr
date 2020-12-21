<template>
    <div class="card__stickers_sticker-wrap"
        @mouseenter="openTooltip"
        @mouseleave="closeTooltip"
        @click="openTooltip"
    >
        <div
            class="card__stickers_sticker card__stickers_sticker--new"
            :class="'card__stickers_sticker--' + tooltip.status"
        >
            <span>{{ tooltip.title }}</span>
        </div>
        <div class="card__stickers_sticker-tooltip" :class="{'card__stickers_sticker-tooltip-open': open}"
        >
            <div>
                <div>{{ tooltip.text }}</div>
                <a :href="tooltip.link">Подробнее</a>
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
            open: false
        }
    },
    props:{
        tooltip:{
            type: Object,
            required: true,
        },
        index:{
            type: Number
        }
    },
    methods:{
        openTooltip(){
            this.open = true
            /*let tooltip = this.tooltip
            let c = tooltip.getBoundingClientRect()
            let tooltipX = c.left + c.width
            let windowWidth = window.screen.availWidth
            if(windowWidth < tooltipX){
                tooltip.classList.add('card__stickers_sticker-tooltip--rigth')
            }*/
        },
        closeTooltip(){
            this.open = false
        },
    }
}
</script>