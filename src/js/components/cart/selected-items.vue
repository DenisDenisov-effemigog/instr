<template>
    <div class="selected-items" :class="{'selected-items--success': successFlag}">
        <div class="selected-items__head">
            <div v-if="successFlag" class="selected-items__head-desc">
                <div class="selected-items__head-icon">
                    <svg>
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__cart-success'"></use>
                    </svg>
                </div>
                <div class="selected-items__head-info">
                    <div class="selected-items__head-text">
                        {{ $tc('cart.selected_items.head_text_success') }}
                    </div>
                </div>
            </div>
            <div v-else class="selected-items__head-desc">
                <div class="selected-items__head-icon">
                    <svg v-if="successFlag">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__cart-success'"></use>
                    </svg>
                    <svg v-else>
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__cart-info'"></use>
                    </svg>
                </div>
                <div v-if="successFlag" class="selected-items__head-info">
                    <div class="selected-items__head-text">
                        {{ $tc('cart.selected_items.head_text_success') }}
                    </div>
                </div>
                <div v-else class="selected-items__head-info">
                    <div class="selected-items__head-title">
                        {{ $tc('cart.selected_items.head_title') }}
                    </div>
                    <div class="selected-items__head-text">
                        {{ $tc('cart.selected_items.head_text') }}
                    </div>
                </div>
                
                <div class="selected-items__head-deploy" @click="expandFlag = !expandFlag">
                    <span>{{ $tc('cart.selected_items.head_deploy') }}</span>
                    <div class="selected-items__head-deploy-icon" :class="{'selected-items__head-deploy-icon--rotate': expandFlag}">
                        <svg>
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div v-show="expandFlag && !successFlag" class="selected-items__head-btn">
                <label name="selectAll" class="selected-items__label">
                    <input name="selectAll" type="checkbox" class="selected-items__checkbox" v-model="selectFlag">
                    <span class="selected-items__checkbox-label">
                        <svg class="selected-items__checkbox-svg" viewBox="0 0 10 8">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__checked'"></use>
                        </svg>
                    </span>
                    <span class="selected-items__checkbox-text">{{ $tc('cart.selected_items.select_all') }}</span>
            </label>
            </div>
        </div>
        <div v-show="expandFlag && !successFlag" class="selected-items__content">
            <div class="selected-items__list">
                <selected-item
                    v-for="product in products"
                    :product="product"
                    :selectFlag='selectFlag'
                ></selected-item>
            </div>
            <div v-show="!successFlag" class="selected-items__btn" @click="successFlag = true">{{ $tc('cart.search.button') }}</div>
        </div>
    </div>
</template>

<script>
import selectedItem from './selected-item.vue'
export default {
  components: { selectedItem },
    name:'selected-items',
    props: {
        products: {
            type: Array,
            required: true,
        },
    },
    data(){
        return{
            expandFlag: false,
            selectFlag:true,
            successFlag: false
        }
    },
}
</script>