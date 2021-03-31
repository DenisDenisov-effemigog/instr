<template>
<div class="select" @click="openSelect = !openSelect" v-click-outside="closeOutside">
    <div class="select__button" :class="{'select__button--active':openSelect}">
        <span>
            <span class="select__placeholder" v-if="!!placeholder">{{placeholder}}:&nbsp;</span>
            <span>{{ currentPoint.label }}</span>
        </span>
        <svg :viewBox="viewbox" class="select__arrow">
            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
        </svg>
    </div>
    <div v-show="openSelect" 
        class="select__dropdown"
        :class="{'select__dropdown--download': icon === 'icons__download'}"
    >
        <ul class="select__list" v-if="selectName === 'download-doc'">
            <li @click="clickPoint(point)" v-for="point in points" :key="point.value">
                <a :href="point.link" download
                    class="select__item"
                    :class="{'select__item--active':currentPoint.value === point.value}"
                >
                    <span>{{ point.label }}</span>
                    <svg :viewBox="viewBox">
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
                :key="point.value"
            >
                <span>{{ point.label }}</span>
                <svg :viewBox="viewBox">
                    <use :xlink:href="templatePath + `images/sprite.svg#${icon}`"></use>
                </svg>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import ClickOutside from "vue-click-outside";

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
        },
        placeholder: { // передаем плейсхолдер внутри селекта
            type: String,
            default: ''
        }
    },
    data(){
        return{
            openSelect: false,
            currentPoint: {},
            viewBox: '',
        }
    },
    created() {
        this.$eventBus.$on('change-current-point', this.changeCurrentPoint);
        this.viewBoxPosition
    },
    methods:{
        clickPoint(data){
            let vm = this;
            vm.currentPoint = data
            if (vm.sortingPage === 'listing') {
                vm.$eventBus.$emit('add-sorting', vm.currentPoint.value);
            } else if (vm.sortingPage === 'orders') {
                vm.$eventBus.$emit('apply-sorting', vm.currentPoint.value);
            } else if (vm.selectName === 'receive-address') {
                vm.$eventBus.$emit('change-select-point', vm.selectName, vm.currentPoint);
            } else if (vm.sortingPage === 'comparison') {
                this.$eventBus.$emit('changed-category', vm.currentPoint.value, 'comparison')
            }
        },
        closeOutside() {
            this.openSelect = false
        },
        changeCurrentPoint(item) {
            this.currentPoint = item
        }
    },
    computed: {
        viewBoxPosition() {
            if (this.icon === 'check') {
                this.viewBox = '-4 -5 18 20'
            } else if (this.icon === 'icons__download') {
                this.viewBox = '1 0 18 20'
            }
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