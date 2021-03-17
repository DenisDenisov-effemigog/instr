<template>
    <div class="pagination">
        <a  :href="internalPagination.url_previous" 
            class="pagination__arrow pagination__arrow-prev"
            :class="{'pagination__arrow--disabled': internalPagination.urls[0].title == 1}"
            @click.prevent="slideToPrev"
        >
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
            </svg>
        </a>
        <ul class="pagination__list">
            <li class="pagination__item" v-if="internalPagination.urls[0].title != 1"
                :class="{'pagination__item--current': internalPagination.current === 1}"
            >
                <a :href="firstPageUrl" 
                    class="pagination__link"
                    @click.prevent="goToPage(1)"
                >1</a>
            </li>
            <li class="pagination__item pagination__item--dots" v-if="internalPagination.urls[0].title != 1">
                <div class="pagination__link">...</div>
            </li>
            <li class="pagination__item"
                v-for="(link, index) in internalPagination.urls" :key="index"
                :class="{'pagination__item--current': internalPagination.current == link.title}"
            >
                <a :href="link.url" 
                    class="pagination__link"
                    @click.prevent="goToPage(link.title)"
                >{{ link.title }}</a>
            </li>
            <li class="pagination__item pagination__item--dots" v-if="notLast">
                <div class="pagination__link">...</div>
            </li>
            <li class="pagination__item" v-if="notLast"
                :class="{'pagination__item--current': internalPagination.current == internalPagination.total}"
            >
                <a :href="internalPagination.url_last" 
                    class="pagination__link"
                    @click.prevent="goToPage(internalPagination.total)"
                >{{ internalPagination.total }}</a>
            </li>
        </ul>
        <a  :href="internalPagination.url_next" 
            class="pagination__arrow pagination__arrow_next"
            :class="{'pagination__arrow--disabled': !notLast}"
            @click.prevent="slideToNext"
        >
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
            </svg>
        </a>
    </div>
</template>

<script>
    import * as Api from '../api';
    let api = Api.getInstance();
    
    export default {
        name: 'pagination',
        data() {
            return {
                internalPagination: {},
                lastIteration: NaN,
                firstPageUrl: ''
            }
        },
        props: {
            pagination: {
                required: true,
                type: Object
            },
            hash: {
                type: String
            },
            placement: {
                type: String,
                default: '.listing'
            }
        },
        mounted() {
            this.internalPagination = this.pagination;
            this.lastIteration = Math.floor(this.internalPagination.total / 4);
            this.firstPageUrl = this.internalPagination.urls[0].url.replace(/\d+$/, 1)
        },
        computed: {
            currentIteration() {
                return Math.floor(this.internalPagination.urls[3].title / 4)
            },
            isFirst() {
                return this.currentIteration === this.lastIteration
            },
            notLast() {
                return this.currentIteration === this.lastIteration ? false : true
            }
        },
        methods: {
            goToPage(page) {
                let vm = this
                if (vm.placement === '.listing') {
                    api.goToPage(vm.hash, page).then((answer) => {
                        vm.$eventBus.$emit('apply-listing', answer.output);
                        vm.scrollList();
                    }).catch(errors => {
                        console.log(errors);
                    });
                } else if (vm.placement === '.order') {
                    vm.$eventBus.$emit('apply-orders-list', page);
                    vm.scrollList();
                }
            },
            scrollList() {
                if (window.innerWidth > 767) {
                    this.scrollTop(this.placement, 130);
                } else {
                    this.scrollTop(this.placement, 50);
                }
            },
            slideToPrev() {
                if (this.internalPagination.urls[0].title != 1) {
                    for (let i=0; i < this.internalPagination.urls.length; i++) {
                        let page = +this.internalPagination.urls[i].title;
                        let url = this.internalPagination.urls[i].url;
                        this.internalPagination.urls[i].title = page - 3;
                        this.internalPagination.urls[i].url = url.replace(/\d+$/, this.internalPagination.urls[i].title);
                    }
                }
            },
            slideToNext() {
                if (this.notLast) {
                    if (this.currentIteration === this.lastIteration - 1) {
                        for (let i=this.internalPagination.urls.length; i > 0; i--) {
                            let page = +this.internalPagination.urls[i].title;
                            let url = this.internalPagination.urls[i].url;
                            this.internalPagination.urls[i].title = page + 3;
                            this.internalPagination.urls[i].url = url.replace(/\d+$/, this.internalPagination.urls[i].title);
                        }
                    } else {
                        for (let i=0; i < this.internalPagination.urls.length; i++) {
                            let page = +this.internalPagination.urls[i].title;
                            let url = this.internalPagination.urls[i].url;
                            this.internalPagination.urls[i].title = page + 3;
                            this.internalPagination.urls[i].url = url.replace(/\d+$/, this.internalPagination.urls[i].title);
                        }
                    }
                }
            }
        }
    }
</script>
