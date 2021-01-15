<template>
    <div class="cart-search">
        <div class="cart-search__head">
            <div class="cart-search__title">Добавить товар по артикулу</div>
            <div class="cart-search__icon" 
                @mouseenter="openTooltip = true"
                @mouseleave="openTooltip = false"
                >
                <svg @click=" openTooltip = true ">
                    <use xlink:href="/images/sprite.svg#icons__info"></use>
                </svg>
                <div class="cart-search__tooltip" :class="{'cart-search__tooltip--open':openTooltip}">
                    <p>Введите артикул товара каждый с новой строки. На строке должен находиться только артикул и количество товара. Максимум 100 строк.</p>
                    <div @click=" openTooltip = false ">
                        <svg viewBox="0 0 12 12">
                            <use xlink:href="/images/sprite.svg#close"></use>
                        </svg> 
                    </div>               
                </div>
            </div>
        </div>
        <form action="" class="cart-search__form">
            <label for="" class="cart-search__label">
                <textarea type="text" class="cart-search__textarea"
                    placeholder="Укажите артикул и количество товара в виде: 12334443 54"
                ></textarea>
            </label>
            <div class="cart-search__btn">Добавить</div>
        </form>
    </div>
</template>

<script>
export default {
    name: "cart-search",
    data(){
        return{
            openTooltip: false
        }
    }
}
</script>