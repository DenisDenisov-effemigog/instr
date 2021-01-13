<template>
    <div class="filter-clear-btn">
        <div class="filter-clear-btn__icon">
            <svg>
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
            </svg>
        </div>
        <div class="filter-clear-btn__text">
            Сбросить все фильтры
        </div>
    </div>
</template>

<script>
export default {
    name: 'filter-clear-btn',

}
</script>