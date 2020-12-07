<template>
    <div  @click="copyArticle" @mouseleave="copyFlag = true" class="product-card__article">
        <span ref="number">Артикул:&nbsp;<span class="product-card__article-number">{{articleCode}}</span></span>
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
            let element = this.$refs.number
            var range;
            if (document.selection) {
                // IE
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