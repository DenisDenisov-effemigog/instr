<template>
    <div class="dashboard-notifications">
        <div @mouseleave="tooltipFlag = false" class="dashboard-notifications">
            <div @mouseenter="tooltipFlag = true" @click="tooltipFlag = !tooltipFlag" class="dashboard-notifications__link">
                {{ $tc('profile.dashboard.notification_link') }}
                <svg viewBox="0 0 16 16">
                    <use :xlink:href="templatePath + `images/sprite.svg#icons__noti`"></use>
                </svg>
                <span class="dashboard-notifications__counter">3</span>
            </div>
            <div v-show="tooltipFlag" class="dashboard-notifications__tooltip">
                <div class="dashboard-notifications__head">
                    <h3 class="dashboard-notifications__title">
                        {{ $tc('profile.dashboard.notifications_title') }}
                    </h3>
                </div>
                <div class="dashboard-notifications__main">
                    <ul class="dashboard-notifications__list">
                        <li v-for="item in notificationData" class="dashboard-notifications__item">
                            <div class="dashboard-notifications__item-top">
                                <div class="dashboard-notifications__subtitle">
                                    {{item.title}}                                
                                </div>
                                <svg>
                                    <use :xlink:href="templatePath + `images/sprite.svg#arrows__arr-long-right`"></use>
                                </svg>
                            </div>
                            <div class="dashboard-notifications__item-bottom">
                                <div class="dashboard-notifications__date">
                                    {{item.date}}                                     
                                </div>
                                <div class="dashboard-notifications__status">
                                    {{item.status}}
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="dashboard-notifications__clear">
                        <svg>
                            <use :xlink:href="templatePath + `images/sprite.svg#icons__del`"></use>
                        </svg>
                        {{ $tc('profile.dashboard.notifications_clear') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"dashboard-notifications",
    data(){
        return{
            tooltipFlag: false,
             notificationData:[
                 {
                     title:'Вопрос по гарантии',
                     date:'12.03.2021',
                     status:'Готово'
                 },
                 {
                     title:'Запрос на удаление адреса',
                     date:'12.03.2021',
                     status:'Готово'
                 },
                 {
                     title:'Запрос на удаление адреса',
                     date:'12.03.2021',
                     status:'Готово'
                 }
             ]
        }
    }
}
</script>