<template>
    <div class="feeds" v-if="loaded">
        <h2 class="profile__title">{{ $tc('link.feeds') }}</h2>

    </div>
    <div v-else class="preloader">
        <svg viewBox="0 0 145 145">
            <use :xlink:href="templatePath + 'images/sprite.svg#preloader'"></use>
        </svg>
        <div class="preloader__loading preloader__loading--first"></div>
        <div class="preloader__loading preloader__loading--second"></div>
    </div>
</template>

<script>
    export default {
        name:"page-feeds",
        data() {
            return {
            }
        },
        methods: {
        },
    }
</script>