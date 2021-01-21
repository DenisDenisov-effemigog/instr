<template>
    <div class="add-address-btn" :class="{'add-address-btn--mobile': mobile}"
        @click.prevent="openModal('new-address')"
    >
        <svg viewBox="0 0 20 20">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__plus-small'"></use>
        </svg>
        <span>Добавить адрес</span>
    </div>
</template>

<script>
export default {
    name:"add-address-btn",
    props:{
        mobile:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        openModal(modal) {
            console.log(modal)
            this.$eventBus.$emit("openModal", modal, '', false, false)
        }
    }
}
</script>