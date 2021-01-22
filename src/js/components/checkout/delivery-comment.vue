<template>
    <div class="delivery-comment">
        <div class="delivery-comment__title">Коментарии к заказу</div>
        <div class="delivery-comment__form">
            <label for="" class="delivery-comment__label-textarea">
                <textarea name="" id="" class="delivery-comment__textarea" placeholder="Сообщение"></textarea>
            </label>
            <label name="agreement" class="delivery-comment__label delivery-comment__label-row">
                <input type="checkbox" name="agreement" required="required" checked="checked" class="delivery-comment__checkbox-input"> 
                <span class="delivery-comment__checkbox-label">
                    <svg viewBox="0 0 10 8">
                        <use xlink:href="/images/sprite.svg#icons__checked"></use>
                        </svg>
                    </span> 
                <span class="delivery-comment__checkbox-text">Сообщать мне обо всяких акциях, новостях и тд и тп.</span>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name:"delivery-comment"
}
</script>