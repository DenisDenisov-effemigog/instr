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
            value: {
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
        model: {
            prop: 'value',
            event: 'change',
        },
        computed: {
            favorites: {
                get: function () {
                    return this.value;
                },
                set: function (newValue) {
                    this.$emit('change', newValue);
                },
            },
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