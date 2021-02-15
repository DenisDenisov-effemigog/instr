<template>
    <div
        class="in-favorite"
        :class="{'in-favorite--active': inFavorite, 'in-favorite--mobile': mobile}"
        @click="addFavorite"
    >
        <svg v-if="!inFavorite" viewBox="0 0 18 16">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__heart'"></use>
        </svg>
        <svg v-else viewBox="0 0 18 16">
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__heart-full'"></use>
        </svg>
            <span v-if="text">{{ $tc('link.in_favorite') }}</span>
    </div>
</template>

<script>
    import * as Api from '../api/index'
    
    let api = Api.getInstance();
    
    export default {
        name: 'in-favorite',
        props: {
            id: {
                required: true,
                type: Number
            },
            favorite: {
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
            return{
                inFavorite: false,
            }
        },
        mounted() {
            this.inFavorite = this.favorite
        },
        methods: {
            addFavorite() {
                let vm = this
                api.addFavorite(vm.id).then(answer => {
                    vm.inFavorite = answer
                }).catch(errors => {
                    console.error(errors);
                })
            }
        }
    }
</script>