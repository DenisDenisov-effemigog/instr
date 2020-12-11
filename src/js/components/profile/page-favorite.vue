<template>
    <div class="favorite">
        <div class="favorite__header" :class="{'favorite__header_column': favoriteList.length == 0}">
            <h2 class="profile__title">Избранное</h2>
            <p class="favorite__no-favorite" v-if="favoriteList.length == 0">У вас пока еще нет избранных товаров.</p>
            <div class="favorite__catalogue-btn" v-if="favoriteList.length == 0">Перейти в каталог</div>
        </div>
        <div v-if="favoriteList.length > 0">
            <select-list></select-list>
            <ul class="favorite__address" v-for="(address, order) in favoriteList">
                <li>
                    
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import selectList from './select-list.vue'

    export default {
        name:"page-favorite",
        props:{
            profile: {
                required: true,
                type: Object,
            }
        },
        components: {
            selectList
        },
        computed: {
            favoriteList() {
                return this.profile.favorite
            }

        }
    }
</script>