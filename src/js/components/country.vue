<template>
    <div class="country" :class="{'country-open': openedCountry}">
        <div @click="closeChoiceCountry" class="country__bg"></div>
        <div class="country__wrapper"> 
            <div class="country-container">
                <div class="country__choice">
                    <h2 class="country__choice-title">Выбор страны</h2>
                    <ul class="country__choice-list">
                        <li v-for="country in countries" class="country__choice-item">
                            <a @click="choiceCountry(country)" href="#" class="country__choice-link" :class="{'country__choice-link-active': currentLink == countries.indexOf(country)}">
                                {{country}}
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- <div class="country__map">
                    <img :src="templatePath + 'images/country/map.png'" alt="" class="country__map-pic">
                </div> -->
                <div @click="closeChoiceCountry" class="country__close">
                    <div class="country__close-text">Закрыть</div>
                    <svg class="country__close-pic" viewBox="0 0 12 12">
                        <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                    </svg>
                </div>
            </div>
            <div class="country__map">
                <!-- <img :src="templatePath + 'images/country/globus.png'" alt="" class="country__map-pic"> -->
                <img :src="templatePath + 'images/country/map-dots.png'" alt="" class="country__map-pic">
            </div>
        </div>
    </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
    name: "country",
    props: {
        countries: {required: true}
    },
    directives: {
        ClickOutside
    },
    data(){
        return{
            openedCountry: false,
            currentLink: 7
        }
    },
    created() {
            this.$eventBus.$on("open-country", this.openCountry)
        },
    methods:{
        closeChoiceCountry(){
            if(window.innerWidth > 760) {
                if(event.toElement.className !== 'topnav__switch-text') {
                    this.openedCountry = false
                    this.$eventBus.$emit("closeCountry")
                } 
            }
            this.toggleHtmlOverflow('auto')
        },
        choiceCountry(country){
            this.currentLink = this.countries.indexOf(country)
            this.$eventBus.$emit("countryName", this.countries[this.currentLink])
        },
        openCountry(){
            this.openedCountry = !this.openedCountry
            if(this.openedCountry === true){
                this.toggleHtmlOverflow('hidden')
            }else{
                this.toggleHtmlOverflow('auto')
            }
        }
    },
}
</script>