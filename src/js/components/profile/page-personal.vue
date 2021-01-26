<template>
    <div class="personalcab">
        <div class="personalcab__layout">
            <div class="personalcab__personal-data">
                <h2 class="profile__title">{{ $tc(h1) }}</h2>
            </div>
            <div class="personalcab__company">
                <div class="profile__company">
                    <h3 class="profile__company-name">{{ profile.company }}</h3>
                    <p class="profile__company-type">{{ profile.personTypePrint }}</p>
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
                        <p class="personalcab__data">{{ $tc(data.title) }}</p>
                        <div class="personalcab__data-value">{{ profile[data.index] }}</div>
                    </div>
                </li>
            </ul>
            <a class="profile__link"
               @click.prevent="openModal('profile-edit')"
            >{{ $tc('profile_personal.link.edit_data') }}</a>
        </div>
        <div class="personalcab__layout">
            <h4 class="personalcab__title">{{ $tc('profile_personal.title.auth') }}</h4>
            <a class="profile__link"
               @click.prevent="openModal('profile-password')"
            >{{ $tc('profile_personal.link.edit_password') }}</a>
        </div>
        <div class="personalcab__layout">
            <h4 class="personalcab__title">{{ $tc('profile_personal.title.delete_profile') }}</h4>
            <a class="profile__link"
               @click.prevent="openModal('profile-delete')"
            >
                <svg viewBox="0 0 20 20">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                </svg>
                {{ $tc('profile_personal.link.delete_profile') }}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:"page-personal",
    data() {
      return {
          person: [
              {'title': 'title.person', 'icon': 'user-profile', 'index': 'contact', 'personType': 1},
              {'title': 'title.phone', 'icon': 'call', 'index': 'phone', 'personType': 1},
              {'title': 'title.tin', 'icon': 'edit', 'index': 'code', 'personType': 2},
              {'title': 'title.company', 'icon': '3d', 'index': 'company', 'personType': 2},
              {'title': 'profile_personal.title.mail', 'icon': 'mail', 'index': 'email', 'personType': 1},
              {'title': 'profile_personal.title.address', 'icon': 'location', 'index': 'address', 'personType': 2},
          ]
      }  
    },
    computed: {
        profile() {         
            let profile = this.cloneOverJson(this.$store.state.personal);
            return profile;
        },
        h1() {
            return this.$store.state.layout.h1;
        },
    },
    methods: {
        openModal(modal) {
            this.$eventBus.$emit("openModal", modal, this.profile, false, false)
        } 
    },
    mounted() {
        this.$eventBus.$emit('hideMenu')
    }
}
</script>