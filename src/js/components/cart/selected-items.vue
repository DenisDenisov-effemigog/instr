<template>
    <div class="selected-items">
        <div class="selected-items__head">
            <div class="selected-items__head-desc">
                <div class="selected-items__head-icon">
                    <svg viewBox="0 0 20 20">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__info'"></use>
                    </svg>
                </div>
                <div class="selected-items__head-info">
                    <div class="selected-items__head-title">
                        {{ $tc('cart.selected_items.head_title') }}
                    </div>
                    <div class="selected-items__head-text">
                        {{ $tc('cart.selected_items.head_text') }}
                    </div>
                </div>
                <div class="selected-items__head-deploy">
                    <span>{{ $tc('cart.selected_items.head_deploy') }}</span>
                    <div class="selected-items__head-deploy-icon">
                        <svg>
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="selected-items__head-btn">
                <label name="selectAll" class="selected-items__label">
                    <input name="selectAll" type="checkbox" class="selected-items__checkbox">
                    <span class="selected-items__checkbox-label">
                        <svg class="selected-items__checkbox-svg" viewBox="0 0 10 8">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__checked'"></use>
                        </svg>
                    </span>
                    <span class="selected-items__checkbox-text">{{ $tc('cart.selected_items.select_all') }}</span>
                </label>
            </div>
        </div>
        <div class="selected-items__content">
            <div class="selected-items__list">
                <selected-item
                    v-for="product in products"
                    :product="product"
                ></selected-item>
            </div>
            <div class="selected-items__btn">{{ $tc('cart.search.button') }}</div>
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
    }
}
</script>