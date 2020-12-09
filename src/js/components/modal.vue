<template>
    <div v-show="openFlag" class="modal">
        <div class="modal-bg"></div>
        <div class="modal-wrapper"
             :class="{'modal-wrapper--big': modal !== 'promo'}"
             @focusout="focused = false"
             v-click-outside="closeOutside"
        >
            
            <div class="modal-desc" v-if="modal === 'promo'">
                <h3 class="modal-title">Третий в подарок!</h3>
                <div class="modal-text">Здесь отображена текстовая информация об условиях акции, ее сроках, товарах, которые принимают участие, а так же что-нибудь еще.</div>
                <div @click="closeModal" class="modal-btn">Понятно!</div>
            </div>
            <div class="modal-slider" v-else-if="modal === 'product-card'">
                <component is="photo-modal" :productImages="props"></component>
            </div>
            <div class="modal__video" v-else-if="modal === 'openVideo'">
                <iframe :src="props" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="modal__close" @click="closeModal">
                <span v-if="modal !== 'promo'">Закрыть</span>
                <svg 
                    class="modal__close-icon" 
                    :class="{'modal__close-icon--black': modal !== 'promo'}" 
                    viewBox="0 0 12 12"
                >
                    <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    import photoModal from "./poduct-card/photo-modal.vue"
    import ClickOutside from "vue-click-outside";

export default {
    name: 'modal',
    components: {
        photoModal,
    },
    directives: {
        ClickOutside
    },
    data(){
        return{
            openFlag: false,
            focused: false,
            modal: '',
            props: [],
        }
    },
    created(){
        this.$eventBus.$on("openModal", this.openModal)
    },
    methods:{
        openModal(modal, props){
            // document.querySelector('.page').classList.add('page_fixed')
            // document.querySelector('html').style.overflowY = 'hidden';
            this.openFlag = true
            this.focused = true
            this.modal = modal
            this.props = props
        },
        closeModal(){
            this.openFlag = false
            this.focused = false
        },
        closeOutside() {
            let vm = this
            if (vm.focused) {
                vm.openFalg = false
            }
        }
    },
    computed: {
        close() {
            if (this.openFlag === false) {
                this.$eventBus.$emit("deleteActive");
                document.querySelector('.page').classList.remove('page_fixed');
                document.querySelector('html').style.overflow = 'auto';
            } else {
                document.querySelector('.page').classList.add('page_fixed')
                document.querySelector('html').style.overflowY = 'hidden';
            }
        }
    }
    
}
</script>