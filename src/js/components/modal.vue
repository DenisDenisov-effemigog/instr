<template>
    <div v-show="open" class="modal">
        <div class="modal-bg" @click="closeOutside"></div>
        <div class="modal-wrapper"
             :class="{'modal-wrapper--big': modalBigger}"
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
            <div class="modal__profile-edit" v-else-if="modal === 'profile-edit'">
                <h3 class="modal-title modal-title_centered">Изменение данных</h3>
                <component is="edit-profile" :person="props"></component>
            </div>
            <div class="modal__profile-edit" v-else-if="modal === 'profile-password'">
                <h3 class="modal-title modal-title_centered">Изменение пароля</h3>
                <component is="change-password"></component>
            </div>
            <div class="modal__profile-edit" v-else-if="modal === 'profile-delete'">
                <h3 class="modal-title">Выберите причину удаления профиля:</h3>
                <component is="delete-profile"></component>
            </div>
            <div class="modal__profile-edit" v-else-if="modal === 'new-address'">
                <h3 class="modal-title">Добавление нового адреса доставки</h3>
                <component is="add-address"></component>
            </div>
            <div class="modal__profile-edit" v-else-if="modal === 'repeat-order'">
                <component is="repeat-order"></component>
            </div>
            <div class="modal__profile-edit" v-else-if="modal === 'user'">
                <h3 class="modal-title modal-title_centered">Авторизоваться</h3>
                <component is="user"></component>
            </div>
            
            <div class="modal__close" @click="closeModal">
                <span v-if="modalBigger">Закрыть</span>
                <svg 
                    class="modal__close-icon" 
                    :class="{'modal__close-icon--black': modalBigger}" 
                    viewBox="0 0 12 12"
                >
                    <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import editProfile from './profile/page-modals/edit-profile.vue'
    import changePassword from './profile/page-modals/change-password.vue'
    import deleteProfile from './profile/page-modals/delete-profile.vue'
    import addAddress from './profile/page-modals/add-address.vue'
    import photoModal from "./poduct-card/photo-modal.vue"
    import ClickOutside from "vue-click-outside"

export default {
    name: 'modal',
    components: {
        photoModal,
        editProfile,
        changePassword,
        deleteProfile,
        addAddress,
    },
    directives: {
        ClickOutside
    },
    data(){
        return{
            open: false,
            modal: '',
            props: [],
            modalBigger: false,
        }
    },
    created(){
        this.$eventBus.$on("openModal", this.openModal)
    },
    beforeDestroy(){
        this.$eventBus.$off('openModal');
    },
    methods:{
        openModal(modal, props, modalSize){
            document.querySelector('html').style.overflowY = 'hidden';
            this.open = true
            this.modal = modal
            this.props = props
            this.modalBigger = modalSize
        },
        closeModal(){
            this.open = false
            this.modal = ''
            this.props = []
            this.modalBigger = false
            this.$eventBus.$emit("deleteActive");
            document.querySelector('html').style.overflow = 'auto';
        },
        closeOutside(event) {
            if(event.toElement.className !== '') {
                this.closeModal() 
            }
        }
    },
    
}
</script>