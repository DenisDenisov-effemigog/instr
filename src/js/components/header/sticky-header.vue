<template>
    <div v-show="flag" class="header-all" v-scroll="handleScroll">
        <div class="topnav">
            <slot name="topnav"></slot>
        </div>
        <header class="header">
            <slot name="header"></slot>
        </header>
    </div>
</template>

<script>
    export default {
        name: 'sticky-header',
        data() {
            return {
                previousTop: 0,
                currentTop: 0,
                scrollOffset: 48,
                hidden: false,
                flag: true
            }
        },
        computed: {
            showHideHeader() {
                const page = document.querySelector('.page');
                if (this.hidden) {
                    page.classList.remove('page_header-hidden');
                    page.classList.add('page_header-shown');
                } else {
                    page.classList.add('page_header-hidden');
                    page.classList.remove('page_header-shown');
                }
            }
        },
        methods: {
            handleScroll() {
                if ( window.scrollY > 0) {
                    setTimeout(this.autoHideHeader(), 150);
                    this.$eventBus.$emit('headerIsHidden', this.hidden)
                }
            },
            autoHideHeader() {
                this.currentTop = window.pageYOffset || document.documentElement.scrollTop;
                this.checkStickyNavigation();     
                this.previousTop = this.currentTop;
            },
            checkStickyNavigation() {
                if (this.previousTop >= this.currentTop) {
                    //if scrolling up... 
                    //secondary nav is fixed
                    this.hidden = false;
                    this.showHideHeader
                } else if (this.currentTop > this.scrollOffset) {
                    //if scrolling down...	
                    //hide primary nav
                    this.hidden = true;
                    this.showHideHeader
                }
            },
            closeHeader(){
                this.flag = false
            },
            openHeader(){
                this.flag = true
            }
        },
        created(){
            this.$eventBus.$on('openStickyCard', this.closeHeader)
            this.$eventBus.$on('closeStickyCard', this.openHeader)
        }
    }
</script>
