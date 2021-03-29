<template>
    <div ref="country" class="country" :class="{'country--open': openedCountry}">
        <div @click="closeChoiceCountry" class="country__bg" :class="{'country__bg--show': showBg}"></div>
        <div class="country__wrapper" :class="{'country__wrapper--show': showBg}"> 
            <div class="country__container">
                <div class="country__choice">
                    <h2 class="country__title">{{ $tc('country.choose_country') }}</h2>
                    <ul class="country__list">
                        <li v-for="country in countries"
                            :key="country.title"
                            class="country__choice-item"
                        >
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
        <div class="country__map-wrapper" :class="{'country__map-wrapper--show': showBg}">
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
                if(event.target.className !== 'topnav__switch-text') {
                    this.openedCountry = false
                    this.$eventBus.$emit("closeCountry")
                    this.toggleHtmlOverflow('initial')
                    this.showBg = false
                    setTimeout(() => {
                        this.$refs.country.style.zIndex = -1
                    }, 360);
                } 
            }
            this.toggleHtmlOverflow('initial')
        },
        openCountry(){
            this.openedCountry = !this.openedCountry
            if(this.openedCountry === true){
                this.toggleHtmlOverflow('hidden')
                this.showBg = true
                this.$refs.country.style.zIndex = 30
            }else{
                this.toggleHtmlOverflow('initial')
                this.showBg = false
                setTimeout(() => {
                    this.$refs.country.style.zIndex = -1
                }, 360);
            }
        }
    },
}
</script>