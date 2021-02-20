<template>
    <div class="country" :class="{'country--open': openedCountry}">
        <div @click="closeChoiceCountry" class="country__bg" :class="{'country__bg--show': showBg}"></div>
        <div class="country__wrapper"> 
            <div class="country__container">
                <div class="country__choice">
                    <h2 class="country__title">{{ $tc('country.choose_country') }}</h2>
                    <ul class="country__list">
                        <li v-for="country in countries" class="country__choice-item">
                            <a :href="country.url" 
                               class="country__choice-link" 
                               :class="{'country__choice-link--active': activeCountry === country.title}"
                            >{{country.title}}</a>
                        </li>
                    </ul>
                </div>
                <!-- <div class="country__map">
                    <img :src="templatePath + 'images/country/map.png'" alt="" class="country__map-pic">
                </div> -->
                <div @click="closeChoiceCountry" class="country__close">
                    <div class="country__close-text">{{ $tc('link.close') }}</div>
                    <svg class="country__close-pic" viewBox="0 0 12 12">
                        <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="country__map-wrapper">
            <div class="country__map">
                <img :src="templatePath + 'images/country/globus.png'" alt="" class="country__map-pic">
                <!-- <img :src="templatePath + 'images/country/map-dots.png'" alt="" class="country__map-pic"> -->
            </div>
        </div>
    </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
    name: "country",
    props: {
        countries: {required: true},
        activeCountry: {
            required: true,
            type: String
        }
    },
    directives: {
        ClickOutside
    },
    data(){
        return{
            openedCountry: false,
            showBg: false,
        }
    },
    created() {
        this.$eventBus.$on("open-country", this.openCountry)
    },
    methods:{
        closeChoiceCountry(event){
            if(window.innerWidth > 760) {
                if(event.toElement.className !== 'topnav__switch-text') {
                    this.openedCountry = false
                    this.$eventBus.$emit("closeCountry")
                } 
            }
            this.toggleHtmlOverflow('auto')
        },
        openCountry(){
            this.openedCountry = !this.openedCountry
            if(this.openedCountry === true){
                this.toggleHtmlOverflow('hidden')
                setTimeout(() => {
                    this.showBg = true
                }, 150);
            }else{
                this.toggleHtmlOverflow('auto')
                this.showBg = false
            }
        }
    },
}
</script>