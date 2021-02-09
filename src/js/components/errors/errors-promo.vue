<template>
    <div class="errors-promo">
        <div v-if="copyFlag" class="errors-promo__text" :class="{'errors-promo__text--copy': copyFlag}">
            {{ $tc('errors.500_copy-text')}}
        </div>
        <div v-else ref="promo" class="errors-promo__text">
            {{ $tc('errors.500_promo')}}
        </div>
        <div @click="copyPromo" class="errors-promo__btn">{{ $tc('errors.500_btn') }}</div>
    </div>
</template>

<script>
export default {
    name:"errors-promo",
    data(){
        return{
            copyFlag: false
        }
    },
    methods:{
        copyPromo(){
            if(!this.copyFlag){
                let element = this.$refs.promo
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
                this.copyFlag = true
                document.execCommand("copy");
            }
        }
    }

}
</script>