<template>
    <div>
        <ul class="order__list" v-if="!showDetails">
            <li class="order__item"
                v-for="(item, index) in orders"
                :key="item.id"
            >
                <component is="order" 
                           :order="item" 
                           :index="index"
                ></component>
            </li>
        </ul>
<!--        <page-order v-else :order="order"></page-order>-->
    </div>
</template>

<script>
import order from './order.vue'
//import PageOrder from './page-order.vue'
export default {
     components: {
         order,
         //PageOrder, 
     },
     name: 'order-list',
     props: {
         value: {
             type: Boolean,
             required: true
         },
         orders: {
             type: Array,
             required: true
         },
     },
     data(){
         return{
             order: {},
         }
    },
    model: {
        prop: 'value',
        event: 'change',
    },
    computed: {
        showDetails: {
            get: function () {
                return this.value;
            },
            set: function (newValue) {
                this.$emit('change', newValue);
            }
        },
    },
    created() {
        //this.$eventBus.$on("openDetails", this.openDetails)
    },
    methods: {

        /*openDetails(index){
            this.showDetails = true
            this.order = this.orders[index]
        },*/
    }
}
</script>