<template>
    <div @mouseenter="openTooltip" @click="copyArticle" @mouseleave="closeTooltip" class="product-card__article">
        <span ref="art">Артикул:&nbsp;
            <span ref="number" class="product-card__article-number">
                <slot></slot>
            </span>
        </span>
        <div v-show="openFlag">
            <div v-if="copyFlag" class="product-card__article-tooltip">
                Скопировать
            </div>
            <div v-else class="product-card__article-tooltip product-card__article-tooltip--copy">
                Скопирован в буфер обмена
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "product-card-article",
    data(){
        return{
            openFlag: false,
            copyFlag: true
        }
    },
    methods:{
        copyArticle(){
            let element;
            if(window.innerWidth > 768) {
                element = this.$refs.art
            }else{
                element = this.$refs.number
                let tooltip = document.querySelector('.product-card__article-tooltip')
                element.classList.add('product-card__article-number--copy')
                setTimeout(() => {
                    this.openFlag = false
                    element.classList.remove('product-card__article-number--copy')
                }, 2000);
            }
            var range;
            if (document.selection) {
                range = document.body.createTextRange();
                range.moveToElementText(element);
                range.select();
            } else if (window.getSelection) {
                range = document.createRange();
                range.selectNode(element);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }
            document.execCommand("copy");
            this.copyFlag = false
        },
        openTooltip(){
            this.openFlag = true
        },
        closeTooltip(){
            this.openFlag = false
            this.copyFlag = true
        }
    }
    
}
</script>