<template>
    <div class="receive-address">
        <div class="receive-address__select">
            <select-list
                :points="[
                            {
                                label:'Пункт №1: Будапешт 1062, V1 Бажаутса, 35',
                                value:'1'    
                            },
                            {
                                label:'Пункт №2: Будапешт 1062, V1 Бажаутса, 35',
                                value:'2'    
                            },
                            {
                                label:'Пункт №3: Будапешт 1062, V1 Бажаутса, 35',
                                value:'3'    
                            }
                        ]"
                :selectopenSelect=" {
                                        label:'Пункт №1: Будапешт 1062, V1 Бажаутса, 35',
                                        value:'1'    
                                    }"
            ></select-list><!--TODO из базы-->
        </div>
    </div>
</template>

<script>

    import selectList from "../partials/select-list.vue"

export default {
    name:"receive-address",
    components:{ selectList },
    data(){
        return{
            
        }
    }
}
</script>