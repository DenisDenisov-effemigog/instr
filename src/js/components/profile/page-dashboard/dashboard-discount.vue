<template>
    <div :class="className + '-discount'">
        <h3 v-show="className == 'dashboard'" :class="className + '-discount__title'">{{ $tc('profile.dashboard.discount_title') }}</h3>
        <ul :class="className + '-discount__list'">
            <li v-for="(discount, index) in discountArr" class="discount-item" :class="{ 'discount-item--active': index == currentIndex }" @click="currentTab(index, discount.discount)">
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
        <div v-show="className == 'personal' && openInfo" class="personal-discount__info">
            <div v-show="currentDiscount == 0" class="personal-discount__info-head">
                <div class="personal-discount__info-title"> {{ $tc('profile.dashboard.personal_discount_info_title') }}</div>
                <div class="personal-discount__info-discount">2%</div>
            </div>
            <div class="personal-discount__info-main">
                <div v-if="currentDiscount == 0" class="personal-discount__info-desc">
                    {{ $tc('profile.dashboard.personal_discount_info_first_order') }}
                </div>
                <div v-else-if="currentDiscount > 12 && currentDiscount < 20" class="personal-discount__info-desc">
                    {{ $tc('profile.dashboard.personal_discount_info_text_1_1') }}
                    <span>11%</span>
                    {{ $tc('profile.dashboard.personal_discount_info_text_1_2') }}
                    <span>2%</span>
                </div>
                <div v-else class="personal-discount__info-desc">
                    {{ $tc('profile.dashboard.personal_discount_info_text_2_1') }} <span>{{ $tc('profile.dashboard.personal_discount_info_text_2_2') }}</span> {{ $tc('profile.dashboard.personal_discount_info_text_2_3') }}
                </div>
            </div>  
            <div v-show="currentDiscount == 0" class="personal-discount__info-btn">
                {{ $tc('button.move_to_catalog') }}
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-right'"></use>
                </svg>
            </div>
        </div>
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
            currentIndex: 0,
            openInfo: false,
            currentDiscount: 11
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
        currentTab(index, discount){
            this.currentIndex = index
            if(discount == 0 || discount > 12 && discount < 20 || discount == 20){
                this.openInfo = true
                this.currentDiscount = discount
            }
            

        }
    }
}
</script>