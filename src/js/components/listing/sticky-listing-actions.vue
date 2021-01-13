<template>
    <div class="listing__actions listing__actions_mobile"
        :class="{'listing__actions_sticky': fixed}">
        <component is="filter-button" :filters="filersMobile"></component>
        <component is="select-list"
                    class="listing__select"
                    :points="pointsMobile"
                    :selectopen-select="selectopenSelect"
                    :viewbox="'0 0 16 7'"
        ></component>
        <component is="displaying-cards"></component>
    </div>
</template>

<script>
    export default {
        name: "sticky-listing-actions",
        data() {
            return {
                fixed: false,
                scrollOffset: 0
            }
        },
        props: {
            filters: {
                type: Object,
                required: true
            },
            points:{
                type: Array,
                required: true,
            },
            selectopenSelect:{
                type: String,
                required: true,
            }
        },
        methods: {
            mouseWheel(){
                let windowPosition = window.pageYOffset
                windowPosition > this.scrollOffset ? this.fixed = true : this.fixed = false
            },
            getPosition(element) {
                let yPosition = 0;
                while(element) {
                    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                    element = element.offsetParent;
                }
                return yPosition
            }
        },
        computed: {
            filersMobile() {
                return this.filters
            },
            pointsMobile() {
                return this.points
            }
        },
        mounted() {
            this.scrollOffset = this.getPosition(this.$el)
        },
        created() {
            window.addEventListener('scroll', this.mouseWheel);
        }
    }
</script>
