<template>
    <div class="country" :class="{'country-open': openedCountry}">
        <div class="country__bg" :class="{'country__bg-open': openedCountry}"></div>
        <div class="country__wrapper" :class="{'country__wrapper-open': openedCountry}">
            <div class="country-container">
                <div class="country__choice">
                    <h2 class="country__choice-title">Выбор страны</h2>
                    <ul class="country__choice-list">
                        <li v-for="item in countryArr" :key=item class="country__choice-item">
                            <a @click="choiceCountry" href="#" class="country__choice-link">
                                {{item}}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="country__map">
                    <img src="./images/country/map.png" alt="" class="country__map-pic">
                </div>
                <div @click="closeChoiceCountry" class="country__close">
                    <div class="country__close-text">Закрыть</div>
                    <div class="country__close-pic">
                        <img src="./images/country/icons/close.svg" alt="" class="country__close-pic-icon">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "country",
    data(){
        return{
            countryArr:['Белоруссия','Казахстан','Румыния','Болгария','Польша','США','Венгрия','Россия','Украина'],
            openedCountry: false
        }
    },
    created() {
            this.$eventBus.$on("open-country", this.openCountry)
        },
    methods:{
        closeChoiceCountry(){
            this.openedCountry =!this.openedCountry
            this.$eventBus.$emit("closeCountry")
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
            this.openedCountry =!this.openedCountry
        }
    },
}
</script>