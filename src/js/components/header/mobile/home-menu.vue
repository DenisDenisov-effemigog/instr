<template>
    <div class="home-menu">
        <ul class="home-menu__links">
            <li v-for="link in links">
                <a :href="link.link" class="home-menu__link">
                    <span>{{ $tc(link.title) }}</span>
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
                    <a :href="country.url"
                        class="home-menu__link_sublink"
                        :class="{'home-menu__link_sublink--active': activeCountry === country.title}"
                    >
                        <span>{{ country.title }}</span>
                        <svg v-if="activeCountry === country.title"> 
                            <use :xlink:href="templatePath + 'images/sprite.svg#check'"></use>
                        </svg>
                    </a>
                </div>
            </li>
        </ul>
        <div class="home-menu__info">
            <div class="home-menu__info_link">
                <svg viewBox="0 0 16 16">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__phone'"></use>
                </svg>
                <span>{{ $tc('nav.tel') }}</span>
            </div>
            <div class="home-menu__info_link">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__pin'"></use>
                </svg>
                <span>{{ $tc('nav.city') }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import config from "../../../config";
    
    export default {
        name: 'home-menu',
        props: {
            countries: {required: true},
            activeCountry: {
                required: true,
                type: String
            }
        },
        data(){
            return{
                showCountry: false,
                links: [
                    {title: 'nav.title.about', link: config.links.about},
                    {title: 'nav.branches', link: config.links.branches},
                    {title: 'nav.points_of_purchases', link: config.links.points},
                    {title: 'nav.cooperation', link: config.links.cooperation},
                    {title: 'nav.brands', link: config.links.brands},
                    {title: 'nav.discounts', link: config.links.shares},
                ]
            }
        },
        methods: {
            openCountry() {
                this.showCountry = !this.showCountry
            },
            chooseCountry(country){
                this.showCountry = false;
            },
        }
    }
</script>
