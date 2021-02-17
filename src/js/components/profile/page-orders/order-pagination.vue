<template>
    <div class="pagination">
        <a class="pagination__arrow pagination__arrow-prev"
            :class="{'pagination__arrow--disabled': current === 1}"
            @click.prevent="previous"
        >
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
            </svg>
        </a>
        <ul class="pagination__list">
            <li class="pagination__item"
                v-for="link in pages"
                :class="{'pagination__item--current': current == link,
                    'pagination__item--dots': link === null}"
            >
                <div class="pagination__link" v-if="link === null">...</div>
                <a class="pagination__link"
                    @click.prevent="goToPage(link)"
                    v-else
                >{{ link }}</a>
            </li>
        </ul>
        <a class="pagination__arrow pagination__arrow_next"
            :class="{'pagination__arrow--disabled': current === pageAmount}"
            @click.prevent="next"
        >
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
            </svg>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'order-pagination',
        data() {
            return {      
            }
        },
        props: {
            currentValue: {
                required: true,
                type: Number,
                default: 1
            },
            pageAmount: {
                required: true,
                type: Number,
                default: 1
            }
        },
        model: {
            prop: 'currentValue',
            event: 'change'
        },
        computed: {
            current: {
                get: function() {
                    return this.currentValue
                },
                set: function(value) {
                    this.$emit('change', value)
                }
            },
            pages() {
                let arr = [];
                let vm = this;
                let max = vm.pageAmount

                if (max <= 6) {
                    for (let i = 0; i <= max; i++) arr = i
                } else {
                    if (vm.current < 4) {
                        arr = [ 1, 2, 3, 4, null, max ]
                    } else if (vm.current > max - 4) {
                        arr = [ 1, null, max - 3, max - 2, max - 1, max ]
                    } else {
                        arr = [ 1, null, vm.current, vm.current + 1, null, max ]
                    }
                }
                
                return arr
            }
        },
        methods: {
            previous() {
                if (this.current > 1) this.current--;
                this.scrollToTop()
            },
            next() {
                if (this.current < this.pageAmount) this.current++;
                this.scrollToTop()
            },
            goToPage(value) {
                this.current = value;
                this.scrollToTop()
            },
            scrollToTop() {
                window.scroll({ top: document.querySelector('body').offsetTop, behavior: 'smooth'})
            }
        }

    }
</script>
