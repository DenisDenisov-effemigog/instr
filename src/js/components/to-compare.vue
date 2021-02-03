<template>
    <div
        class="to-compare"
        :class="{'to-compare--active': inCompare, 'to-compare--mobile': mobile}"
        @click="addCompare"
    >
        <svg viewBox="0 0 14 18">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__graph'"></use>
        </svg>
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
        computed: {
            favorites() {
                return this.$store.state.listing.actions.comparingProducts
            },
        },
        mounted() {
            compares.filter(compare => {
                if (compare.product_id === this.id) {
                    this.inCompare = compare.is_compare
                }
            })
        },
        methods: {
            addCompare() {
                let vm = this
                api.addCompare(vm.id).then(answer => {
                    vm.inCompare = answer
                }).catch(errors => {
                    console.error(errors);
                })
            }
        }
    }
</script>