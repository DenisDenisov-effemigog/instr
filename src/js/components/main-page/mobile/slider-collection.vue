<template>
    <div class="collection__content">
        <agile :options="options">
            <slot></slot>
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
    }
</script>