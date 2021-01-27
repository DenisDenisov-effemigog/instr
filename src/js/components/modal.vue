<template>
    <div v-show="open" class="modal" :class="{'modal--user': modal==='user'}">
        <div class="modal-bg" @click="closeOutside"></div>
        <div class="modal-wrapper"
             :class="{'modal-wrapper_big': modalBigger, 'modal-wrapper_profile': !showCloseBtn}"
        >
            <div class="breadcrumbs" v-if="!showCloseBtn" @click="closeModal">
                <svg class="breadcrumbs__back" viewBox="0 0 18 15">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
                </svg>
                <span>{{ $tc('link.back') }}</span>
            </div>
            <div class="modal-desc" v-if="modal === 'promo'">
                <h3 class="modal-title">{{ $tc('modal.title.action') }}</h3>
                <div class="modal-text">{{ $tc('modal.text.action') }}</div>
                <div @click="closeModal" class="modal-btn">{{ $tc('modal.link.action') }}</div>
            </div>
            <div class="modal-slider" v-else-if="modal === 'product-card'">
                <component is="photo-modal" :productImages="props"></component>
            </div>
            <div class="modal__video" v-else-if="modal === 'openVideo'">
                <iframe :src="props" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="modal_profile-edit" v-else-if="modal === 'profile-edit'">
                <h3 class="modal-title modal-title--centered">{{ $tc('modal.title.profile_edit') }}</h3>
                <component is="edit-profile" :person="props"></component>
            </div>
            <div class="modal_profile-edit" v-else-if="modal === 'profile-password'">
                <h3 class="modal-title modal-title--centered">{{ $tc('modal.title.password_edit') }}</h3>
                <component is="change-password"></component>
            </div>
            <div class="modal_profile-edit" v-else-if="modal === 'profile-delete'">
                <h3 class="modal-title">{{ $tc('modal.title.profile_delete') }}</h3>
                <component is="delete-profile"></component>
            </div>
            <div class="modal_profile-edit" v-else-if="modal === 'new-address'">
                <h3 class="modal-title">{{ $tc('modal.title.address_add') }}</h3>
                <component is="add-address"></component>
            </div>
            <div class="modal_profile-edit" v-else-if="modal === 'delete-address'">
                <h3 class="modal-title modal-title--centered">{{ $tc('modal.title.address_remove') }}</h3>
                <div class="modal-text">{{ $tc('modal.text.address_remove') }}</div>
                <div @click="closeModal" class="modal-btn">{{ $tc('modal.link.address_remove') }}</div>
            </div>
            <div class="modal_profile-edit" v-else-if="modal === 'repeat-order'">
                <component is="repeat-order" :products="props"></component>
            </div>
            <div class="modal_profile-edit" v-else-if="modal === 'user'">
                <h3 class="modal-title modal-title--centered">{{ $tc('modal.title.auth') }}</h3>
                <component is="user" :selected="props"></component>
            </div>
            <div class="modal_filters" v-else-if="modal === 'filters'">
                <div class="modal_filters-sticky">
                    <div class="modal_filters-sticky__icon" @click="closeModal">
                        <svg>
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
                        </svg>
                    </div>
                    <h3 class="modal-title">{{ $tc('filters.title') }}</h3>
                    <filter-clear-btn :mobileFlag=true></filter-clear-btn>
                </div>
                <slot name="listingcat"></slot>
                <component is="filters" :filters="props"></component>
            </div>
            <div class="modal-desc" v-else-if="modal === 'dialogue'">
                <h3 class="modal-title modal-title--centered">{{ $tc(props[0]) }}</h3>
                <div class="modal-text modal-text--higher">{{ $tc(props[1]) }}</div>
                <div @click="clearCart" class="modal-btn" v-if="$tc(props[0]) == 'Очистить корзину'">
                    {{ $tc('modal.link.clear_cart') }}
                </div>
            </div>
            
            <div class="modal__close" @click="closeModal" v-if="showCloseBtn">
                <span v-if="modalBigger">{{ $tc('link.close') }}</span>
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
    import photoModal from "./product-card/photo-modal.vue"
    import filters from "./listing/filters/filters.vue"
    import stickyMobileButton from "./sticky-mobile-button.vue"
    import ClickOutside from "vue-click-outside"
import FilterClearBtn from './listing/filters/filter-clear-btn.vue'

export default {
    name: 'modal',
    components: {
        photoModal,
        editProfile,
        changePassword,
        deleteProfile,
        addAddress,
        filters,
        stickyMobileButton,
        FilterClearBtn
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
            showCloseBtn: true
        }
    },
    created(){
        this.$eventBus.$on("openModal", this.openModal)
    },
    beforeDestroy(){
        this.$eventBus.$off('openModal');
    },
    methods:{
        openModal(modal, props, modalSize, closeBtn){
            this.toggleHtmlOverflow('hidden')
            this.open = true
            this.modal = modal //Название модального окна, которое должно открыться
            this.props = props //передаём нужные пропсы
            this.modalBigger = modalSize //передаём true, если нужно большое модальное окно
            if (window.innerWidth < 1024) {
                this.showCloseBtn = closeBtn //передаём true, если хотим чтобы вместо хлебных крошек был крестик
            }
        },
        closeModal(){
            this.open = false
            this.modal = ''
            this.props = []
            this.modalBigger = false
            this.$eventBus.$emit("deleteActive");
            this.$eventBus.$emit("hide-button");
            this.toggleHtmlOverflow('auto')
        },
        closeOutside(event) {
            if(event.toElement.className !== '') {
                this.closeModal() 
            }
        },
        clearCart() {
            this.$store.dispatch('basketClear');
            this.closeModal();
        }
    },
    
}
</script>