<template>
    <div class="dashboard-contract">
        <div class="dashboard-contract__head">
            <h3 class="dashboard-contract__title"> {{ $tc('profile.dashboard.contract_title') }}</h3>
            <div v-show="contractArr.length == 0" class="dashboard-contract__btn">
                <svg viewBox="0 0 16 16">
                        <use :xlink:href="templatePath + `images/sprite.svg#icons__noti`"></use>
                </svg>
                <span>{{ $tc('profile.dashboard.contract_btn') }}</span>
            </div>
        </div>
        <div class="dashboard-contract__main">
            <ul class="dashboard-contract__list">
                <li v-for="item in contractArr" class="dashboard-contract__item">
                    <div class="dashboard-contract__dash">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="dashboard-contract__info">{{item.info}}</div>
                </li>
                <li v-show="contractArr.length == 0" class="dashboard-contract__item dashboard-contract__item--info">
                    <span>{{ $tc('profile.dashboard.contract_item_info') }}</span> 
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "dashboard-contract",
    data(){
        return{
            
        }
    },
    mounted() {
        this.$store.dispatch('personalGetContract');
    },
    computed: {
        contractArr() {
            return this.cloneOverJson(this.$store.state.personal.contract);
        },
    }
}
</script>