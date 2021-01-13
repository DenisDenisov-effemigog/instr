<template>
    <div class="listing__actions"
        :class="{'listing__actions--sticky': fixed}">
        <component is="filter-button" :filters="filersMobile" v-if="filersMobile.filters"></component>
        <component is="select-list"
                    class="listing__select"
                    :points="pointsMobile"
                    :selectopen-select="selectopenSelect"
                    :viewbox="'0 0 16 7'"
        ></component>
        <component is="displaying-cards" :activeView="activeView"></component>
    </div>
</template>

<script>
    export default {
        name: "sticky-listing-actions",
        data() {
            return {
                fixed: false,
                scrollOffset: 0,
                activeView: 'gritview'
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
            },
            view:{
                type: String,
                required: true,
            }
        },
        methods: {
            mouseWheel(){
                if (window.innerWidth < 988) {
                    let windowPosition = window.pageYOffset
                    windowPosition > this.scrollOffset ? this.fixed = true : this.fixed = false
                } else {
                    this.fixed = false
                }
            },
            getPosition() {
                let element = document.querySelector('.listing__grid');
                let yPosition = 0;
                while(element) {
                        //34 - (высота + отступ ) пополам элемента .listing__actions (56px + 12px)/2 = 34px
                    yPosition += (element.offsetTop - element.scrollTop + element.clientTop - 34);
                    element = element.offsetParent;
                }
                this.scrollOffset = yPosition
                this.mouseWheel()
                return this.scrollOffset
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
        created() {
            window.addEventListener('scroll', this.mouseWheel);
            window.addEventListener('resize', this.getPosition);
        },
        mounted() {
            this.getPosition()
            this.activeView = this.view
        }
    }
</script>
