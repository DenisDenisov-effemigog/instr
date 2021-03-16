<template>
    <div v-show="open" class="modal" :class="{'modal--user': modal==='user'}">
        <div class="modal__bg" @click="closeOutside"></div>
        <div class="modal__wrapper"
             :class="{'modal__wrapper--big': modalBigger, 'modal__wrapper--profile': !showCloseBtn}"
        >
            
            <div class="modal__close" 
                :class="{'modal__close--desktop': !showCloseBtn}"
                @click="closeModal(modal)"
            >
                <span v-if="modalBigger">{{ $tc('link.close') }}</span>
                <svg 
                    class="modal__close-icon" 
                    :class="{'modal__close-icon--black': modalBigger}" 
                    viewBox="0 0 12 12"
                >
                    <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                </svg>
            </div>
            <div class="modal__breadcrumbs breadcrumbs"
                :class="{'modal__breadcrumbs--mobile': !showCloseBtn}"
                @click="closeModal"
            >
                <svg class="breadcrumbs__back" viewBox="0 0 18 15">
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-left'"></use>
                </svg>
                <span>{{ $tc('link.back') }}</span>
            </div>

            <div class="modal__slider" v-if="modal === 'product-card'">
                <component is="photo-modal" :props="props" :currentSlide="currentSlide"></component>
            </div>
            <div class="modal__video" v-else-if="modal === 'openVideo'">
                <iframe :src="props" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="modal__profile-edit" v-else-if="modal === 'profile-edit'">
                <h3 class="modal__title modal__title--centered">{{ $tc('modal.title.profile_edit') }}</h3>
                <component is="edit-profile" :person="props" :phoneMask="phoneMask"></component>
            </div>
            <div class="modal__profile-edit" v-else-if="modal === 'profile-password'">
                <h3 class="modal__title modal__title--centered">{{ $tc('modal.title.password_edit') }}</h3>
                <component is="change-password"></component>
            </div>
            <div class="modal__profile-edit" v-else-if="modal === 'profile-delete'">
                <h3 class="modal__title" v-if="props[1] === 'profile'">{{ $tc('modal.title.profile_delete') }}</h3>
                <h3 class="modal__title" v-else-if="props[1] === 'address'">{{ $tc('modal.title.address_delete') }}</h3>
                <component is="delete-profile" v-if="props[1] === 'profile'" :reasons="props[0]" :type="props[1]" :id="props[2]"></component>
                <component is="delete-profile" v-else-if="props[1] === 'address'" :reasons="props[0]" :type="props[1]" :address="props[3]" :id="props[2]"></component>
            </div>
            <div class="modal__profile-edit" v-else-if="modal === 'new-address'">
                <h3 class="modal__title">{{ $tc('modal.title.address_add') }}</h3>
                <component is="add-address"></component>
            </div>
            <div class="modal__profile-edit" v-else-if="modal === 'repeat-order'">
                <component is="repeat-order" :products="props"></component>
            </div>
            <div class="modal__profile-edit" v-else-if="modal === 'user'">
                <h3 class="modal__title modal__title--centered">{{ $tc('modal.title.auth') }}</h3>
                <component is="user" :selected="props" :phoneMask="phoneMask"></component>
            </div>
            <div class="modal__filters" v-else-if="modal === 'filters'">
                <div class="modal__filters-sticky">
                    <div class="modal__filters-icon" @click="closeModal">
                        <svg>
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
                        </svg>
                    </div>
                    <h3 class="modal__title">{{ $tc('filters.title') }}</h3>
                    <filter-clear-btn :mobileFlag=true></filter-clear-btn>
                </div>
                <slot name="listingcat" v-if="props.filters.length"></slot>
                <slot name="favoritecat" v-else></slot>
                <component is="filters" :filters="props"></component>
            </div>
            <!-- Диалоговое окно -->
            <div class="modal__dialogue" v-else-if="modal === 'dialogue'">
                <!-- Первый элемент массива props - оглавление -->
                <h3 class="modal__title modal__title--centered">{{ props[0] }}</h3>
                <!-- Второй элемент передаваемого массива props - сообщение-->
                <div class="modal__text modal__text--message">{{ props[1] }}</div>
                <div @click="clearCart" class="modal__btn" v-if="props[0] === $tc('modal.title.clear_cart')">
                    {{ $tc('modal.link.clear_cart') }}
                </div>
                <div class="modal__btn" v-else-if="props[0] === $tc('modal.title.address_remove')">
                    {{ $tc('modal.link.confirm') }}
                </div>
                <!-- Третий элемент передаваемого массива props - текст кнопки -->
                <div @click="closeModal" class="modal__btn" v-else>{{ props[2] }}</div>
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
    props: {
        phoneMask:{
            type: String,
            required: true,
        },
    },
    data(){
        return{
            open: false,
            modal: '',
            props: [],
            modalBigger: false,
            showCloseBtn: true,
            currentSlide: 0,
        }
    },
    created(){
        this.$eventBus.$on("openModal", this.openModal)
        this.$eventBus.$on("closeModal", this.closeModal)
    },
    beforeDestroy(){
        this.$eventBus.$off('openModal');
    },
    methods:{
        openModal(modal, props, modalSize, closeBtn, index = 0){
            this.currentSlide = index
            if(modal != 'product-card'){
                this.toggleHtmlOverflow('hidden')
            }
            this.open = true
            this.modal = modal //Название модального окна, которое должно открыться
            this.props = props //передаём нужные пропсы
            this.modalBigger = modalSize //передаём true, если нужно большое модальное окно
            this.showCloseBtn = closeBtn //передаём true, если хотим чтобы вместо хлебных крошек был крестик
            // if (window.innerWidth < 1024) {
            // }
        },
        closeModal(modal){
            this.open = false
            this.modal = ''
            this.props = []
            this.modalBigger = false
            this.$eventBus.$emit("deleteActive");
            this.$eventBus.$emit("hide-button");
            if(modal != 'product-card'){
                this.toggleHtmlOverflow('auto')
            }
        },
        closeOutside(event) {
            if(event.toElement.className !== '') {
                this.closeModal() 
            }
        },
        clearCart() {
            this.$store.dispatch('basketClear');
            this.closeModal();
        },
    },
    
}
</script>