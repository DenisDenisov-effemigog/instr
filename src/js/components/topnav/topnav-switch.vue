<template>
    <div class="topnav__switch">
            <div class="topnav__switch-pic">
                <svg class="topnav__switch-pic-icon" :class="{'topnav__switch-pic-icon_opened': openedModal}" viewBox="0 0 10 6">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-top'"></use>
                </svg>
            </div>
            <div @click="clickToCountry" class="topnav__switch-text">{{ country }}</div>
    </div>
</template>

<script>

export default {
    name: 'topnav-switch',
    data(){
        return{
            country: 'Россия',
            openedModal: false
            
        }
    },
    methods:{
        clickToCountry(){
            this.openedModal = !this.openedModal
            this.$eventBus.$emit("open-country")
        },
        countryName(name){
            this.country = name
        },
        closeCountry(){
            this.openedModal = false;
        }
    },
    created(){
        this.$eventBus.$on('countryName', this.countryName)
        this.$eventBus.$on('closeCountry', this.closeCountry)
    }
}
</script>