<template>
    <div class="media-button" :class="{'media-button_active': active}" @click="openAction">
        <svg>
            <use :xlink:href="templatePath + 'images/sprite.svg#buttons__' + svg"></use>
        </svg>
    </div>
</template>

<script>
export default {
    name: 'media-button',
    props: {
        svg: {
            required: true,
            type: String
        },
        action: {
            required: true,
            type: String,
        },
        link: {
            required: true,
            type: String,
        },
    },
    data(){
        return{
            active: false,
        }
    },
    created(){
        this.$eventBus.$on("deleteActive", this.deleteActive)
    },
    methods:{
        openAction() {
            this.active = true;
            this.$eventBus.$emit("openModal", this.action, this.link, true)
        },
        deleteActive() {
            this.active = false;
        },
    },
}
</script>