<template>
    <div class="user">
        <div class="user-tabs">
            <div class="user-tabs__tab"
                :class="{'user-tabs__tab_active': selected == 'login'}"
                @click="selected = 'login'"
            >Вход</div>
            <div class="user-tabs__tab"
                :class="{'user-tabs__tab_active': selected == 'reg'}"
                @click="selected = 'reg'"
            >Регистрация</div>
        </div>
        <div class="user-content">
            <div class="user-login" v-if="selected == 'login'">
                <user-login></user-login>
            </div>
            <div class="user-reg" v-else>
                <user-reg></user-reg>
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
            selected: {
                type: String,
                required: true
            }
        },
        data() {
            return {
            }
        },
        methods: {
        },
        computed: {
        }
    }
</script>