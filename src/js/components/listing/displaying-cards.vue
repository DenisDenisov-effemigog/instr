<template>
    <div class="displaying">
        <div class="displaying__block displaying__block_mobile">
            <div class="displaying__button"
                :class="{'displaying__button--active': activeDisplaying === 'grid'}"
                @click="changeDisplaying('list')"
            >
                <svg class="displaying__icon displaying__icon_grid">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__view-grid'"></use>
                </svg>
            </div>
            <div class="displaying__button"
                :class="{'displaying__button--active': activeDisplaying === 'list'}"
                @click="changeDisplaying('grid')"
            >
                <svg class="displaying__icon displaying__icon_rows">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__view-rows'"></use>
                </svg>
            </div>
        </div>
        <div class="displaying__block displaying__block_desktop">
            <div class="displaying__button"
                :class="{'displaying__button--active': activeDisplaying === 'grid'}"
                @click="changeDisplaying('grid')"
            >
                <svg class="displaying__icon displaying__icon_grid">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__view-grid'"></use>
                </svg>
            </div>
            <div class="displaying__button"
                :class="{'displaying__button--active': activeDisplaying === 'list'}"
                @click="changeDisplaying('list')"
            >
                <svg class="displaying__icon displaying__icon_rows">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__view-rows'"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "displaying-cards",
        components: {
        },
        props: {
        },
        data(){
            return{
                activeDisplaying: 'grid',
            }
        },
        methods:{
            changeDisplaying(item){
                this.activeDisplaying = item
            },
        },
    }
</script>