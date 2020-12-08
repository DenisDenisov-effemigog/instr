<template>
    <div v-show="openFlag" class="modal">
        <div class="modal-bg"></div>
        <div class="modal-wrapper"
             :class="{'modal-wrapper--big': modal === 'product-card'}"
        >
            
            <div class="modal-desc" v-if="modal === 'promo'">
                <h3 class="modal-title">Третий в подарок!</h3>
                <div class="modal-text">Здесь отображена текстовая информация об условиях акции, ее сроках, товарах, которые принимают участие, а так же что-нибудь еще.</div>
                <div @click="closeModal" class="modal-btn">Понятно!</div>
            </div>
            <div class="modal-slider" v-else-if="modal === 'product-card'">
                <component is="photo-modal" :productImages="productImages"></component>
            </div>
            <div class="modal__close" @click="closeModal">
                <span v-if="modal === 'product-card'">Закрыть</span>
                <svg 
                    class="modal__close-icon" 
                    :class="{'modal__close-icon--black': modal === 'product-card'}" 
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
export default {
    name: 'modal',
    components: {
        photoModal,
    },
    data(){
        return{
            openFlag: false,
            modal: '',
            productImages: [],
        }
    },
    created(){
        this.$eventBus.$on("openModal", this.openModal)
    },
    methods:{
        openModal(modal, props){
            document.querySelector('body').classList.add('body-fixed')
            document.querySelector('html').style.overflowY = 'scroll';
            this.openFlag = true
            this.modal = modal
            this.productImages = props
        },
        closeModal(){
            this.openFlag = false
            document.querySelector('body').classList.remove('body-fixed')
            document.querySelector('html').style.overflow = 'auto';
        }
    }
}
</script>