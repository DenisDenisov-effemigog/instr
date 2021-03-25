<template>
    <div class="pagination" v-if="pagination.urls.length > 1">
        <a  class="pagination__arrow pagination__arrow-prev"
            :class="{'pagination__arrow--disabled': internalPagination.urls[0].title <= 1 
                || internalPagination.urls[0].title - 1 === 2
                || (currentIteration === lastIteration && lastArray[0].title - 1 === 2)
            }"
            @click.prevent="slideToPrev"
        >
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
            </svg>
        </a>
        <ul class="pagination__list">

            <li class="pagination__item" v-if="internalPagination.urls[0].title > 1"
                :class="{'pagination__item--current': internalPagination.current === 1}"
            >
                <a :href="pageMask.replace(/#PAGE#/g, 1)" 
                    class="pagination__link"
                    @click.prevent="goToPage(1)"
                >1</a>
            </li>

            <li class="pagination__item" v-if="internalPagination.urls[0].title - 1 === 2
                || (currentIteration === lastIteration && lastArray[0].title - 1 === 2)"
                :class="{'pagination__item--current': internalPagination.current === 2 }"
            >
                <a :href="pageMask.replace(/#PAGE#/g, 2)" 
                    class="pagination__link"
                    @click.prevent="goToPage(2)"
                >2</a>
            </li>
            <li class="pagination__item pagination__item--dots" v-else-if="internalPagination.urls[0].title > 2">
                <div class="pagination__link">...</div>
            </li>

            <span class="pagination__span" v-if="currentIteration === lastIteration">
                <li class="pagination__item"
                    v-for="(link, index) in lastArray.slice(0, arrayLength)" :key="index"
                    :class="{'pagination__item--current': internalPagination.current == link.title}"
                >
                    <a :href="link.url" 
                        class="pagination__link"
                        @click.prevent="goToPage(link.title)"
                    >{{ link.title }}</a>
                </li>
            </span>
            <span class="pagination__span" v-else>
                <li class="pagination__item"
                    v-for="(link, index) in internalPagination.urls.slice(0, arrayLength)" :key="index"
                    :class="{'pagination__item--current': internalPagination.current === +link.title}"
                >
                    <a :href="link.url" 
                        class="pagination__link"
                        @click.prevent="goToPage(link.title)"
                    >{{ link.title }}</a>
                </li>
            </span>
            
            <li class="pagination__item pagination__item--dots"
                v-if="dotsFlag && internalPagination.urls[internalPagination.urls.length - 1].title < internalPagination.total - 1"
            >
                <div class="pagination__link">...</div>
            </li>
            <li class="pagination__item"
                :class="{'pagination__item--current': internalPagination.current === lastArray[arrayLength - 2].title}"
                v-else-if="currentIteration !== lastIteration"
            >
                <a :href="lastArray[arrayLength - 2].url" 
                    class="pagination__link"
                    @click.prevent="goToPage(lastArray[arrayLength - 2].title)"
                >{{ lastArray[arrayLength - 2].title }}</a>
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
        <a  class="pagination__arrow pagination__arrow_next"
            :class="{'pagination__arrow--disabled': !notLast || internalPagination.urls[arrayLength - 1].title + 2 === internalPagination.total}"
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
                lastIteration: NaN,
                pageMask: '',
                currentIteration: 1,
            }
        },
        props: {
            pagination: {
                type: Object,
                default: {}
            },
            hash: {
                type: String
            },
            placement: {
                type: String,
                default: '.listing'
            }
        },
        created() {
            this.internalPagination
        },
        mounted() {
            this.arrayLength;
            this.lastIteration = Math.ceil(this.internalPagination.total / this.arrayLength);
            this.countIteration();
            this.pageMask = this.pagination.page_mask
        },
        computed: {
            internalPagination() {
                return this.cloneOverJson(this.pagination);
            },
            arrayLength() {
                if (window.innerWidth < 768) {
                    return this.internalPagination.total >= 3 ? 3 : this.internalPagination.total
                } else {
                    return this.internalPagination.total >= 4 ? 4 : this.internalPagination.total
                }
            },
            // currentIteration() {
            //     if (this.arrayLength > this.internalPagination.urls.length) {
            //         const length = this.internalPagination.urls.length;
            //         return Math.ceil(this.internalPagination.urls[length - 1].title / this.arrayLength)
            //     } else {
            //         return Math.ceil(this.internalPagination.urls[this.arrayLength - 1].title / this.arrayLength)
            //     }
            //     // if (this.internalPagination.urls.length >= this.arrayLength) {
            //     //     return Math.ceil(this.internalPagination.urls[this.arrayLength - 1].title / this.arrayLength)
            //     // } else {
            //     //     return 1
            //     // }
            // },
            notLast() {
                return this.currentIteration >= this.lastIteration ? false : true
            },
            lastArray() {
                const arr = [];
                let lastPage = this.internalPagination.total
                for (let i = this.arrayLength - 1; i >= 0; i--) {
                    arr.unshift({
                        title: lastPage,
                        url: this.pageMask.replace(/#PAGE#/g, lastPage)
                    })
                    lastPage--;
                }
                return arr
            },
            dotsFlag() {
                if (this.internalPagination.urls.length >= this.arrayLength) {
                    return this.internalPagination.urls[this.arrayLength - 1].title + 2 === this.internalPagination.total ? false : true
                } else {
                    return false
                }
            }
        },
        methods: {
            countIteration() {
                if (this.arrayLength > this.internalPagination.urls.length) {
                    const length = this.internalPagination.urls.length;
                    this.currentIteration = Math.ceil(this.internalPagination.urls[length - 1].title / this.arrayLength)
                } else {
                    this.currentIteration = Math.ceil(this.internalPagination.urls[this.arrayLength - 1].title / this.arrayLength)
                }
            },
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
                if (this.internalPagination.urls[0].title - (this.arrayLength - 1) >= 1) {
                    if (this.currentIteration === 1) {
                        this.internalPagination.urls[0].title = this.arrayLength
                    }
                    for (let i=0; i < this.arrayLength; i++) {
                        let page = +this.internalPagination.urls[i].title;
                        this.internalPagination.urls[i].title = page - (this.arrayLength - 1);
                        this.internalPagination.urls[i].url = this.pageMask.replace(/#PAGE#/g, this.internalPagination.urls[i].title);
                    }
                    this.countIteration();
                }
            },
            slideToNext() {
                if (this.notLast) {
                    for (let i=0; i < this.arrayLength; i++) {
                        let page = +this.internalPagination.urls[i].title;
                        this.internalPagination.urls[i].title = page + (this.arrayLength - 1);
                        this.internalPagination.urls[i].url = this.pageMask.replace(/#PAGE#/g, this.internalPagination.urls[i].title);
                    }
                    this.countIteration();
                }
            }
        }
    }
</script>
