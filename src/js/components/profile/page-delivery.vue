<template>
    <div class="delivery">
        <div class="delivery__header" 
             :class="{'delivery__header_column': delivery.length === 0}"
        >
            <h2 class="profile__title">Адреса доставки</h2>
            <p class="delivery__no-address" v-if="delivery.length === 0">У вас пока нет ни одного адреса.</p>
            <div class="delivery__add-address-btn"
                 @click.prevent="openModal('new-address')"
            >
                <svg viewBox="0 0 20 20">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__plus-small'"></use>
                </svg>
                <span>Добавить адрес</span>
            </div>
        </div>
        <div v-if="delivery.length > 0">
            <ul class="delivery__list">
                <li class="delivery__item" v-for="order in delivery">
                    <div class="delivery__desc">
                        <div class="delivery__order">Адрес № {{order.order}}</div>
                        <div class="delivery__address">{{order.address}}</div>
                        <div class="delivery__status delivery__status--сonfirmed" v-if="order.status == 'сonfirmed'">
                            Подтвержден
                        </div>
                        <div class="delivery__status delivery__status--submitted" v-if="order.status == 'submitted'">
                            <p @click="openTooltip">Отправлен на подтверждение</p>
                            <div class="delivery__tooltip">
                                <p>В данный момент адрес проходит проверку модератора. Следить за статусом адреса вы можете тут</p>
                                <div class="delivery__tooltip-icon">
                                    <svg @click.self ="closeTooltip" viewBox="0 0 12 12">
                                        <use @click.stop :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="delivery__status delivery__status--not-сonfirmed" v-if="order.status == 'not confirmed'">
                            <p @click="openTooltip">Не подтвержден</p>
                            <div class="delivery__tooltip">
                                <p>К сожалению, адрес не прошел проверку модератора. Подробнее по горячей линии: 8 800-765-87-51</p>
                                <div class="delivery__tooltip-icon">
                                    <svg @click.self="closeTooltip" viewBox="0 0 12 12">
                                        <use @click.stop :xlink:href="templatePath + 'images/sprite.svg#close'"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="delivery__icon">
                        <svg v-if="order.status != 'not confirmed'">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__del'"></use>
                        </svg>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:"page-delivery",
    props:{
        profile: {
            required: true,
            type: Object,
        }
    },
    data(){
        return{
            delivery:[
                {
                    order: '1',
                    address: '1062 Budapest, V1 Bajzautca, 35 1062 Budapest, V1 Bajzautca, 35 1062 Budapest, V1 Bajzautca, 35 Bajzautca',
                    status: 'сonfirmed'
                },
                {
                    order: '2',
                    address: 'II., FrankelLeóút 22 1062 Budapest, V1 Bajzautca, 351062 Budapest, V1 Bajzautca, 35',
                    status: 'submitted'
                },
                {
                    order: '3',
                    address: 'XXI., Áruháztér 8',
                    status: 'not confirmed'
                },
            ]
        }
    },
    // computed: {
    //     delivery() {
    //         return this.profile.delivery
    //     }
    // },
    methods: {
        openModal(modal) {
            this.$eventBus.$emit("openModal", modal, '', false)
        },
        openTooltip(e){
            e.target.nextElementSibling.classList.add('delivery__tooltip--open')
        },
        closeTooltip(e){
            e.target.closest('.delivery__tooltip').classList.remove('delivery__tooltip--open')
        }
    },
}
</script>