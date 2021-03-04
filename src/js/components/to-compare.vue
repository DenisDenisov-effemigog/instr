<template>
    <div
        class="to-compare"
        :class="{'to-compare--active': inCompare, 'to-compare--mobile': mobile}"
        @click="addCompare"
    >
        <svg class="to-compare__icon-compare" viewBox="0 0 14 18">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__graph'"></use>
        </svg>
        <slot></slot>
        <span v-if="text">{{ $tc('link.to_compare') }}</span>
    </div>
</template>

<script>
    import * as Api from '../api/index'

    let api = Api.getInstance();
    
    export default {
        name: 'to-compare',
        props: {
            id: {
                required: true,
                type: Number
            },
            compare: {
                required: true,
                type: Boolean
            },
            text: {
                required: false,
                default: false,
                type: Boolean
            },
            mobile: {
                required: false,
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                inCompare: false,
            }
        },
        mounted() {
            this.inCompare = this.compare
        },
        methods: {
            addCompare() {
                let vm = this;
                vm.$store.dispatch('comparisonsChange', {
                    productId: vm.id
                }).finally(() => {
                    vm.inCompare = !vm.inCompare
                });
            }
        }
    }
</script>