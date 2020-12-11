<template>
    <div class="delivery">
        <div class="delivery__header" :class="{'delivery__header_column': delivery.length == 0}">
            <h2 class="profile__title">Адреса доставки</h2>
            <p class="delivery__no-address" v-if="delivery.length == 0">У вас пока нет ни одного адреса.</p>
            <div class="delivery__add-address-btn">
                <svg viewBox="0 0 20 20">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__plus-small'"></use>
                </svg>
                <span>Добавить адрес</span>
            </div>
        </div>
        <div v-if="delivery.length > 0">
            <ul class="delivery__address" v-for="(address, order) in deliveryList">
                <li>
                    <div>
                        <div>Адрес № {{order}}</div>
                        <div></div>
                        <div></div>
                    </div>
                    <svg>
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__plus-small'"></use>
                    </svg>
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
    computed: {
        delivery() {
            return this.profile.delivery
        }

    }
}
</script>