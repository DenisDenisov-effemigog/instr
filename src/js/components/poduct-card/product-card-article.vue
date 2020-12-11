<template>
    <div  @click="copyArticle" @mouseleave="copyFlag = true" class="product-card__article">
        <span ref="art">Артикул:&nbsp;<span ref="number" class="product-card__article-number">{{articleCode}}</span></span>
        <div v-if="copyFlag" class="product-card__article-tooltip">
            Скопировать
        </div>
        <div v-else class="product-card__article-tooltip product-card__article-tooltip--copy">
            Скопирован в буфер обмена
        </div>
    </div>
</template>

<script>
export default {
    name: "product-card-article",
    data(){
        return{
            articleCode: 26304,
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
                tooltip.classList.add('product-card__article-tooltip--open')
                setTimeout(() => {
                    tooltip.classList.remove('product-card__article-tooltip--open')
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
        }
    }
    
}
</script>