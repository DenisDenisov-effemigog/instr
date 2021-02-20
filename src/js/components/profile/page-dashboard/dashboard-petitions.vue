<template>
    <div class="dashboard-petitions">
        <div class="dashboard-petitions__head">
            <h3 class="dashboard-petitions__title">{{ $tc('profile.dashboard.petitions_title') }}</h3>
        </div>
        <div class="dashboard-petitions__main">
            <ul class="dashboard-petitions__list">
                <li v-for="item in petitionsData" class="dashboard-petitions__item">
                    <div class="dashboard-petitions__item-top">
                        <div class="dashboard-petitions__subtitle">
                            {{item.title}}                                
                        </div>
                        <svg>
                            <use :xlink:href="templatePath + `images/sprite.svg#arrows__arr-long-right`"></use>
                        </svg>
                    </div>
                    <div class="dashboard-petitions__item-bottom">
                        <div class="dashboard-petitions__date">
                            {{item.date}}                                     
                        </div>
                        <div class="dashboard-petitions__status" :class="{'dashboard-petitions__status--blue': item.success}">
                            {{item.status}}
                        </div>
                    </div>
                </li>
                <li v-if="petitionsData.length == 0" class="dashboard-petitions__item">
                    <div class="dashboard-petitions__info">
                        {{ $tc('profile.dashboard.petitions_info') }}
                    </div>
                </li>
            </ul>
            <div class="dashboard-petitions__add">
                <svg>
                    <use :xlink:href="templatePath + `images/sprite.svg#icons__plus-small`"></use>
                </svg>
                {{ $tc('profile.dashboard.petitions_add') }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"dashboard-petitions",
    data(){
        return{
           
        }
    },
    mounted() {
        this.$store.dispatch('personalGetPetitions');
    },
    computed: {
        petitionsData() {
            return this.cloneOverJson(this.$store.state.personal.petitions);
        },
    }
}
</script>