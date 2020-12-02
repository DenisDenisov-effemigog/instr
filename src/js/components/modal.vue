<template>
    <div class="modal" v-if="opened">
        <div class="modal-wrapper">
            <div class="modal-desc">
                <div class="modal-title">Третий в подарок!</div>
                <div class="modal-text">Здесь отображена текстовая информация об условиях акции, ее сроках, товарах, которые принимают участие, а так же что-нибудь еще.</div>
                <div class="modal-btn">Понятно!</div>
            </div>
            <svg class="modal__close-icon" viewBox="0 0 12 12">
                <use :xlink:href="'./images/sprite.svg#close'"></use>
            </svg>
        </div>
    </div>
</template>

<script>
export default {

    data(){
        return{
            opened: false,
        }
    },
}
</script>