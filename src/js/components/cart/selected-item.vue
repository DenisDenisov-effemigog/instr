<template>
    <div class="selected-item">
        <label name="selectedItem" class="selected-item__label">
            <input ref="check" name="selectedItem" type="checkbox" class="selected-item__checkbox" :checked="selectFlag" @click="checkedItem">
            <span class="selected-item__checkbox-label">
                <svg class="selected-item__checkbox-svg" viewBox="0 0 10 8">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__checked'"></use>
                </svg>
            </span>
            <div class="selected-item__desc">
                <div class="selected-item__pic">
                    <img :src="this.product.images[0].img" alt="">
                </div>
                <div class="selected-item__info">
                    <div class="selected-item__article">
                        <span>{{ $tc('text.articul') }}: </span>
                        <span>{{product.sku}}</span>
                    </div>
                    <div class="selected-item__text">
                        {{product.name}}
                    </div>
                </div>
                <div class="selected-item__price">
                    <span>{{product.price}}</span>
                    <span>₽</span>
                </div>
            </div>
        </label>
    </div>
</template>

<script>
export default {
    name:'selected-item',
    props: {
        product: {
            type: Object,
            required: true,
        },
        selectFlag:{
            type:Boolean,
            required: true
        }
    },
    data(){
        return{
        }
    },
    methods:{
        checkedItem(){
        }
    },
}
</script>