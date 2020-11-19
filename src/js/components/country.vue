<template>
    <div class="country country-close">
        <div class="country__bg"></div>
        <div class="country__wrapper">
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
            countryArr:['Белоруссия','Казахстан','Румыния','Болгария','Польша','США','Венгрия','Россия','Украина']
        }
    },
    methods:{
        closeChoiceCountry(){
            let country = document.querySelector('.country')
            let countryBg = country.firstElementChild
            let countryWrap = countryBg.nextElementSibling
            let topnavIcon = document.querySelector('.topnav__switch-pic-icon')
            country.classList.toggle('country-close')
            countryBg.classList.toggle('country__bg-open')
            countryWrap.classList.toggle('country__wrapper-open')
            topnavIcon.classList.toggle('topnav__switch-pic-icon_opened')
        },
        choiceCountry(e){
            let a = e.target
            let countryLinkActive = document.querySelectorAll('.country__choice-link-active')
            if(countryLinkActive.length > 0 && a !== countryLinkActive[0])
                countryLinkActive[0].classList.remove('country__choice-link-active')
            a.classList.toggle('country__choice-link-active')
            this.$eventBus.$emit("countryName", a.textContent)
        }
    }
}
</script>