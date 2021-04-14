<template>
    <div v-show="flag" v-scroll="handleScroll">
        <slot></slot>
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
        methods: {
            handleScroll() {
                const vm = this;
                if (window.scrollY > 0 && window.innerWidth > 988) {
                    setTimeout(vm.autoHideHeader(), 150);
                } else this.openHeader();
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
                    this.showHideHeader()        
                } else if (this.currentTop > this.scrollOffset) {
                    //if scrolling down...	
                    //hide primary nav
                    this.hidden = true;
                    this.showHideHeader()
                }
            },
            showHideHeader() {
                const page = document.querySelector('.page');
                if (this.hidden) {
                    page.classList.remove('page--header-hidden');
                    page.classList.add('page--header-shown');
                } else {
                    page.classList.add('page--header-hidden');
                    page.classList.remove('page--header-shown');
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
