<template>
    <div class="pagination">
        <a  :href="internalPagination.url_previous" 
            class="pagination__arrow pagination__arrow-prev"
            :class="{'pagination__arrow--disabled': internalPagination.current === 1}"
            @click.prevent="goToPage(internalPagination.current - 1)"
        >
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-left'"></use>
            </svg>
        </a>
        <ul class="pagination__list">
            <li class="pagination__item"
                v-for="link in internalPagination.urls"
                :class="{'pagination__item--current': internalPagination.current == link.title}"
            >
                <a :href="link.url" 
                    class="pagination__link"
                    @click.prevent="goToPage(link.title)"
                >{{ link.title }}</a>
            </li>
            <li class="pagination__item pagination__item--dots">
                <div class="pagination__link">...</div>
            </li>
            <li class="pagination__item"
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
            :class="{'pagination__arrow--disabled': internalPagination.current === internalPagination.total}"
            @click.prevent="goToPage(internalPagination.current + 1)"
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
            }
        },
        props: {
            pagination: {
                required: true,
                type: Object
            },
            hash: {
                required: true,
                type: String
            },
        },
        mounted() {
            this.internalPagination = this.pagination;
        },
        methods: {
            goToPage(page) {
                let vm = this
                api.goToPage(vm.hash, page).then((answer) => {
                    vm.$eventBus.$emit('apply-listing', answer.output);
                    window.scroll({ top: document.querySelector('body').offsetTop, behavior: 'smooth'})
                }).catch(errors => {
                    console.error(errors);
                });
            }
        }
    }
</script>
