<template>
<div class="select" @click="flag =!flag">
    <div class="select__button" :class="{'select__button--active':flag}">
        <span v-if="selectFlag">{{points[currentPoint]}}</span>
        <span v-else>Документы</span>
        <svg>
            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
        </svg>
    </div>
    <div v-show="flag" class="select__dropdown">
        <ul class="select__list">
            <li @click="clickPoint(point)" class="select__item" :class="{'select__item--active':currentPoint == points.indexOf(point)}" v-for="point in points">
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
export default {
    name: "select-list",
    props:{
        points:{
            type: Array
        },
        icon:{
            type:String
        },
        selectFlag:{
            type: Boolean,
            default: true
        }
    },
    data(){
        return{
            flag:false,
            currentPoint:0
        }
    },
    methods:{
        clickPoint(data){
            let index = this.points.indexOf(data)
            this.currentPoint = index
        }
    }
}
</script>