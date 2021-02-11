<template>
<div class="select" @click="openSelect = !openSelect" v-click-outside="closeOutside">
    <div class="select__button" :class="{'select__button--active':openSelect}">
        <span>{{ currentPoint.label }}</span>
        <svg :viewBox="viewbox" class="select__arrow">
            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
        </svg>
    </div>
    <div v-show="openSelect" class="select__dropdown">
        <ul class="select__list" v-if="selectName === 'download-doc'">
            <li @click="clickPoint(point)"
                class="select__item"
                :class="{'select__item--active':currentPoint.value === point.value}"
                v-for="point in points"
            >
                <a href="/images/country/map.png" download>
                    <span>{{ point.label }}</span>
                    <svg>
                        <use :xlink:href="templatePath + `images/sprite.svg#${icon}`"></use>
                    </svg>
                </a>
            </li>
        </ul>
        <ul class="select__list" v-else>
            <li @click="clickPoint(point)"
                class="select__item"
                :class="{'select__item--active':currentPoint.value === point.value}"
                v-for="point in points"
            >
                <span>{{ point.label }}</span>
                <svg>
                    <use :xlink:href="templatePath + `images/sprite.svg#${icon}`"></use>
                </svg>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import * as Api from '../../api';

let api = Api.getInstance();

export default {
    name: "select-list",
    props:{
        points:{ //массив пунктов в селекте
            type: Array,
            required: true,
        },
        icon:{ //иконка
            type:String,
            default: 'check',
        },
        selectopenSelect:{ //текущий активный пункт
            type: Object,
            required: true,
        },
        viewbox: { //размер иконки
            type: String
        },
        sortingPage: { //передаём название страницы, если там происходит сортировка
            type: String,
            default: null
        },
        selectName: { //передаём название селекта
            type: String,
            default: null
        }
    },
    data(){
        return{
            openSelect: false,
            currentPoint: {}
        }
    },
    created() {
        this.$eventBus.$on('change-current-point', this.changeCurrentPoint)
    },
    methods:{
        clickPoint(data){
            let vm = this;
            vm.currentPoint = data
            if (vm.sortingPage === 'listing') {
                vm.$eventBus.$emit('add-sorting', vm.currentPoint);
                api.sortListing(vm.currentPoint).then(answer => {
                    vm.$eventBus.$emit('apply-listing', answer.output);
                    window.history.pushState({
                        output: answer.output
                    },'', answer.url);
                });
            } else if (vm.selectName === 'receive-address') {
                vm.$eventBus.$emit('change-select-point', vm.selectName, vm.currentPoint);
            } else if (vm.selectName === 'download-doc') {
                vm.$eventBus.$emit('download-doc', vm.currentPoint)
            }
        },
        closeOutside() {
            this.openSelect = false
        },
        changeCurrentPoint(item) {
            this.currentPoint = item
        }
    },
    mounted() {
        this.currentPoint = this.selectopenSelect;
    },
    directives: {
        ClickOutside
    },
}
</script>