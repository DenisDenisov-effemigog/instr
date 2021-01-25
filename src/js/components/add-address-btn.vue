<template>
    <div class="add-address-btn"
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
    methods:{
        openModal(modal) {
            console.log(modal)
            this.$eventBus.$emit("openModal", modal, '', false, false)
        }
    }
}
</script>