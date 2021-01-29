<template>
    <div class="delivery-comment">
        <div class="delivery-comment__title">{{ $tc('checkout.title.comments') }}</div>
        <div class="delivery-comment__form">
            <label for="" class="delivery-comment__label-textarea">
                <textarea name="" id="" class="delivery-comment__textarea" :placeholder="$tc('text.message')"></textarea>
            </label>
            <label name="agreement" class="delivery-comment__label">
                <input type="checkbox" name="agreement" required="required" checked="checked" class="delivery-comment__checkbox"> 
                <span class="delivery-comment__checkbox-label">
                    <svg class="delivery-comment__checkbox-svg" viewBox="0 0 10 8">
                        <use xlink:href="/images/sprite.svg#icons__checked"></use>
                        </svg>
                    </span> 
                <span class="delivery-comment__checkbox-text">{{ $tc('checkout.checkbox_text') }}</span>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name:"delivery-comment"
    }
</script>