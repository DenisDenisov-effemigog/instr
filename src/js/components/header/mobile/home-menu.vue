<template>
    <div class="home-menu">
        <ul class="home-menu__links">
            <li>
                <a href="" class="home-menu__link">
                    <span>О компании</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="home-menu__link">
                    <span>Филиалы</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="home-menu__link">
                    <span>Где купить</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="home-menu__link">
                    <span>Условия сотрудничества</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="home-menu__link">
                    <span>Бренды</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <a href="" class="home-menu__link">
                    <span>Акции</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </a>
            </li>
            <li>
                <div 
                    class="home-menu__link home-menu__link--closed" 
                    :class="{'home-menu__link--opened': showCountry}"
                    @click="openCountry"
                >
                    <span>{{ activeCountry }}</span>
                    <svg viewBox="0 0 6 10">
                        <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                    </svg>
                </div>
                <div 
                    class="home-menu__link_content" 
                    v-if="showCountry" v-for="country in countries"
                >
                    <div
                        class="home-menu__link_sublink"
                        :class="{'home-menu__link_sublink_active': activeCountry === country}"
                        @click="chooseCountry(country)"
                    >
                        <span>{{ country }}</span>
                        <svg v-if="activeCountry === country"> 
                            <use :xlink:href="templatePath + 'images/sprite.svg#check'"></use>
                        </svg>
                    </div>
                </div>
            </li>
        </ul>
        <div class="home-menu__info">
            <div class="home-menu__info_link">
                <svg viewBox="0 0 16 16">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__phone'"></use>
                </svg>
                <span>+4 0371 166 478</span>
            </div>
            <div class="home-menu__info_link">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__pin'"></use>
                </svg>
                <span>Москва</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home-menu',
        props: {
            countries: {required: true}
        },
        data(){
            return{
                showCountry: false,
                activeCountry: 'Румыния',
            }
        },
        methods: {
            openCountry() {
                this.showCountry = !this.showCountry
            },
            chooseCountry(country){
                this.activeCountry = country;
                this.showCountry = false;
            },
        }
    }
</script>
