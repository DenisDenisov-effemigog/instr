<template>
    <div class="personalcab">
        <div class="personalcab__layout">
            <div class="personalcab__personal-data">
                <h2 class="profile__title">Личные данные</h2>
            </div>
            <div class="personalcab__company">
                <div class="profile__company">
                    <h3 class="profile__company-name">{{profile.company}}</h3>
                    <p class="profile__company-type">{{profile.personTypePrint}}</p>
                </div>
            </div>
            <ul class="personalcab__columns">
                <li class="personalcab__column" 
                    v-for="data in person"
                    v-show="profile.personType === data.personType && profile.personType !== 2 || profile.personType === 2"
                >
                    <svg viewBox="0 0 24 24">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__' + data.icon"></use>
                    </svg>
                    <div>
                        <p class="personalcab__data">{{data.title}}</p>
                        <div class="personalcab__data-value">{{profile[data.index]}}</div>
                    </div>
                </li>
            </ul>
            <a class="profile__link"
               @click.prevent="openModal('profile-edit')"
            >Изменить данные</a>
        </div>
        <div class="personalcab__layout">
            <h4 class="personalcab__title">Пароль и авторизация</h4>
            <a class="profile__link"
               @click.prevent="openModal('profile-password')"
            >Изменить пароль</a>
        </div>
        <div class="personalcab__layout">
            <h4 class="personalcab__title">Удаление профиля</h4>
            <a class="profile__link"
               @click.prevent="openModal('profile-delete')"
            >
                <svg viewBox="0 0 20 20">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                </svg>
                Удалить профиль
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:"page-personal",
    props:{
        /*profile: {
            required: true,
            type: Object,
        },*/
    },
    data() {
      return {
          person: [
              {'title': 'Контактное лицо', 'icon': 'user-profile', 'index': 'contact', 'personType': 1},
              {'title': 'Телефон', 'icon': 'call', 'index': 'phone', 'personType': 1},
              {'title': 'ИНН', 'icon': 'edit', 'index': 'code', 'personType': 2},
              {'title': 'Компания', 'icon': '3d', 'index': 'company', 'personType': 2},
              {'title': 'Электронная почта', 'icon': 'mail', 'index': 'email', 'personType': 1},
              {'title': 'Юридический адрес', 'icon': 'location', 'index': 'address', 'personType': 2},
          ]
      }  
    },
    computed: {
        profile() {
            //console.log('this.$store.state.personal', this.$store.state.personal);            
            let profile = this.cloneOverJson(this.$store.state.personal);
            //contract.effective_date = this.when(contract.effective_date);
            return profile;
        },
    },
    methods: {
        openModal(modal) {
            this.$eventBus.$emit("openModal", modal, this.profile, false)
        } 
    },
}
</script>