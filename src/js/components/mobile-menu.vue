<template>
    <div v-if="openModal" class="mobile-menu">
        <div 
            class="mobile-menu__content"
            :class="{'mobile-menu__content--short': menuLink === 'home'}"
        >
            <component is="home-menu" 
                       :countries="countries" 
                       v-if="menuLink === 'home'"
            ></component>
<!--            <component is="profile-menu-mobile" v-if="menuLink === 'profile'"></component>-->
        </div>
    </div>
</template>

<script>
import homeMenu from './header/mobile/home-menu.vue'
import profileMenuMobile from './profile/profile-menu-mobile.vue'

export default {
    name: "mobile-menu",
    components: {
        homeMenu,
        profileMenuMobile,
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
            this.$eventBus.$emit('notActiveButton');
        },
        closeMenuModal(){
            document.querySelector('html').style.overflow = 'auto';
            this.openModal = false;
        },
    },
}
</script>