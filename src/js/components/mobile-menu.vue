<template>
    <div v-if="openModal" class="mobile-menu">
        <div 
            class="mobile-menu__content"
            :class="{'mobile-menu__content--short': menuLink === 'home'}"
        >
            <component :countries="countries" is="home-menu" v-if="menuLink === 'home'"></component>
            <div></div>
        </div>
    </div>
</template>

<script>
import homeMenu from './header/mobile/home-menu.vue'

export default {
    name: "mobile-menu",
    components: {
        homeMenu,
    },
    props: {
        countries: {required: true}
    },
    data(){
        return{
            openModal: false,
            menuLink: 'home'
        }
    },
    created() {
        this.$eventBus.$on("open-menu", this.openMenuModal)
        this.$eventBus.$on("close-menu", this.closeMenuModal)
    },
    methods:{
        openMenuModal(link){
            document.querySelector('html').style.overflow = 'hidden';
            this.openModal = true;
            this.menuLink = link;
        },
        closeMenuModal(){
            document.querySelector('html').style.overflow = 'auto';
            this.openModal = false;
        },
    },
}
</script>