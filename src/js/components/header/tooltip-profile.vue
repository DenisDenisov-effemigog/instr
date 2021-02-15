<template>
    <div class="header__menu-tooltip">
        <router-link tag="div" v-for="item in computedLinks"
                     class="header__menu-tooltip-layout"
                     :exact="!!item.exact"
                     :to="item.url"
        >
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__' + item.icon"></use>
            </svg>
            <span>{{ $tc(item.title) }}</span>
        </router-link>
        <div href="#" class="header__menu-tooltip-layout">
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__exit'"></use>
            </svg>
            {{ $tc('header.tooltip.exit') }}
        </div>
    </div>
</template>

<script>

    export default {
        components: {
        },
        name: 'tooltip-profile',
        props: {
        },
        data(){
            return{
                links: [
                    {
                        title: 'link.my_profile',
                        url: '/account/',
                        exact: true,
                        personType: 1,
                        icon: 'home'
                    },
                    {
                        title: 'link.orders_list',
                        url: '/account/orders',
                        personType: 1,
                        icon: 'order'
                    },
                    {
                        title: 'link.finance',
                        url: '/account/finance',
                        personType: 2, 
                        external: true,
                        icon: 'card'
                    },
                    {
                        title: 'link.my_addresses',
                        url: '/account/adresses',
                        personType: 2, 
                        external: true,
                        icon: 'delivery'
                    },
                ],
            }
        },
        created(){
        },
        computed: {
            computedLinks() {
                let result = [];
                let vm = this;
                this.links.forEach(item => {
                    if (item.url) {
                        item.active = vm.trimPath(vm.$route.path) === vm.trimPath(item.url);
                    }
                    result.push(item);
                });
                return result;
            },
        },
        methods: {
            trimPath(value) {
                return value.replace(/^\/+|\/+$/g, '');
            },
        }
    }
</script>