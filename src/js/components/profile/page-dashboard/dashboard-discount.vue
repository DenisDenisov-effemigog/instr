<template>
    <div class="dashboard-discount">
        <h3 class="dashboard-discount__title">{{ $tc('profile.dashboard.discount_title') }}</h3>
        <ul class="dashboard-discount__list">
            <li class="dashboard-discount__item" v-for="discount in discountArr">
                <div class="dashboard-discount__desc">
                    <div class="dashboard-discount__text">{{discount.title}}</div>
                    <div class="dashboard-discount__discount">{{discount.discount}}%</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "dashboard-discount",
    data(){
        return{
            
        }
    },
    mounted() {
        this.$store.dispatch('personalGetDiscount');
    },
    computed: {
        discountArr() {
            return this.cloneOverJson(this.$store.state.personal.discount);
        },
    }
}
</script>