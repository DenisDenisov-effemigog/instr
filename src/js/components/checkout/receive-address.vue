<template>
    <div class="receive-address">
        <div class="receive-address__select">
            <select-list
                :points="deliveryPoints"
                :selectopenSelect="deliveryPoints[0]"
                :selectName="'receive-address'"
            ></select-list>
        </div>
    </div>
</template>

<script>
    import selectList from "../partials/select-list.vue"

    export default {
        name:"receive-address",
        components:{ selectList },
        props: {
            deliveryPoints: {
                required: true,
                type: Array
            },
        },
        data(){
            return{
                
            }
        }
    }
</script>