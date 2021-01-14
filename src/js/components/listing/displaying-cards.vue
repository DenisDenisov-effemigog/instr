<template>
    <div class="displaying">
        <div class="displaying__block displaying__block--mobile">
            <div class="displaying__button"
                :class="{'displaying__button--active': activeDisplaying === 'gridview'}"
                @click="changeDisplaying('horizview')"
            >
                <svg class="displaying__icon">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__view-grid'"></use>
                </svg>
            </div>
            <div class="displaying__button"
                :class="{'displaying__button--active': activeDisplaying === 'horizview'}"
                @click="changeDisplaying('gridview')"
            >
                <svg class="displaying__icon">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__view-rows'"></use>
                </svg>
            </div>
        </div>
        <div class="displaying__block displaying__block--desktop">
            <div class="displaying__button"
                :class="{'displaying__button--active': activeDisplaying === 'gridview'}"
                @click="changeDisplaying('gridview')"
            >
                <svg class="displaying__icon">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__view-grid'"></use>
                </svg>
            </div>
            <div class="displaying__button"
                :class="{'displaying__button--active': activeDisplaying === 'horizview'}"
                @click="changeDisplaying('horizview')"
            >
                <svg class="displaying__icon">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__view-rows'"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    import config from "../../config";
    
    export default {
        name: "displaying-cards",
        components: {
        },
        props: {
            activeView: {
                required: true
            }
        },
        data(){
            return{
                changedView: 'gridview'
            }
        },
        model: {
            prop: 'value',
            event: 'change',
        },
        computed: {
            activeDisplaying() {
                return this.$store.state.listing.view_mode
            },
        },
        mounted() {
            this.$store.dispatch('listingSetViewMode', this.activeView);
        },
        methods:{
            changeDisplaying(item){
                this.changedView = item
                this.$store.dispatch('listingSetViewMode', this.changedView);
                this.$eventBus.$emit(config.bus.applyView, this.changedView);
            },
        },
    }
</script>