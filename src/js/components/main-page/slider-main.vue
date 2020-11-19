<template>
    <div class="slider">
        <agile :options="options">
            <div><img src="./images/banners/main-banner.png" alt=""></div>
            <div><img src="./images/banners/main-banner.png" alt=""></div>
            <div><img src="./images/banners/main-banner.png" alt=""></div>
            <template slot="prevButton"></template>
            <template slot="nextButton"></template>
        </agile>
    </div>
</template>

<script>
    import {VueAgile} from 'vue-agile';

    export default {
        name: 'slider-main',
        components: {
            agile: VueAgile
        },
        data() {
            return {
                options: {
                    navButtons: false,
                    // autoplay: true,
                    fade: false,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                navButtons: true,
                                fade: false,
                                pauseOnDotsHover: true,
                                slidesToShow: 1,
                                dots: true,
                                // autoplaySpeed: 9000,
                            }
                        },
                    ]
                }
            }
        }
    }
</script>