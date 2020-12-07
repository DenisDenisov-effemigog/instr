<template>
    <div v-show="openFlag" class="modal">
        <div class="modal-bg"></div>
        <div class="modal-wrapper">
            <div class="modal-desc">
                <h3 class="modal-title">Третий в подарок!</h3>
                <div class="modal-text">Здесь отображена текстовая информация об условиях акции, ее сроках, товарах, которые принимают участие, а так же что-нибудь еще.</div>
                <div @click="closeModal" class="modal-btn">Понятно!</div>
            </div>
            <div class="modal__close" @click="closeModal">
                <svg class="modal__close-icon" viewBox="0 0 12 12">
                    <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            openFlag:false
        }
    },
    created(){
        this.$eventBus.$on("openModal", this.openModal)
    },
    methods:{
        openModal(){
            document.querySelector('body').classList.add('body-fixed')
            document.querySelector('html').style.overflow = 'scroll';
            this.openFlag = true
        },
        closeModal(){
            this.openFlag = false
            document.querySelector('body').classList.remove('body-fixed')
            document.querySelector('html').style.overflow = 'auto';
        }
    }
}
</script>