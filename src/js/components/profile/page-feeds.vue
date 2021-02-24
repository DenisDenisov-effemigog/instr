<template>
    <div class="feeds" v-if="loaded">
        <div class="feeds__header">
            <h2 class="profile__title">{{ $tc('link.feeds') }}</h2>
            <a class="feeds__add">
                <svg viewBox="0 0 20 20">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__plus-small'"></use>
                </svg>
                {{ $tc('profile_feeds.add') }}
            </a>
        </div>
        <div class="feeds__table-header" v-if="feeds.userFeeds.length > 0">
            <div class="feed__title">{{ $tc('profile_feeds.header.title')}}</div>
            <div class="feed__date">{{ $tc('profile_feeds.header.date')}}</div>
            <div class="feed__update">{{ $tc('profile_feeds.header.update')}}</div>
            <div class="feed__actions">{{ $tc('profile_feeds.header.actions')}}</div>
        </div>
        <ul class="feeds__list" v-if="feeds.userFeeds.length> 0">
            <user-feed v-for="feed in feeds.userFeeds" :user-feed="feed"></user-feed>
        </ul>
        <h3 class="feeds__subtitle">{{ $tc('profile_feeds.subtitle') }}</h3>
        <div class="feeds__update-info">{{ $tc('profile_feeds.update_info') }}</div>
        <div class="feeds__table-header feeds__table-header--ready">
            <div class="feed__title">{{ $tc('profile_feeds.header.title')}}</div>
            <div class="feed__download-format">{{ $tc('profile_feeds.header.download_format')}}</div>
        </div>
        <ul class="feeds__list feeds__list--ready">
            <li class="feeds__item" v-for="feed in feeds.readyFeeds">
                <div class="feed">
                    <div class="feed__title">{{ feed.title }}</div>
                    <div class="feed__download-format">
                        <a :href="feed.link_yml" download>{{ $tc('profile_feeds.download_yml') }}</a>
                        <a :href="feed.link_xlsx" download>{{ $tc('profile_feeds.download_excel') }}</a>
                    </div>
                </div>
            </li>
        </ul>
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
    import userFeed from './page-feeds/user-feed.vue'
    export default {
        name:"page-feeds",
        data() {
            return {
                loaded: false,
            }
        },
        components: { userFeed },
        methods: {
            loading(){
                let vm = this
                setTimeout(function () {
                    vm.loaded = true
                }, 500)
            },
        },
        computed: {
            feeds() {
                return this.$store.state.personal.feeds
            }
        },
        created() {
            this.loading()
        },
        mounted() {
            this.$store.dispatch('personalUpdateFeeds');
            this.$eventBus.$emit('hideMenu')
        },
    }
</script>