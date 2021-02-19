<template>
    <div class="user">
        <div class="user-tabs">
            <div class="user-tabs__tab"
                :class="{'user-tabs__tab--active': select == 'login'}"
                @click="select = 'login'"
            >{{ $tc('title.entrance') }}</div>
            <div class="user-tabs__tab"
                :class="{'user-tabs__tab--active': select == 'reg'}"
                @click="select = 'reg'"
            >{{ $tc('title.registration') }}</div>
        </div>
        <div class="user-content">
            <div class="user-login" v-if="select == 'login'">
                <user-login></user-login>
            </div>
            <div class="user-reg" v-else>
                <user-reg :phoneMask="phoneMask"></user-reg>
            </div>
        </div>
    </div>
</template>

<script>
    import userLogin from './user-login.vue'
    import userReg from './user-reg.vue'

    export default {
        name:'user',
        components: {
            userLogin,
            userReg
        },
        props: {
            phoneMask:{
                type: String,
                required: true,
            },
            selected: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                select: this.selected
            }
        },
        methods: {
        },
        computed: {
        }
    }
</script>