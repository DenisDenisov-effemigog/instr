<template>
    <div class="filter-block">
        <div class="filter-block__header"> <!--TODO оформить стили, реализовать открытие/закрытие-->
            <div class="filter-block__title">{{ filter.title }}</div>
            <div class="filter-block__arrow">
                <svg viewBox="0 0 12 10" style="width: 12px"><!--TODO не забыть убрать width-->
                    <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
                </svg>
            </div>
        </div>
        <div class="filter-block__content" v-if="filter.type === 'range'">
            <div>Базовая цена</div><!--TODO оформить-->
            
            <filter-control-range></filter-control-range>

            <!--TODO перебить классы, плюс в css рефактор-->
            <label name="taxPayer" class="user-reg__checkbox">
                <input
                    class="user-reg__checkbox-input"
                    type="checkbox"
                    name="taxPayer">
                <span class="user-reg__checkbox-slider"></span>
                <span class="user-reg__checkbox-label">Бестселлеры</span>
            </label>
            <label name="news" class="user-reg__checkbox">
                <input
                    class="user-reg__checkbox-input"
                    type="checkbox"
                    name="news">
                <span class="user-reg__checkbox-slider"></span>
                <span class="user-reg__checkbox-label">Новинки</span>
            </label>
        </div>
        <div class="filter-block__content" v-else-if="filter.type === 'checkbox'">
            <div v-for="checkbox in filter.values"> 
                <!--TODO перебить классы, плюс в css чекбоксы и лэбл вынести в отдельные компоненты-->
                <label name="agreement" class="user__label user__label_row">
                    <input
                        class="user__checkbox-input"
                        type="checkbox"
                        name="agreement"
                        required
                        checked
                    >
                    <span class="user__checkbox-label">
                        <svg viewBox="0 0 10 8">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__checked'"></use>
                        </svg>
                    </span>
                    <span class="user__checkbox-text">{{ checkbox.title }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import FilterControlRange from './filter-control-range.vue'
    export default {
        name: "filter-block",
        components: {
                FilterControlRange
        },
        props: {
            filter: {
                type: Object,
                required: true
            }
        },
        data(){
            return{
            }
        },
        methods:{
        },
    }
</script>