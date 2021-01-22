<template>
    <div class="delivery-date">
        <div class="delivery-date__title">Дата доставки</div>
        <div class="delivery-date__info">Дата доставки ориентировочная. Не обязательно к заполнению.</div>
        <div class="delivery-date__select">
            <select-list
                :points="points"
                :selectopenSelect="setPoint"
            ></select-list>
        </div>
    </div>
</template>

<script>
import selectList from "../partials/select-list.vue"

export default{
    name:"delivery-date",
    components: { selectList },
    data(){
        return{
            points:[
                {
                    label:"Не выбрано (не обязательно)",
                    value:"none"
                },
                {
                    label:"31.12.1999",
                    value:"999"
                },
            ],
            setPoint:{
                    label:"Не выбрано (не обязательно)",
                    value:"none"
                },
        }
    }
}
</script>