<template>
    <div class="country country-close">
        <div class="country__bg"></div>
        <div class="country-wrapper">
            <div class="country-container">
                <div class="country__choice">
                    <h2 class="country__choice-title">Выбор страны</h2>
                    <ul class="country__choice-list">
                        <li v-for="item in countryArr" :key=item class="country__choice-item">
                            <a href="#" class="country__choice-link">
                                {{item}}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="country__map">
                    <img src="./images/country/map.png" alt="" class="country__map-pic">
                </div>
                <div class="country__close">
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
    }
}
</script>