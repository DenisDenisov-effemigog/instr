<template>
    <div v-show="userAuthorized && products.length != 0" class="selected-items" :class="{'selected-items--success': successFlag}">
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
                    <span>{{ $tc('cart.selected_items.head_deploy_close') }}</span>
                    <div class="selected-items__head-deploy-icon" :class="{'selected-items__head-deploy-icon--rotate': expandFlag}">
                        <svg>
                            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div v-show="expandFlag && !successFlag" class="selected-items__head-btn">
                <label class="selected-items__label">
                    <input name="selectAll" 
                           type="checkbox" 
                           class="selected-items__checkbox" 
                           v-model="checkedAll"
                           @click="checkAll"
                    >
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
                <div class="selected-item" v-for="product in products">
                    <label class="selected-item__label">
                        <input ref="check" 
                               name="selectedItem" 
                               type="checkbox" 
                               class="selected-item__checkbox" 
                               :value="product.sku"
                               v-model="checked" 
                               @change="checkboxChange()"
                        >
                        <span class="selected-item__checkbox-label">
                            <svg class="selected-item__checkbox-svg" viewBox="0 0 10 8">
                                <use :xlink:href="templatePath + 'images/sprite.svg#icons__checked'"></use>
                            </svg>
                        </span>
                        <div class="selected-item__desc">
                            <div class="selected-item__left">
                                <div class="selected-item__pic">
                                    <img :src="product.images[0].img" alt="">
                                </div>
                            </div>
                            <div class="selected-item__right">
                                <div class="selected-item__info">
                                    <div class="selected-item__article">
                                        <span>{{ $tc('text.articul') }}: </span>
                                        <span>{{product.sku}}</span>
                                    </div>
                                    <div class="selected-item__text">
                                        {{product.name}}
                                    </div>
                                </div>
                                <div class="selected-item__qty">
                                    {{product.basket_quantity}} {{ $tc('text.count') }}
                                </div>
                                <div class="selected-item__price">
                                    <span>{{product.price}}</span>
                                    <span>{{ $tc('text.currency') }}</span>
                                </div>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
            <div v-show="!successFlag" class="selected-items__btn" @click="combineCarts">{{ $tc('cart.search.button') }}</div>
        </div>
        <div class="selected-items__head-deploy selected-items__head-deploy--mobile" 
            @click="expandFlag = !expandFlag"
            :class="{'selected-items__head-deploy--mobile-close':successFlag}"
        >
            <span v-if="expandFlag">{{ $tc('cart.selected_items.head_deploy_open') }}</span>
            <span v-else>{{ $tc('cart.selected_items.head_deploy_close') }}</span>
            <div class="selected-items__head-deploy-icon" :class="{'selected-items__head-deploy-icon--rotate': expandFlag}">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'selected-items',
        props: {
            products: {
                type: Array,
                required: true,
            },
            userAuthorized:{
                type: Boolean
            }
        },
        data(){
            return{
                expandFlag: false,
                selectFlag:true,
                successFlag: false,
                checked: [],
                checkedAll: true
            }
        },
        mounted() {
            this.products.forEach(product=> {
                this.checked.push(product.sku)
            })
        },
        methods: {
            checkAll() {
                this.checked = [];

                if (!this.checkedAll) {
                    for (let key in this.products) {
                        this.checked.push(this.products[key].sku);
                    }
                }
            },
            checkboxChange() {
                this.checkedAll = this.checked.length === this.products.length;
            },
            combineCarts(){
                this.successFlag = true
                this.$store.dispatch('combineCarts', this.checked);
                this.$store.dispatch('basketOrderCalc')
            }
        }
    }
</script>