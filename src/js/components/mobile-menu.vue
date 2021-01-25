<template>
    <div v-if="openModal" class="mobile-menu" @click="closeOutside">
        <div 
            class="mobile-menu__content"
            :class="{'mobile-menu__content--short': menuLink === 'home'}"
        >
            <component is="home-menu" 
                       :countries="countries" 
                       v-if="menuLink === 'home'"
            ></component>
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
            this.toggleHtmlOverflow('hidden')
            this.openModal = true;
            this.menuLink = link;
            this.$eventBus.$emit('notActiveButton');
        },
        closeMenuModal(){
            this.toggleHtmlOverflow('auto')
            this.openModal = false;
        },
        closeOutside(event) {
            if(event.toElement.className === 'mobile-menu') {
                this.$eventBus.$emit("change-menu-icon") // меняем иконку моб.меню на бкргер
                this.closeMenuModal()
            }
        },
    },
}
</script>