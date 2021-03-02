<template>
    <div :class="className + '-discount'" @click="passIndex">
        <h3 v-show="className === 'dashboard'" :class="className + '-discount__title'">{{ $tc('profile.dashboard.discount_title') }}</h3>
        <ul :class="className + '-discount__list'">
            <li v-for="(discount, index) in discounts" class="discount-item" :class="{ 'discount-item--active': index === currentIndex }" @click="currentTab(index, discount.discount)">
                <div v-show="className === 'personal'" :class="className + '-discount__subtitle'">
                    {{ $tc('profile.dashboard.personal_discount_subtitle') }}
                </div>
                <div :class="className + '-discount__desc'">
                    <div :class="className + '-discount__text'">{{discount.name}}</div>
                    <div :class="className + '-discount__discount'">
                        {{discount.value}}%
                        <span v-show="className === 'personal' && discount.fixed" class="personal-discount__footnotes">*</span>
                    </div>
                </div>
                <div v-show="className === 'personal' && discount.date" :class="className + '-discount__date'">
                   {{ $tc('profile.dashboard.personal_discount_date') }} {{discount.date }}
                </div>
            </li>
        </ul>
        <div v-for="(discount, index) in discounts" v-show="className === 'personal' && currentIndex == index" class="personal-discount__info">
            <div v-show="!discount.fixed" class="personal-discount__info-head">
                <div class="personal-discount__info-title"> {{ $tc('profile.dashboard.personal_discount_info_title') }}</div>
                <div v-if="discount.boost_value == 0" class="personal-discount__info-discount">2%</div>
                <div v-else class="personal-discount__info-discount">{{discount.boost_value}}%</div>
            </div>
            <div class="personal-discount__info-main">
                <div v-if="!discount.fixed" class="personal-discount__info-desc">
                    {{ $tc('profile.dashboard.personal_discount_info_first_order') }}
                </div>
                <!-- #TODO вывод персональной скидки -->
                <!-- <div class="personal-discount__info-desc">
                    {{ $tc('profile.dashboard.personal_discount_info_text_1_1') }}
                    <span>11%</span>
                    {{ $tc('profile.dashboard.personal_discount_info_text_1_2') }}
                    <span>2%</span>
                </div> -->
                <div v-else class="personal-discount__info-desc">
                    {{ $tc('profile.dashboard.personal_discount_info_text_2_1') }} <span>{{ $tc('profile.dashboard.personal_discount_info_text_2_2') }}</span> {{ $tc('profile.dashboard.personal_discount_info_text_2_3') }}
                </div>
            </div>  
            <div v-show="!discount.fixed" class="personal-discount__info-btn">
                {{ $tc('button.move_to_catalog') }}
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arr-long-right'"></use>
                </svg>
            </div>
            <discounts-calculation v-show="discount.boost_value > 0" 
                :discounts="discounts"
            ></discounts-calculation>
        </div>
    </div>
</template>

<script>
import DiscountsCalculation from '../page-discounts/discounts-calculation.vue';

export default {
    name: "dashboard-discount",
    components:{
        DiscountsCalculation
    },
    props:{
        className:{
            type: String,
            required: true,
            default: 'dashboard'
        },
        amountOrders:{
            type: Number,
            required: false
        },
        discounts: {
            type: Array,
            required: true
        },
    },
    data(){
        return{
            currentIndex: 0,
        }
    },
    methods:{
        currentTab(index, discount){
            this.currentIndex = index
            this.$eventBus.$emit('current-discount', index)
            
        },
         passIndex(){
            if(this.className !== 'personal'){
                this.$eventBus.$emit("passIndex", 2)
            }
        }
    }
}
</script>