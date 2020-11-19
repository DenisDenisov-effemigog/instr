<template>
    <div class="topnav__switch">
            <div class="topnav__switch-pic">
                <img src="./images/header/icons/arrow.svg" alt="открыть" class="topnav__switch-pic-icon">
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
            country: 'Румыния'
            
        }
    },
    methods:{
        clickToCountry(){
            let country = document.querySelector('.country')
            let countryBg = country.firstElementChild
            let countryWrap = countryBg.nextElementSibling
            let topnavIcon = document.querySelector('.topnav__switch-pic-icon')
            country.classList.toggle('country-close')
            countryBg.classList.toggle('country__bg-open')
            countryWrap.classList.toggle('country__wrapper-open')
            topnavIcon.classList.toggle('topnav__switch-pic-icon_opened')
        },
        countryName(name){
            this.country = name
        }
    },
    created(){
        this.$eventBus.$on('countryName', this.countryName)
    }
}
</script>