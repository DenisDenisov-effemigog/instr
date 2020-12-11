<template>
<div class="select" @click="flag =!flag">
    <div class="select__button" :class="{'select__button--active':flag}">
        <span>{{points[currentPoint]}}</span>
        <svg>
            <use :xlink:href="templatePath + 'images/sprite.svg#arrows__arrow-down'"></use>
        </svg>
    </div>
    <div v-show="flag" class="select__dropdown">
        <ul class="select__list">
            <li @click="clickPoint(point)" class="select__item" :class="{'select__item--active':currentPoint == points.indexOf(point)}" v-for="point in points">
                <span>{{point}}</span>
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#check'"></use>
                </svg>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    name: "select-list",
    data(){
        return{
            flag:false,
            points:['Выполнен','В ожидании оплаты','Отменен'],
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