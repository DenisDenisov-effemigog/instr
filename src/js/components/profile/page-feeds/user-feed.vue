<template>
    <li class="feeds__item">
        <div class="feed" :class="{'feed--deleting': deleting}">
            <div class="feed__title">{{ feed.title }}</div>
            <div class="feed__date">{{ localDate(feed.date, $tc('local')) }}</div>
            <div class="feed__update">{{ localDate(feed.date, $tc('local')) }}</div>
            <div class="feed__actions" v-if="deleting">
                <div class="feed__deletion">
                    <a @click.prevent="deleting=false">{{ $t('text.cancel_deletion') }}</a>
                    <svg @click="deleteFeed">
                        <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                    </svg>
                </div>
            </div>
            <div class="feed__actions" v-else>
                <a @click.prevent="repeat">
                    <svg viewBox="0 0 32 24">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__repeat'"></use>
                    </svg>
                </a>
                <a :href="feed.link_yml" download>
                    <svg viewBox="0 0 20 20">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__download'"></use>
                    </svg>
                </a>
                <a @click.prevent="editing=!editing">
                    <svg>
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__edit'"></use>
                    </svg>
                </a>
                <a @click.prevent="deleting = true">
                    <svg viewBox="0 0 20 20">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                    </svg>
                </a>
            </div>
        </div>
        <div class="feed-edit" v-if="editing">
            <div class="feed-edit__header">
                <div class="feed-edit__title">{{ $tc('profile_feeds.edit') }}</div>
                <a class="feed-edit__close" @click.prevent="editing=false">
                    <svg viewBox="-6 -6 24 24">
                        <use :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                    </svg>
                    {{ $tc('link.close') }}
                </a>
            </div>
            <div class="feed-edit__form">
                <div class="feed-edit__column"> 
                    <label class="feed-edit__label" name="title">
                        <input 
                            name="title"
                            type="text"
                            class="feed-edit__input"
                            :class="{'form__input--error': $v.title.$error}"
                            v-model.trim="$v.title.$model">
                        <span class="feed-edit__placeholder">{{ $tc('title.apart') }}</span>
                    </label>
                </div>
                <div class="feed-edit__column"> 
                    <select-list
                        :points="exportTypes"
                        :selectopenSelect="exportTypes[0]"></select-list>
                </div>
                <div class="feed-edit__column"> 
                    <select-list
                        :points="exportTypes"
                        :selectopenSelect="exportTypes[0]"></select-list>
                </div>
                <div class="feed-edit__column"> 
                    <select-list
                        :points="exportTypes"
                        :selectopenSelect="exportTypes[0]"></select-list>
                </div>
                <div class="feed-edit__column"> 
                    <select-list
                        :points="exportTypes"
                        :selectopenSelect="exportTypes[0]"></select-list>
                </div>
                <div class="feed-edit__column"> 
                    <select-list
                        :points="exportTypes"
                        :selectopenSelect="exportTypes[0]"></select-list>
                </div>
            </div>
            <div class="feed-edit__buttons">
                <a class="feed-edit__save" :class="{'feed-edit__save--active': save}"></a>
                <a class="feed-edit__copy">
                    <svg viewBox="0 0 20 20">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__copy'"></use>
                    </svg>
                </a>
            </div>
        </div>
    </li>
</template>

<script>
    import selectList from '../../partials/select-list.vue';
    import {required} from "vuelidate/lib/validators";

    export default {
        name: 'user-feed',
        components: { selectList },
        props: {
            userFeed: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                exportTypes: [
                    {label: 'CSV', value: 'CSV'}, {label: 'YML', value: 'YML'}, {label: 'Excel', value: 'Excel'}
                ],
                editing: false,
                deleting: false,
                save: false
            }
        },
        validations: {
            title: { required }
        },
        computed: {
            feed() {
                return this.userFeed
            }
        },
        methods: {
            repeat() {

            },
            editFeed() {
                this.editing = !this.editing
            },
            deleteFeed() {

            }
        }
    }
</script>

<style>

</style>