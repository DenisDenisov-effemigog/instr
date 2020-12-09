<template>
    <div class="country" :class="{'country-open': openedCountry}">
        <div @click="closeChoiceCountry" class="country__bg" :class="{'country__bg-open': openedCountry}"></div>
        <div class="country__wrapper" :class="{'country__wrapper-open': openedCountry}"> 
            <div class="country-container">
                <div class="country__choice">
                    <h2 class="country__choice-title">Выбор страны</h2>
                    <ul class="country__choice-list">
                        <li v-for="country in countries" class="country__choice-item">
                            <a @click="choiceCountry" href="#" class="country__choice-link">
                                {{country}}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="country__map">
                    <img src="./images/country/map.png" alt="" class="country__map-pic">
                </div>
                <div @click="closeChoiceCountry" class="country__close">
                    <div class="country__close-text">Закрыть</div>
                    <svg class="country__close-pic" viewBox="0 0 12 12">
                        <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                    </svg>
                </div>
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
            openedCountry: false
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
            document.querySelector('body').classList.remove('body-fixed')
            document.querySelector('html').style.overflow = 'auto';
        },
        choiceCountry(e){
            let a = e.target
            let countryLinkActive = document.querySelectorAll('.country__choice-link-active')
            if(countryLinkActive.length > 0 && a !== countryLinkActive[0])
                countryLinkActive[0].classList.remove('country__choice-link-active')
            a.classList.toggle('country__choice-link-active')
            this.$eventBus.$emit("countryName", a.textContent)
        },
        openCountry(){
            this.openedCountry = !this.openedCountry
            document.querySelector('body').classList.toggle('body-fixed')
            if(document.querySelector('body').classList.contains('body-fixed')){
                document.querySelector('html').style.overflow = 'hidden';
            }else{
                document.querySelector('html').style.overflow = 'auto';
            }
        }
    },
}
</script>