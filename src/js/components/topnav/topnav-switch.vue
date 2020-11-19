<template>
    <div class="topnav__switch">
            <div class="topnav__switch-pic">
                <img src="./images/header/icons/arrow.svg" alt="открыть" class="topnav__switch-pic-icon" :class="{'topnav__switch-pic-icon_opened': openedModal}">
            </div>
            <div @click="clickToCountry" class="topnav__switch-text">Toolsworld/{{country}}</div>
    </div>
</template>

<script>
import country from '../country.vue';

export default {
    name: 'topnav-switch',
    data(){
        return{
            country: 'Румыния',
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
            this.openedModal = !this.openedModal
        }
    },
    created(){
        this.$eventBus.$on('countryName', this.countryName)
        this.$eventBus.$on('closeCountry', this.closeCountry)
    }
}
</script>