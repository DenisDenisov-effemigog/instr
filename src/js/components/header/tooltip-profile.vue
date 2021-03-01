<template>
    <div class="header__menu-tooltip">
        <router-link tag="div" v-for="(item, index) in computedLinks"
                     :exact="!!item.exact"
                     :to="item.url"
        >
            <div class="header__menu-tooltip-layout" @click="passIndex(index)">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__' + item.icon"></use>
                </svg>
                <span>{{ $tc(item.title) }}</span>
            </div>
        </router-link>
        <div href="" class="header__menu-tooltip-layout" @click.prevent="exit">
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
                        title: 'link.dashboard',
                        url: '/my/dashboard',
                        // exact: true,
                        personType: [1,2],
                    },
                    {
                        title: 'link.my_profile',
                        url: '/my/profile',
                        exact: true,
                        personType: 1,
                        icon: 'home'
                    },
                    {
                        title: 'link.discounts',
                        url: '/my/discounts',
                        // exact: true,
                        personType: [1,2],
                        icon: 'sale'
                    },
                    {
                        title: 'link.orders_list',
                        url: '/my/orders',
                        personType: 1,
                        icon: 'order'
                    },
                    {
                        title: 'link.finance',
                        url: '/my/finances',
                        personType: 2, 
                        external: true,
                        icon: 'card'
                    },
                    {
                        title: 'link.my_addresses',
                        url: '/my/address',
                        personType: 2, 
                        external: true,
                        icon: 'delivery'
                    },
                    // #TODO блок обращения
                    // {
                    //     title: 'link.appeals',
                    //     url: '/my/appeals/',
                    //     personType: [2],
                    //     //external: true
                    // },
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
            exit() {
                /*TODO реализовать выход из профиля, редирект на главную*/
            },
            passIndex(index){
                this.$eventBus.$emit("passIndex", index)
            }
        }
    }
</script>