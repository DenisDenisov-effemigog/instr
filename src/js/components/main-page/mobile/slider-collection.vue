<template>
    <div class="collection__content collection__content_mobile">
        <agile :options="options">
            <a class="collection__block" :href="item.link" v-for="item in collection">
                    <div class="collection__card">
                        <div class="collection__image">
                            <img
                                :src="item.img"
                                :alt="item.title"
                                class="collection__img">
                        </div>
                        <p class="collection__name">{{ item.title }}</p>
                    </div>
            </a>
            <!-- <template slot="nextButton">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-right'"></use>
                </svg>
            </template> -->
        </agile>
    </div>
</template>

<script>
    import {VueAgile} from 'vue-agile';

    export default {
        name: 'slider-collection',
        components: {
            agile: VueAgile
        },
        props: {
            collection: {
                required: true
            }
        },
        data() {
            return {
                options: {
                    navButtons: false,
                    slidesToShow: 2.5,
                    dots: false,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                dots: false,
                            }
                        },
                    ]
                }
            }
        },
        methods: {
        },
        // computed: {
        //     collectionItems() {
        //         return this.collection
        //     }
        // }
    }
</script>