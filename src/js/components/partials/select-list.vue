<template>
<div class="select" @click="openSelect = !openSelect" v-click-outside="closeOutside">
    <div class="select__button" :class="{'select__button--active':openSelect}">
        <span>{{currentPoint}}</span>
        <svg>
            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
        </svg>
    </div>
    <div v-show="openSelect" class="select__dropdown">
        <ul class="select__list">
            <li @click="clickPoint(key)" class="select__item" :class="{'select__item--active':currentPoint === points[key]}" v-for="(point, key) in points">
                <span>{{point}}</span>
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

export default {
    name: "select-list",
    props:{
        points:{
            type: Array,
            required: true,
        },
        icon:{
            type:String,
            default: 'check',
        },
        selectopenSelect:{
            type: String,
            required: true,
        }
    },
    data(){
        return{
            openSelect:false,
            currentPoint:this.selectopenSelect
        }
    },
    methods:{
        clickPoint(data){
            this.currentPoint = this.points[data]
        },
        closeOutside() {
            this.openSelect = false
        }
    },
    mounted() {
        this.popupItem = this.$el
    },
    directives: {
        ClickOutside
    },
}
</script>