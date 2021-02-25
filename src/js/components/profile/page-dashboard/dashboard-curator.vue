<template>
    <div class="dashboard-curator">
        <div class="dashboard-curator__head">
            <h3 class="dashboard-curator__title">{{ $tc('profile.dashboard.curator_title') }}</h3>
            <div class="dashboard-curator__img">
                <div class="dashboard-curator__pic">
                    <img :src="managerData.photo" alt="">
                </div>
                <div v-show="!managerData" class="dashboard-curator__icon">
                    <svg viewBox="0 0 16 16">
                        <use :xlink:href="templatePath + `images/sprite.svg#icons__user`"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="dashboard-curator__main">
            <div class="dashboard-curator__name">{{managerData.name}}</div>
            <div class="dashboard-curator__phone">
                <svg>
                    <use :xlink:href="templatePath + `images/sprite.svg#icons__phone`"></use>
                </svg>
                {{managerData.phone}}
            </div>
            <div class="dashboard-curator__mail">
                <svg>
                    <use :xlink:href="templatePath + `images/sprite.svg#icons__email`"></use>
                </svg>
                {{managerData.mail}}
            </div>
            <div class="dashboard-curator__btn">
                <svg>
                    <use :xlink:href="templatePath + `images/sprite.svg#icons__phone`"></use>
                </svg>
                {{ $tc('profile.dashboard.curator_btn') }}
            </div>
            <div v-show="!managerData" class="dashboard-curator__info">{{ $tc('profile.dashboard.curator_info') }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"dashboard-curator",
    data(){
        return{
        }
    },
    mounted() {
        this.$store.dispatch('personalGetManager');
    },
    computed: {
        managerData() {
            return this.cloneOverJson(this.$store.state.personal.manager);
        },
    }
}
</script>