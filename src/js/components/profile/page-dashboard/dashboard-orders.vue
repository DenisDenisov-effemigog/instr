<template>
    <div class="dashboard-orders">
        <div class="dashboard-orders__head">
            <h3 class="dashboard-orders__title">
                {{ $tc('profile.dashboard.order_title') }}  
            </h3>
        </div>
        <div class="dashboard-orders__main">
            <ul class="dashboard-orders__list">
                <li v-if="!ordersData.length" class="dashboard-orders__item dashboard-orders__item--info">{{ $tc('profile.dashboard.order_info') }}  </li>
                <li v-for="item in ordersData" class="dashboard-orders__item" v-else>
                    <div class="dashboard-orders__item-top">
                        <div class="dashboard-orders__number">
                            #{{item.number}}
                        </div>
                        <div class="dashboard-orders__price">
                            {{item.price}} {{ $tc('text.currency') }}                    
                        </div>
                    </div>
                    <div class="dashboard-orders__item-bottom">
                        <div class="dashboard-orders__date">
                            {{item.date}}                         
                        </div>
                        <div class="dashboard-orders__status">
                            {{item.status}}                        
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:"dashboard-orders",
    data(){
        return{
            ordersData:[ /*todo from base*/
                {
                    number:'123456',
                    price:'30 000',
                    date:'12.03.2021',
                    status:'В сборке'
                },
                {
                    number:'123456',
                    price:'130 000',
                    date:'12.03.2021',
                    status:'В сборке'
                }
            ]
        }
    }
}
</script>