<template>
    <div class="dashboard-contract">
        <div class="dashboard-contract__head">
            <h3 class="dashboard-contract__title"> {{ $tc('profile.dashboard.contract_title') }}</h3>
            <!--<div v-show="contractArr.length == 0" class="dashboard-contract__btn">
                <svg viewBox="0 4 20 20">
                    <use :xlink:href="templatePath + `images/sprite.svg#icons__edit`"></use>
                </svg>
                <span>{{ $tc('profile.dashboard.contract_btn') }}</span>
            </div> todo временно отключено-->
        </div>
        <div class="dashboard-contract__main">
            <ul class="dashboard-contract__list">
                <li v-for="item in contractArr" class="dashboard-contract__item"
                    :key="item.title"
                >
                    <div class="dashboard-contract__dash">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="dashboard-contract__info">{{item.info}}</div>
                </li>
                <li v-show="!contractArr.length" class="dashboard-contract__item dashboard-contract__item--info">
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
        this.$store.dispatch('personalContract');
    },
    computed: {
        contractArr() {
            return this.cloneOverJson(this.$store.state.personal.contract);
            // return this.$store.state.personal.contract
        },
    }
}
</script>