<template>
    <div :class="className + '-discount'">
        <h3 v-show="className == 'dashboard'" :class="className + '-discount__title'">{{ $tc('profile.dashboard.discount_title') }}</h3>
        <ul :class="className + '-discount__list'">
            <li v-for="(discount, index) in discountArr" class="discount-item" :class="{ 'discount-item--active': index == currentIndex }" @click="currentTab(index)">
                <div v-show="className == 'personal'" :class="className + '-discount__subtitle'">
                    {{ $tc('profile.dashboard.personal_discount_subtitle') }}
                </div>
                <div :class="className + '-discount__desc'">
                    <div :class="className + '-discount__text'">{{discount.title}}</div>
                    <div :class="className + '-discount__discount'">{{discount.discount}}%</div>
                </div>
                <div v-show="className == 'personal'" :class="className + '-discount__date'">
                   {{ $tc('profile.dashboard.personal_discount_date') }} {{discount.date }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "dashboard-discount",
    props:{
        className:{
            type: String,
            required: true,
            default: 'dashboard'
        }
    },
    data(){
        return{
            currentIndex: 0
        }
    },
    mounted() {
        this.$store.dispatch('personalGetDiscount');
    },
    computed: {
        discountArr() {
            return this.cloneOverJson(this.$store.state.personal.discount);
        },
    },
    methods:{
        currentTab(index){
            this.currentIndex = index
        }
    }
}
</script>